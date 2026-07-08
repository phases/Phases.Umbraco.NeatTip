import { LABEL_SELECTORS } from "../constants/selectors.js";
import { queryLayoutRoot } from "../utils/shadow-dom.util.js";
import type { PropertyDescriptionUpdateTarget } from "./neattip-property-description-api.service.js";

type DescriptionOverrideState = Record<string, string>;

const STORAGE_KEY = "neattip.description.overrides.v1";
const DOCUMENT_EDIT_PATTERN = /\/document\/edit\/([^/?#]+)/i;

class DescriptionOverrideService {
  resolveUpdateTarget(layout: HTMLElement): PropertyDescriptionUpdateTarget | undefined {
    const documentKey = this.#resolveDocumentId();
    if (!documentKey) {
      return undefined;
    }

    const propertyHost = findClosestAcrossShadow(
      layout,
      "umb-property, umb-content-workspace-property",
    );

    const propertyAlias = this.#resolvePropertyAlias(layout, propertyHost);
    const propertyKey = this.#resolvePropertyGuid(layout, propertyHost);
    const propertyLabel = this.#resolvePropertyLabel(layout);
    if (!propertyAlias && !propertyKey && !propertyLabel) {
      return undefined;
    }

    return {
      documentKey,
      propertyAlias,
      propertyKey,
      propertyLabel,
    };
  }

  get(layout: HTMLElement): string | undefined {
    const key = this.#resolveLayoutKey(layout);
    if (!key) {
      return undefined;
    }

    const state = this.#readState();
    const value = state[key]?.trim();
    return value ? value : undefined;
  }

  set(layout: HTMLElement, description: string): boolean {
    const key = this.#resolveLayoutKey(layout);
    if (!key) {
      return false;
    }

    const value = description.trim();
    if (!value) {
      return false;
    }

    const state = this.#readState();
    state[key] = value;
    this.#writeState(state);
    return true;
  }

  #resolveLayoutKey(layout: HTMLElement): string | undefined {
    const documentId = this.#resolveDocumentId();
    const propertyKey = this.#resolveStoragePropertyKey(layout);
    if (!documentId || !propertyKey) {
      return undefined;
    }

    return `${documentId}::${propertyKey}`;
  }

  #resolveDocumentId(): string | undefined {
    const location = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const match = location.match(DOCUMENT_EDIT_PATTERN);
    return match?.[1];
  }

  #resolveStoragePropertyKey(layout: HTMLElement): string | undefined {
    const propertyHost = findClosestAcrossShadow(layout, "umb-property, umb-content-workspace-property");

    const alias = this.#resolvePropertyAlias(layout, propertyHost);
    if (alias) {
      return alias.toLowerCase();
    }

    const propertyGuid = this.#resolvePropertyGuid(layout, propertyHost);
    if (propertyGuid) {
      return `key:${propertyGuid.toLowerCase()}`;
    }

    const root = queryLayoutRoot(layout);
    const labelText = root.querySelector<HTMLElement>(LABEL_SELECTORS)?.textContent?.trim();
    return labelText ? `label:${labelText.toLowerCase()}` : undefined;
  }

  #resolvePropertyAlias(layout: HTMLElement, propertyHost: Element | null): string | undefined {
    const hostAlias =
      propertyHost?.getAttribute("alias")
      || propertyHost?.getAttribute("property-alias")
      || propertyHost?.getAttribute("data-property-alias")
      || propertyHost?.getAttribute("data-alias")
      || propertyHost?.getAttribute("propertyAlias")
      || propertyHost?.getAttribute("name");
    if (hostAlias?.trim()) {
      return hostAlias.trim();
    }

    const layoutAlias =
      layout.getAttribute("alias")
      || layout.getAttribute("property-alias")
      || layout.getAttribute("data-property-alias")
      || layout.getAttribute("data-alias")
      || layout.getAttribute("propertyAlias")
      || layout.getAttribute("name");
    if (layoutAlias?.trim()) {
      return layoutAlias.trim();
    }

    const root = queryLayoutRoot(layout);
    const aliasCandidate = root.querySelector<HTMLElement>(
      "[property-alias], [data-property-alias], [data-alias], [propertyAlias]",
    );

    const nestedAlias =
      aliasCandidate?.getAttribute("property-alias")
      || aliasCandidate?.getAttribute("data-property-alias")
      || aliasCandidate?.getAttribute("data-alias")
      || aliasCandidate?.getAttribute("propertyAlias");

    return nestedAlias?.trim() || undefined;
  }

  #resolvePropertyGuid(layout: HTMLElement, propertyHost: Element | null): string | undefined {
    const candidates = [
      propertyHost?.getAttribute("key"),
      propertyHost?.getAttribute("data-key"),
      propertyHost?.getAttribute("property-key"),
      layout.getAttribute("key"),
      layout.getAttribute("data-key"),
      layout.getAttribute("property-key"),
    ];

    for (const candidate of candidates) {
      const value = candidate?.trim();
      if (value && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) {
        return value;
      }
    }

    return undefined;
  }

  #resolvePropertyLabel(layout: HTMLElement): string | undefined {
    const root = queryLayoutRoot(layout);
    return root.querySelector<HTMLElement>(LABEL_SELECTORS)?.textContent?.trim() || undefined;
  }

  #readState(): DescriptionOverrideState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return {};
      }

      const parsed = JSON.parse(raw) as DescriptionOverrideState;
      return typeof parsed === "object" && parsed ? parsed : {};
    } catch {
      return {};
    }
  }

  #writeState(state: DescriptionOverrideState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore quota and privacy mode errors.
    }
  }
}

function findClosestAcrossShadow(start: Element, selector: string): Element | null {
  let current: Node | null = start;

  while (current) {
    if (current instanceof Element && current.matches(selector)) {
      return current;
    }

    if (current.parentNode) {
      current = current.parentNode;
      continue;
    }

    const root = current.getRootNode();
    current = root instanceof ShadowRoot ? root.host : null;
  }

  return null;
}

export const descriptionOverrideService = new DescriptionOverrideService();
