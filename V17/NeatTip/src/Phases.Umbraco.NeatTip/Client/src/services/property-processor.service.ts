import { neattipRuntime } from "../config/neattip-runtime.js";
import { NEATTIP_CONFIG } from "../config/neattip.config.js";
import {
  hasPropertyLabel,
  hideDescription,
  isProcessed,
  LabelPlacementService,
  markKeepVisible,
  markProcessed,
  syncResolvedDescription,
} from "./label-placement.service.js";
import { linkIndicatorToLayout } from "./tooltip-content.service.js";
import type { TooltipManagerService } from "./tooltip-manager.service.js";
import type { VariantCultureService } from "./variant-culture.service.js";
import type { WorkspaceContextService } from "./workspace-context.service.js";
import { captureOriginalDescription, cultureKey } from "../utils/culture-description.util.js";
import { helperTextService } from "./helper-text.service.js";
import {
  isStaleProcessedLayout,
  resetLayoutForReprocessing,
} from "../utils/layout-reset.util.js";
import { restoreStoredDescription } from "../utils/flash-description.util.js";
import { queryLayoutRoot } from "../utils/shadow-dom.util.js";

export class PropertyProcessorService {
  readonly #labelPlacement = new LabelPlacementService();

  constructor(
    private readonly workspace: WorkspaceContextService,
    private readonly tooltipManager: TooltipManagerService,
    private readonly cultureService: VariantCultureService,
  ) {}

  process(layout: HTMLElement): void {
    if (!neattipRuntime.settingsLoaded || !neattipRuntime.enabled) {
      return;
    }

    if (!this.workspace.shouldProcessElement(layout)) {
      return;
    }

    if (isProcessed(layout)) {
      const cultureContext = this.cultureService.getResolutionContext();
      const activeCultureKey = cultureKey(cultureContext.activeCulture);
      const resolvedCultureKey = layout.dataset.neattipResolvedCulture?.trim();

      if (
        resolvedCultureKey
        && activeCultureKey
        && resolvedCultureKey !== activeCultureKey
      ) {
        resetLayoutForReprocessing(layout);
      } else if (!isStaleProcessedLayout(layout)) {
        return;
      } else {
        resetLayoutForReprocessing(layout);
      }
    }

    try {
      helperTextService.applyToLayout(layout);
      captureOriginalDescription(layout);
      const cultureContext = this.cultureService.getResolutionContext();
      const description = syncResolvedDescription(layout, cultureContext);

      if (description && description.length < neattipRuntime.minLength) {
        restoreStoredDescription(layout);
        markKeepVisible(layout);
        markProcessed(layout);
        return;
      }

      if (description) {
        layout.dataset.neattipStoredDescription = description;
      } else {
        delete layout.dataset.neattipStoredDescription;
      }

      const hasLabel = hasPropertyLabel(layout);

      if (!hasLabel) {
        restoreStoredDescription(layout);
        markKeepVisible(layout);
        markProcessed(layout);
        return;
      }

      this.#stripNativeTitle(layout);
      hideDescription(layout);

      const indicator = this.#createIndicator(description);
      const placed = this.#labelPlacement.placeIndicator(layout, indicator);

      if (!placed) {
        restoreStoredDescription(layout);
        markKeepVisible(layout);
        markProcessed(layout);
        return;
      }

      linkIndicatorToLayout(indicator, layout);

      this.#attachHandlers(indicator, layout);
      layout.dataset.neattipResolvedCulture = cultureKey(cultureContext.activeCulture);
      markProcessed(layout);
    } catch {
      restoreStoredDescription(layout);
      markKeepVisible(layout);
      markProcessed(layout);
    }
  }

  #stripNativeTitle(layout: HTMLElement): void {
    const root = layout.shadowRoot ?? layout;
    root.querySelectorAll<HTMLElement>("label, uui-label, #label").forEach((label) => {
      const title = label.getAttribute("title");
      if (!title) {
        return;
      }

      label.dataset.originalTitle = title;
      label.removeAttribute("title");
    });
  }

  #createIndicator(description: string): HTMLElement {
    const indicator = document.createElement("neat-tip-indicator");
    indicator.classList.add("neattip-indicator");
    indicator.setAttribute("role", "button");
    indicator.setAttribute("tabindex", "0");
    indicator.setAttribute(
      "aria-label",
      description ? "View property description" : "Add property description",
    );
    indicator.dataset.neattipMarkdown = description;
    indicator.textContent = NEATTIP_CONFIG.indicatorChar;
    return indicator;
  }

  refreshLayoutDescription(layout: HTMLElement): string {
    if (!isProcessed(layout)) {
      return "";
    }

    helperTextService.applyToLayout(layout);
    const cultureContext = this.cultureService.getResolutionContext();
    const description = syncResolvedDescription(layout, cultureContext);
    const indicator = queryLayoutRoot(layout).querySelector<HTMLElement>("neat-tip-indicator");

    if (indicator) {
      indicator.dataset.neattipMarkdown = description;
      indicator.setAttribute(
        "aria-label",
        description ? "View property description" : "Add property description",
      );
    }

    layout.dataset.neattipResolvedCulture = cultureKey(cultureContext.activeCulture);
    this.tooltipManager.refreshIfActiveLayout(layout);

    return description;
  }

  #attachHandlers(indicator: HTMLElement, layout: HTMLElement): void {
    let isHovering = false;
    const isNodeInsideIndicator = (target: EventTarget | null): boolean => {
      if (!(target instanceof Node)) {
        return false;
      }

      if (target === indicator || indicator.contains(target)) {
        return true;
      }

      const root = target.getRootNode();
      return root instanceof ShadowRoot && root.host === indicator;
    };

    const resolveDescription = (): string => {
      const cultureContext = this.cultureService.getResolutionContext();
      const description = syncResolvedDescription(layout, cultureContext).trim();
      if (description) {
        indicator.dataset.neattipMarkdown = description;
      } else {
        delete indicator.dataset.neattipMarkdown;
      }

      return description;
    };

    indicator.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.tooltipManager.toggle(indicator, resolveDescription());
    });

    const onHoverEnter = () => {
      if (isHovering) {
        return;
      }
      isHovering = true;

      if (this.tooltipManager.isEditing()) {
        return;
      }

      if (this.tooltipManager.isToggled() && !this.tooltipManager.isActiveIndicator(indicator)) {
        return;
      }

      this.tooltipManager.cancelScheduledHide();
      this.tooltipManager.show(indicator, resolveDescription(), false);
    };

    const onHoverLeave = (event: Event) => {
      const pointerEvent = event as MouseEvent | PointerEvent;
      if (isNodeInsideIndicator(pointerEvent.relatedTarget)) {
        return;
      }

      isHovering = false;
      this.tooltipManager.scheduleHide(event);
    };

    indicator.addEventListener("pointerenter", onHoverEnter);
    indicator.addEventListener("pointerleave", onHoverLeave);

    indicator.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      this.tooltipManager.toggle(indicator, resolveDescription());
    });
  }
}
