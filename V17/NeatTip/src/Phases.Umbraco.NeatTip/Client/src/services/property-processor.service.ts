import { neattipRuntime } from "../config/neattip-runtime.js";
import { NEATTIP_CONFIG } from "../config/neattip.config.js";
import {
  hasPropertyLabel,
  hideDescription,
  isProcessed,
  LabelPlacementService,
  markKeepVisible,
  markProcessed,
  resolvePropertyDescription,
} from "./label-placement.service.js";
import { linkIndicatorToLayout } from "./tooltip-content.service.js";
import type { TooltipManagerService } from "./tooltip-manager.service.js";
import type { WorkspaceContextService } from "./workspace-context.service.js";
import {
  isStaleProcessedLayout,
  resetLayoutForReprocessing,
} from "../utils/layout-reset.util.js";
import { restoreStoredDescription } from "../utils/flash-description.util.js";

export class PropertyProcessorService {
  readonly #labelPlacement = new LabelPlacementService();

  constructor(
    private readonly workspace: WorkspaceContextService,
    private readonly tooltipManager: TooltipManagerService,
  ) {}

  process(layout: HTMLElement): void {
    if (!neattipRuntime.settingsLoaded || !neattipRuntime.enabled) {
      return;
    }

    if (!this.workspace.shouldProcessElement(layout)) {
      return;
    }

    if (isProcessed(layout)) {
      if (!isStaleProcessedLayout(layout)) {
        return;
      }

      resetLayoutForReprocessing(layout);
    }

    try {
      const description = resolvePropertyDescription(layout);

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

      this.#attachHandlers(indicator, layout, description);
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

  #attachHandlers(indicator: HTMLElement, layout: HTMLElement, description: string): void {
    const resolveDescription = (): string =>
      indicator.dataset.neattipMarkdown?.trim()
      || layout.dataset.neattipStoredDescription?.trim()
      || resolvePropertyDescription(layout)
      || description;

    indicator.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.tooltipManager.toggle(indicator, resolveDescription());
    });

    indicator.addEventListener("mouseenter", () => {
      if (this.tooltipManager.isToggled() && !this.tooltipManager.isActiveIndicator(indicator)) {
        return;
      }

      this.tooltipManager.cancelScheduledHide();
      this.tooltipManager.show(indicator, resolveDescription(), false);
    });

    indicator.addEventListener("mouseleave", () => {
      this.tooltipManager.scheduleHide();
    });

    indicator.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      this.tooltipManager.toggle(indicator, resolveDescription());
    });
  }
}
