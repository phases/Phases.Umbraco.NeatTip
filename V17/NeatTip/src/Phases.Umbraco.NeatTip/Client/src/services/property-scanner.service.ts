import { neattipRuntime } from "../config/neattip-runtime.js";
import { NEATTIP_CONFIG } from "../config/neattip.config.js";
import {
  getLivePropertyDescription,
  isProcessed,
} from "./label-placement.service.js";
import { collectPropertyLayouts } from "../utils/shadow-dom.util.js";
import {
  captureOriginalDescription,
  parseCultureDescriptions,
  setCultureDescription,
} from "../utils/culture-description.util.js";
import { storeAndClearLayoutDescription } from "../utils/flash-description.util.js";
import {
  refreshDomMutationObserver,
  subscribeDomMutations,
} from "../utils/dom-mutation-hub.js";
import { resolveDocumentKeyFromLocation } from "../utils/document-context.util.js";
import { helperTextService } from "./helper-text.service.js";
import type { PropertyProcessorService } from "./property-processor.service.js";
import type { VariantCultureService } from "./variant-culture.service.js";
import type { WorkspaceContextService } from "./workspace-context.service.js";

export class PropertyScannerService {
  #unsubscribeDomMutations: (() => void) | undefined;
  #debounceTimer: ReturnType<typeof setTimeout> | undefined;
  #frameTimer: ReturnType<typeof requestAnimationFrame> | undefined;
  #layoutObservers = new WeakMap<HTMLElement, MutationObserver>();
  #activeObservers = new Set<MutationObserver>();

  constructor(
    private readonly workspace: WorkspaceContextService,
    private readonly processor: PropertyProcessorService,
    private readonly cultureService: VariantCultureService,
  ) {}

  start(): void {
    void this.#scanDocument();
    this.#unsubscribeDomMutations = subscribeDomMutations(() => this.#scheduleScan());
  }

  scanNow(): void {
    refreshDomMutationObserver();
    void this.#scanDocument();
  }

  processLayout(layout: HTMLElement): void {
    this.#observeLayout(layout);
    this.processor.process(layout);
  }

  stop(): void {
    clearTimeout(this.#debounceTimer);
    if (this.#frameTimer) {
      cancelAnimationFrame(this.#frameTimer);
    }
    this.#activeObservers.forEach((observer) => observer.disconnect());
    this.#activeObservers.clear();
    this.#layoutObservers = new WeakMap();
    this.#unsubscribeDomMutations?.();
    this.#unsubscribeDomMutations = undefined;
  }

  #scheduleScan(): void {
    clearTimeout(this.#debounceTimer);
    if (this.#frameTimer) {
      cancelAnimationFrame(this.#frameTimer);
    }

    this.#frameTimer = requestAnimationFrame(() => {
      void this.#scanDocument();
    });

    this.#debounceTimer = setTimeout(
      () => void this.#scanDocument(),
      NEATTIP_CONFIG.observerDebounceMs,
    );
  }

  async #scanDocument(): Promise<void> {
    if (
      !neattipRuntime.settingsLoaded ||
      !neattipRuntime.enabled ||
      !this.workspace.isDocumentContentEdit()
    ) {
      return;
    }

    const documentKey = resolveDocumentKeyFromLocation();
    if (documentKey) {
      try {
        await helperTextService.ensureLoaded(documentKey);
      } catch {
        // Continue with property-description fallbacks when helper text cannot be loaded.
      }
    }

    collectPropertyLayouts().forEach((layout) => {
      this.#observeLayout(layout);
      this.processor.process(layout);
    });
  }

  #observeLayout(layout: HTMLElement): void {
    if (this.#layoutObservers.has(layout)) {
      return;
    }

    const observer = new MutationObserver(() => {
      if (!isProcessed(layout)) {
        this.processor.process(layout);
        return;
      }

      this.#handleProcessedLayoutDescriptionChange(layout);
    });

    observer.observe(layout, {
      attributes: true,
      attributeFilter: ["description", "label"],
    });

    this.#layoutObservers.set(layout, observer);
    this.#activeObservers.add(observer);
  }

  refreshAllLayoutDescriptions(): void {
    if (!neattipRuntime.enabled || !this.workspace.isDocumentContentEdit()) {
      return;
    }

    collectPropertyLayouts()
      .filter((layout) => isProcessed(layout))
      .forEach((layout) => this.processor.refreshLayoutDescription(layout));
  }

  #handleProcessedLayoutDescriptionChange(layout: HTMLElement): void {
    const liveDescription = getLivePropertyDescription(layout).trim();
    if (!liveDescription) {
      return;
    }

    if (Object.keys(parseCultureDescriptions(layout)).length > 0) {
      this.processor.refreshLayoutDescription(layout);
      return;
    }

    captureOriginalDescription(layout);

    const cultureContext = this.cultureService.getResolutionContext();
    setCultureDescription(layout, cultureContext.activeCulture, liveDescription);
    this.processor.refreshLayoutDescription(layout);

    const host = layout as HTMLElement & { description?: string };
    if (host.description?.trim() || layout.getAttribute("description")?.trim()) {
      storeAndClearLayoutDescription(layout);
    }
  }
}
