export class ShadowMutationObserver {
  readonly #roots = new Set<Node>();
  readonly #observers: MutationObserver[] = [];
  readonly #callback: () => void;
  #scheduled = false;

  constructor(callback: () => void) {
    this.#callback = callback;
  }

  start(root: Node = document.documentElement): void {
    this.#observeRoot(root);
    this.#discoverShadowRoots(root);
  }

  stop(): void {
    this.#observers.forEach((observer) => observer.disconnect());
    this.#observers.length = 0;
    this.#roots.clear();
  }

  refresh(root: Node = document.documentElement): void {
    this.#discoverShadowRoots(root);
  }

  #schedule(): void {
    if (this.#scheduled) {
      return;
    }

    this.#scheduled = true;
    queueMicrotask(() => {
      this.#scheduled = false;
      this.#callback();
    });
  }

  #observeRoot(root: Node): void {
    if (!("childNodes" in root) || this.#roots.has(root)) {
      return;
    }

    this.#roots.add(root);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => this.#discoverShadowRoots(node));
      }

      this.#schedule();
    });

    observer.observe(root, { childList: true, subtree: true });
    this.#observers.push(observer);
  }

  #discoverShadowRoots(node: Node): void {
    if (node instanceof HTMLElement && node.shadowRoot) {
      this.#observeRoot(node.shadowRoot);
      this.#discoverShadowRoots(node.shadowRoot);
    }

    if ("childNodes" in node) {
      node.childNodes.forEach((child) => this.#discoverShadowRoots(child));
    }
  }
}
