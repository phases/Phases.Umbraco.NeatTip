import {
  EXCLUDED_EDITOR_SELECTORS,
} from "../constants/selectors.js";
import { isWithinDocumentWorkspace } from "../utils/shadow-dom.util.js";

const DOCUMENT_EDIT_PATTERN = /\/document\/edit\//i;
const CONTENT_SECTION_PATTERN = /\/section\/content/i;
const EXCLUDED_SECTIONS = ["/section/settings", "/section/member", "/section/media"];

export class WorkspaceContextService {
  #navigationListeners = new Set<() => void>();
  #originalPushState: History["pushState"] | undefined;
  #originalReplaceState: History["replaceState"] | undefined;

  isContentEditingContext(): boolean {
    const path = window.location.pathname;

    if (EXCLUDED_SECTIONS.some((section) => path.includes(section))) {
      return false;
    }

    return CONTENT_SECTION_PATTERN.test(path);
  }

  isDocumentContentEdit(): boolean {
    const location = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    return DOCUMENT_EDIT_PATTERN.test(location);
  }

  shouldProcessElement(element: Element): boolean {
    if (!this.isDocumentContentEdit()) {
      return false;
    }

    if (isWithinExcludedEditor(element)) {
      return false;
    }

    return isWithinDocumentWorkspace(element) || isWithinContentProperty(element);
  }

  subscribeNavigation(listener: () => void): () => void {
    this.#navigationListeners.add(listener);

    if (this.#navigationListeners.size === 1) {
      this.#patchHistory();
    }

    return () => {
      this.#navigationListeners.delete(listener);

      if (this.#navigationListeners.size === 0) {
        this.#restoreHistory();
      }
    };
  }

  #patchHistory(): void {
    this.#originalPushState = history.pushState.bind(history);
    this.#originalReplaceState = history.replaceState.bind(history);

    history.pushState = (...args) => {
      this.#originalPushState!(...args);
      this.#notifyNavigation();
    };

    history.replaceState = (...args) => {
      this.#originalReplaceState!(...args);
      this.#notifyNavigation();
    };
  }

  #restoreHistory(): void {
    if (this.#originalPushState) {
      history.pushState = this.#originalPushState;
    }

    if (this.#originalReplaceState) {
      history.replaceState = this.#originalReplaceState;
    }

    this.#originalPushState = undefined;
    this.#originalReplaceState = undefined;
  }

  #notifyNavigation(): void {
    queueMicrotask(() => {
      this.#navigationListeners.forEach((listener) => listener());
    });

    for (const delay of [50, 150, 400, 800]) {
      window.setTimeout(() => {
        this.#navigationListeners.forEach((listener) => listener());
      }, delay);
    }
  }
}

function isWithinExcludedEditor(element: Element): boolean {
  let node: Node | null = element;

  while (node) {
    if (node instanceof Element && node.matches(EXCLUDED_EDITOR_SELECTORS)) {
      return true;
    }

    if (node.parentNode) {
      node = node.parentNode;
      continue;
    }

    const root = node.getRootNode();
    if (root instanceof ShadowRoot) {
      node = root.host;
      continue;
    }

    break;
  }

  return false;
}

function isWithinContentProperty(element: Element): boolean {
  let node: Node | null = element;

  while (node) {
    if (node instanceof Element && node.matches("umb-property, umb-content-workspace-property")) {
      return true;
    }

    if (node.parentNode) {
      node = node.parentNode;
      continue;
    }

    const root = node.getRootNode();
    if (root instanceof ShadowRoot) {
      node = root.host;
      continue;
    }

    break;
  }

  return false;
}
