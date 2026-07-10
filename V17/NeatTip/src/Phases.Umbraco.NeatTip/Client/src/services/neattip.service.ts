import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { resetAllLayouts, resetUnhealthyLayouts } from "../utils/layout-reset.util.js";
import { neattipRuntime } from "../config/neattip-runtime.js";
import { FlashPreventionService } from "./flash-prevention.service.js";
import { NeatTipPermissionsService } from "./permissions.service.js";
import { loadNeatTipSettings } from "./neattip-settings-api.service.js";
import { PropertyProcessorService } from "./property-processor.service.js";
import { PropertyScannerService } from "./property-scanner.service.js";
import { subscribeRouteChanges } from "./route-change.service.js";
import { TooltipManagerService } from "./tooltip-manager.service.js";
import { VariantCultureService } from "./variant-culture.service.js";
import { WorkspaceContextService } from "./workspace-context.service.js";
import { helperTextService } from "./helper-text.service.js";

export class NeatTipService {
  readonly #permissions: NeatTipPermissionsService;
  readonly #culture: VariantCultureService;
  readonly #workspace = new WorkspaceContextService();
  readonly #tooltipManager: TooltipManagerService;
  readonly #flashPrevention = new FlashPreventionService(this.#workspace);
  readonly #processor: PropertyProcessorService;
  readonly #scanner: PropertyScannerService;
  #unsubscribeNavigation: (() => void) | undefined;
  #unsubscribeCulture: (() => void) | undefined;
  #unsubscribeUserPermissionRefresh: (() => void) | undefined;
  #permissionRefreshPromise: Promise<void> | undefined;
  #routeChangeTimer: ReturnType<typeof setTimeout> | undefined;
  #navigationHandler = (): void => {
    this.#scheduleRouteChange();
  };

  constructor(host: UmbControllerHost) {
    this.#permissions = new NeatTipPermissionsService(host);
    this.#culture = new VariantCultureService(host);
    this.#unsubscribeUserPermissionRefresh = this.#permissions.onUserChanged(() => {
      void this.#refreshServerPermissions();
    });
    this.syncPermissionsFromRuntime();
    this.#tooltipManager = new TooltipManagerService(this.#permissions, this.#culture);
    this.#processor = new PropertyProcessorService(
      this.#workspace,
      this.#tooltipManager,
      this.#culture,
    );
    this.#scanner = new PropertyScannerService(
      this.#workspace,
      this.#processor,
      this.#culture,
    );
  }

  /** Refresh server-evaluated edit permission from runtime settings. */
  syncPermissionsFromRuntime(): void {
    this.#permissions.setServerCanEditHelperText(neattipRuntime.canEditHelperText);
  }

  async #refreshServerPermissions(): Promise<void> {
    if (this.#permissionRefreshPromise) {
      return this.#permissionRefreshPromise;
    }

    this.#permissionRefreshPromise = loadNeatTipSettings()
      .then(() => {
        this.syncPermissionsFromRuntime();
      })
      .catch(() => {
        this.#permissions.setServerCanEditHelperText(undefined);
      })
      .finally(() => {
        this.#permissionRefreshPromise = undefined;
      });

    return this.#permissionRefreshPromise;
  }

  start(): void {
    this.#flashPrevention.setLayoutDetectedHandler((layout) => {
      this.#scanner.processLayout(layout);
    });

    this.#flashPrevention.start();
    this.#tooltipManager.start();
    this.#scanner.start();

    this.#unsubscribeNavigation = subscribeRouteChanges(this.#navigationHandler);
    this.#unsubscribeCulture = this.#culture.subscribe(() => {
      this.#handleCultureChange();
    });

    this.#handleRouteChange();
  }

  stop(): void {
    clearTimeout(this.#routeChangeTimer);
    this.#routeChangeTimer = undefined;
    this.#unsubscribeNavigation?.();
    this.#unsubscribeNavigation = undefined;
    this.#unsubscribeCulture?.();
    this.#unsubscribeCulture = undefined;
    this.#unsubscribeUserPermissionRefresh?.();
    this.#unsubscribeUserPermissionRefresh = undefined;
    this.#scanner.stop();
    this.#tooltipManager.stop();
    this.#flashPrevention.stop();
    this.#permissions.destroy();
    this.#culture.destroy();
  }

  rescan(): void {
    if (!neattipRuntime.enabled) {
      return;
    }

    resetAllLayouts();
    this.#flashPrevention.scanAllLayouts();
    this.#scanner.scanNow();
  }

  #scheduleRouteChange(): void {
    clearTimeout(this.#routeChangeTimer);
    this.#routeChangeTimer = window.setTimeout(() => {
      this.#routeChangeTimer = undefined;
      this.#handleRouteChange();
    }, 100);
  }

  #handleRouteChange(): void {
    this.#tooltipManager.hide(true);
    helperTextService.invalidate();

    if (!neattipRuntime.enabled || !this.#workspace.isDocumentContentEdit()) {
      return;
    }

    resetUnhealthyLayouts();
    this.#flashPrevention.start();
    this.#scanner.scanNow();
  }

  #handleCultureChange(): void {
    if (!neattipRuntime.enabled || !this.#workspace.isDocumentContentEdit()) {
      return;
    }

    const refreshForCulture = (): void => {
      this.#scanner.refreshAllLayoutDescriptions();
      this.#scanner.scanNow();
      this.#tooltipManager.onCultureChange();
    };

    requestAnimationFrame(refreshForCulture);

    for (const delay of [100, 300, 800]) {
      window.setTimeout(refreshForCulture, delay);
    }
  }
}
