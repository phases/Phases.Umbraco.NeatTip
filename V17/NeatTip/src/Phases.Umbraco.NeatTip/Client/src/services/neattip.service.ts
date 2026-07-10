import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { resetAllLayouts, resetUnhealthyLayouts } from "../utils/layout-reset.util.js";
import { neattipRuntime } from "../config/neattip-runtime.js";
import { FlashPreventionService } from "./flash-prevention.service.js";
import { NeatTipPermissionsService } from "./permissions.service.js";
import { PropertyProcessorService } from "./property-processor.service.js";
import { PropertyScannerService } from "./property-scanner.service.js";
import { RouteMonitorService } from "./route-monitor.service.js";
import { TooltipManagerService } from "./tooltip-manager.service.js";
import { VariantCultureService } from "./variant-culture.service.js";
import { WorkspaceContextService } from "./workspace-context.service.js";
import { helperTextService } from "./helper-text.service.js";

export class NeatTipService {
  readonly #permissions: NeatTipPermissionsService;
  readonly #culture: VariantCultureService;
  readonly #workspace = new WorkspaceContextService();
  readonly #routeMonitor = new RouteMonitorService();
  readonly #tooltipManager: TooltipManagerService;
  readonly #flashPrevention = new FlashPreventionService(this.#workspace);
  readonly #processor: PropertyProcessorService;
  readonly #scanner: PropertyScannerService;
  #unsubscribeNavigation: (() => void) | undefined;
  #unsubscribeRouteMonitor: (() => void) | undefined;
  #unsubscribeCulture: (() => void) | undefined;
  #routeChangeTimer: ReturnType<typeof setTimeout> | undefined;
  #navigationHandler = (): void => {
    this.#scheduleRouteChange();
  };

  constructor(host: UmbControllerHost) {
    this.#permissions = new NeatTipPermissionsService(host);
    this.#culture = new VariantCultureService(host);
    this.#permissions.setEditHelperTextAllowedSections(
      neattipRuntime.editHelperTextAllowedSections,
    );
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

  /** Refresh section aliases from runtime settings (config-driven permissions). */
  syncPermissionsFromRuntime(): void {
    this.#permissions.setEditHelperTextAllowedSections(
      neattipRuntime.editHelperTextAllowedSections,
    );
  }

  start(): void {
    this.#flashPrevention.setLayoutDetectedHandler((layout) => {
      this.#scanner.processLayout(layout);
    });

    this.#flashPrevention.start();
    this.#tooltipManager.start();
    this.#scanner.start();
    this.#routeMonitor.start();

    this.#unsubscribeNavigation = this.#workspace.subscribeNavigation(this.#navigationHandler);
    this.#unsubscribeRouteMonitor = this.#routeMonitor.subscribe(this.#navigationHandler);
    this.#unsubscribeCulture = this.#culture.subscribe(() => {
      this.#handleCultureChange();
    });

    window.addEventListener("popstate", this.#navigationHandler);
    window.addEventListener("hashchange", this.#navigationHandler);

    this.#handleRouteChange();
  }

  stop(): void {
    clearTimeout(this.#routeChangeTimer);
    this.#routeChangeTimer = undefined;
    this.#unsubscribeNavigation?.();
    this.#unsubscribeNavigation = undefined;
    this.#unsubscribeRouteMonitor?.();
    this.#unsubscribeRouteMonitor = undefined;
    this.#unsubscribeCulture?.();
    this.#unsubscribeCulture = undefined;
    window.removeEventListener("popstate", this.#navigationHandler);
    window.removeEventListener("hashchange", this.#navigationHandler);
    this.#routeMonitor.stop();
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
