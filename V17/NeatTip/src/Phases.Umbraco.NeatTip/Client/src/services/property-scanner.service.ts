import { neattipRuntime } from "../config/neattip-runtime.js";
import { NEATTIP_CONFIG } from "../config/neattip.config.js";
import { collectPropertyLayouts } from "../utils/shadow-dom.util.js";
import { ShadowMutationObserver } from "../utils/shadow-observer.util.js";
import type { PropertyProcessorService } from "./property-processor.service.js";
import type { WorkspaceContextService } from "./workspace-context.service.js";

export class PropertyScannerService {
  #shadowObserver: ShadowMutationObserver | undefined;
  #debounceTimer: ReturnType<typeof setTimeout> | undefined;
  #frameTimer: ReturnType<typeof requestAnimationFrame> | undefined;
  #layoutObservers = new WeakMap<HTMLElement, MutationObserver>();
  #activeObservers = new Set<MutationObserver>();

  constructor(
    private readonly workspace: WorkspaceContextService,
    private readonly processor: PropertyProcessorService,
  ) {}

  start(): void {
    this.#scanDocument();
    this.#shadowObserver = new ShadowMutationObserver(() => this.#scheduleScan());
    this.#shadowObserver.start(document.documentElement);
  }

  scanNow(): void {
    this.#shadowObserver?.refresh();
    this.#scanDocument();
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
    this.#shadowObserver?.stop();
    this.#shadowObserver = undefined;
  }

  #scheduleScan(): void {
    clearTimeout(this.#debounceTimer);
    if (this.#frameTimer) {
      cancelAnimationFrame(this.#frameTimer);
    }

    this.#frameTimer = requestAnimationFrame(() => {
      this.#scanDocument();
    });

    this.#debounceTimer = setTimeout(
      () => this.#scanDocument(),
      NEATTIP_CONFIG.observerDebounceMs,
    );
  }

  #scanDocument(): void {
    if (
      !neattipRuntime.settingsLoaded ||
      !neattipRuntime.enabled ||
      !this.workspace.isDocumentContentEdit()
    ) {
      return;
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
      this.processor.process(layout);
    });

    observer.observe(layout, {
      attributes: true,
      attributeFilter: ["description", "label"],
    });

    this.#layoutObservers.set(layout, observer);
    this.#activeObservers.add(observer);
  }
}
