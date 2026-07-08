import { neattipRuntime } from "../config/neattip-runtime.js";
import { DESCRIPTION_SELECTORS, NEATTIP_MARKERS } from "../constants/selectors.js";
import {
  getLivePropertyDescription,
  markKeepVisible,
  markProcessed,
  resolvePropertyDescription,
} from "../services/label-placement.service.js";
import { queryLayoutRoot } from "./shadow-dom.util.js";

export const FLASH_STYLE_ID = "neattip-flash-style";

export function isFlashPreventionContext(): boolean {
  if (!neattipRuntime.enabled) {
    return false;
  }

  const path = window.location.pathname;

  if (
    path.includes("/section/settings") ||
    path.includes("/section/member") ||
    path.includes("/section/media")
  ) {
    return false;
  }

  return path.includes("/section/content");
}

export function storeAndClearLayoutDescription(layout: HTMLElement): boolean {
  const description =
    layout.dataset.neattipStoredDescription?.trim() || getLivePropertyDescription(layout);

  if (!description) {
    return false;
  }

  layout.dataset.neattipStoredDescription = description;

  const host = layout as HTMLElement & { description?: string };
  if (!host.description?.trim() && !layout.getAttribute("description")?.trim()) {
    return true;
  }

  host.description = "";
  layout.removeAttribute("description");

  const litLayout = layout as HTMLElement & { requestUpdate?: (name?: string) => void };
  litLayout.requestUpdate?.("description");
  return true;
}

export function restoreStoredDescription(layout: HTMLElement): boolean {
  const storedDescription = layout.dataset.neattipStoredDescription?.trim();
  if (!storedDescription) {
    return false;
  }

  const host = layout as HTMLElement & { description?: string };
  host.description = storedDescription;
  layout.setAttribute("description", storedDescription);

  const litLayout = layout as HTMLElement & { requestUpdate?: (name?: string) => void };
  litLayout.requestUpdate?.("description");
  return true;
}

export function withLayoutRoot(
  layout: HTMLElement,
  callback: (root: ShadowRoot) => void,
  maxAttempts = 32,
): void {
  const attempt = (remaining: number): void => {
    const root = layout.shadowRoot;
    if (root) {
      callback(root);
      return;
    }

    if (remaining <= 0) {
      return;
    }

    queueMicrotask(() => attempt(remaining - 1));
  };

  attempt(maxAttempts);
}

export function injectFlashStyleIntoLayout(layout: HTMLElement): void {
  withLayoutRoot(layout, (root) => {
    if (root.getElementById(FLASH_STYLE_ID)) {
      return;
    }

    const style = document.createElement("style");
    style.id = FLASH_STYLE_ID;
    style.textContent = `
      #description,
      umb-ufm-render#description,
      [slot="description"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
      }
    `;
    root.prepend(style);
  });
}

export function hideDescriptionTargets(layout: HTMLElement, _force = false): void {
  if (!neattipRuntime.enabled) {
    return;
  }

  if (
    layout.classList.contains(NEATTIP_MARKERS.keepVisible) ||
    (layout.classList.contains(NEATTIP_MARKERS.processed)
      && !!queryLayoutRoot(layout).querySelector("neat-tip-indicator, .neattip-wrapper"))
  ) {
    return;
  }

  if (layout.classList.contains(NEATTIP_MARKERS.processed)) {
    layout.classList.remove(NEATTIP_MARKERS.processed, NEATTIP_MARKERS.keepVisible);
  }

  const description = resolvePropertyDescription(layout);

  if (!description) {
    return;
  }

  if (description.length < neattipRuntime.minLength) {
    restoreStoredDescription(layout);
    markKeepVisible(layout);
    markProcessed(layout);
    return;
  }

  storeAndClearLayoutDescription(layout);
  injectFlashStyleIntoLayout(layout);

  const root = queryLayoutRoot(layout);
  root.querySelectorAll<HTMLElement>(DESCRIPTION_SELECTORS).forEach((target) => {
    if (
      target.classList.contains(NEATTIP_MARKERS.processed) ||
      target.classList.contains(NEATTIP_MARKERS.keepVisible)
    ) {
      return;
    }

    target.style.display = "none";
    target.style.visibility = "hidden";
    target.style.opacity = "0";
    target.style.height = "0";
    target.style.overflow = "hidden";
  });
}

export function visitAddedNodes(node: Node, visitor: (layout: HTMLElement) => void): void {
  if (node instanceof HTMLElement) {
    if (node.tagName === "UMB-PROPERTY-LAYOUT") {
      visitor(node);
    }

    if (node.tagName === "UMB-PROPERTY" && node.shadowRoot) {
      node.shadowRoot.querySelectorAll<HTMLElement>("umb-property-layout").forEach(visitor);
    }

    if (node.shadowRoot) {
      visitAddedNodes(node.shadowRoot, visitor);
    }
  }

  node.childNodes.forEach((child) => visitAddedNodes(child, visitor));
}
