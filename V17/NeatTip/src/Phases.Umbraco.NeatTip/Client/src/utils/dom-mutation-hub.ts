import { ShadowMutationObserver } from "./shadow-observer.util.js";

type DomMutationCallback = () => void;

class DomMutationHub {
  readonly #subscribers = new Set<DomMutationCallback>();
  readonly #observer: ShadowMutationObserver;

  constructor() {
    this.#observer = new ShadowMutationObserver(() => {
      for (const subscriber of this.#subscribers) {
        subscriber();
      }
    });
  }

  subscribe(callback: DomMutationCallback): () => void {
    this.#subscribers.add(callback);

    if (this.#subscribers.size === 1) {
      this.#observer.start(document.documentElement);
    }

    return () => {
      this.#subscribers.delete(callback);

      if (this.#subscribers.size === 0) {
        this.#observer.stop();
      }
    };
  }

  refresh(root: Node = document.documentElement): void {
    if (this.#subscribers.size === 0) {
      return;
    }

    this.#observer.refresh(root);
  }
}

let sharedHub: DomMutationHub | undefined;

function getHub(): DomMutationHub {
  if (!sharedHub) {
    sharedHub = new DomMutationHub();
  }

  return sharedHub;
}

/** Subscribe to document + shadow-root DOM mutations via a single shared observer. */
export function subscribeDomMutations(callback: DomMutationCallback): () => void {
  return getHub().subscribe(callback);
}

/** Re-scan for newly attached shadow roots on the shared observer. */
export function refreshDomMutationObserver(root: Node = document.documentElement): void {
  getHub().refresh(root);
}
