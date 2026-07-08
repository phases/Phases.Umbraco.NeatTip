import { DOCUMENT_WORKSPACE_SELECTORS } from "../constants/selectors.js";

export function getShadowRoot(element: Element): ShadowRoot | null {
  return element.shadowRoot ?? null;
}

export function queryInShadowTree<T extends Element>(
  root: ParentNode,
  selector: string,
): T | null {
  const direct = root.querySelector<T>(selector);
  if (direct) {
    return direct;
  }

  const elements = root.querySelectorAll<Element>("*");
  for (const element of elements) {
    if (!element.shadowRoot) {
      continue;
    }

    const match = queryInShadowTree<T>(element.shadowRoot, selector);
    if (match) {
      return match;
    }
  }

  return null;
}

export function queryAllInShadowTree<T extends Element>(
  root: ParentNode,
  selector: string,
): T[] {
  const results: T[] = [];

  root.querySelectorAll<T>(selector).forEach((element) => results.push(element));

  root.querySelectorAll<Element>("*").forEach((element) => {
    if (!element.shadowRoot) {
      return;
    }

    queryAllInShadowTree<T>(element.shadowRoot, selector).forEach((match) => {
      results.push(match);
    });
  });

  return results;
}

export function collectPropertyLayouts(root: ParentNode = document.body): HTMLElement[] {
  const layouts: HTMLElement[] = [];
  const seen = new Set<HTMLElement>();

  const visit = (node: Node): void => {
    if (node instanceof HTMLElement) {
      if (node.tagName === "UMB-PROPERTY-LAYOUT" && !seen.has(node)) {
        seen.add(node);
        layouts.push(node);
      }

      if (node.shadowRoot) {
        visit(node.shadowRoot);
      }
    }

    node.childNodes.forEach(visit);
  };

  visit(root);
  return layouts;
}

export function isWithinDocumentWorkspace(element: Element): boolean {
  let node: Node | null = element;

  while (node) {
    if (node instanceof Element) {
      if (node.matches(DOCUMENT_WORKSPACE_SELECTORS)) {
        return true;
      }
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

export function queryLayoutRoot(layout: HTMLElement): ParentNode {
  return layout.shadowRoot ?? layout;
}
