import { neattipRuntime } from "../config/neattip-runtime.js";
import { NEATTIP_CONFIG } from "../config/neattip.config.js";
import { NEATTIP_MARKERS } from "../constants/selectors.js";
import {
  FLASH_STYLE_ID,
  hideDescriptionTargets,
  isFlashPreventionContext,
} from "../utils/flash-description.util.js";
import { collectPropertyLayouts, queryLayoutRoot } from "../utils/shadow-dom.util.js";
import {
  refreshDomMutationObserver,
  subscribeDomMutations,
} from "../utils/dom-mutation-hub.js";
import type { WorkspaceContextService } from "./workspace-context.service.js";

export class FlashPreventionService {
  #fallbackTimer: ReturnType<typeof setTimeout> | undefined;
  #unsubscribeDomMutations: (() => void) | undefined;
  #onLayoutDetected: ((layout: HTMLElement) => void) | undefined;

  constructor(private readonly workspace: WorkspaceContextService) {}

  setLayoutDetectedHandler(handler: (layout: HTMLElement) => void): void {
    this.#onLayoutDetected = handler;
  }

  start(): void {
    if (!neattipRuntime.settingsLoaded || !neattipRuntime.enabled) {
      return;
    }

    if (!this.workspace.isContentEditingContext()) {
      return;
    }

    this.#hideExistingDescriptions();
    this.#ensureObserver();
    refreshDomMutationObserver();
    this.#scheduleFallback();
  }

  stop(): void {
    clearTimeout(this.#fallbackTimer);
    this.#unsubscribeDomMutations?.();
    this.#unsubscribeDomMutations = undefined;
  }

  cancelFallback(): void {
    clearTimeout(this.#fallbackTimer);
    this.#fallbackTimer = undefined;
  }

  hideLayoutDescriptions(layout: HTMLElement, force = false): void {
    hideDescriptionTargets(layout, force);
  }

  scanAllLayouts(): void {
    if (!neattipRuntime.settingsLoaded || !isFlashPreventionContext()) {
      return;
    }

    collectPropertyLayouts().forEach((layout) => this.#handleLayout(layout, true));
  }

  #hideExistingDescriptions(): void {
    collectPropertyLayouts().forEach((layout) => this.#handleLayout(layout, true));
  }

  #ensureObserver(): void {
    if (this.#unsubscribeDomMutations) {
      return;
    }

    this.#unsubscribeDomMutations = subscribeDomMutations(() => {
      if (!neattipRuntime.settingsLoaded || !isFlashPreventionContext()) {
        return;
      }

      collectPropertyLayouts().forEach((layout) => this.#handleLayout(layout));
    });
  }

  #handleLayout(layout: HTMLElement, force = false): void {
    hideDescriptionTargets(layout, force);
    this.#onLayoutDetected?.(layout);
  }

  #scheduleFallback(): void {
    clearTimeout(this.#fallbackTimer);

    this.#fallbackTimer = setTimeout(() => {
      if (this.workspace.isDocumentContentEdit()) {
        return;
      }

      collectPropertyLayouts().forEach((layout) => {
        if (layout.classList.contains(NEATTIP_MARKERS.processed)) {
          return;
        }

        queryLayoutRoot(layout)
          .querySelectorAll<HTMLElement>("[id='description'], umb-ufm-render, [slot='description']")
          .forEach((target) => {
            target.style.display = "";
            target.style.visibility = "visible";
            target.style.opacity = "";
            target.style.height = "";
            target.style.overflow = "";
            target.classList.add(NEATTIP_MARKERS.keepVisible);
          });

        layout.classList.add(NEATTIP_MARKERS.keepVisible);
        queryLayoutRoot(layout).querySelector(`#${FLASH_STYLE_ID}`)?.remove();
      });
    }, NEATTIP_CONFIG.flashFallbackMs);
  }
}
