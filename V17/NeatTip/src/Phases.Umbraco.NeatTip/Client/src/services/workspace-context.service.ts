import {
  EXCLUDED_EDITOR_SELECTORS,
} from "../constants/selectors.js";
import { subscribeRouteChanges } from "./route-change.service.js";
import { isWithinDocumentWorkspace } from "../utils/shadow-dom.util.js";

const DOCUMENT_EDIT_PATTERN = /\/document\/edit\//i;
const CONTENT_SECTION_PATTERN = /\/section\/content/i;
const EXCLUDED_SECTIONS = ["/section/settings", "/section/member", "/section/media"];

export class WorkspaceContextService {
  subscribeNavigation(listener: () => void): () => void {
    return subscribeRouteChanges(listener);
  }

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
