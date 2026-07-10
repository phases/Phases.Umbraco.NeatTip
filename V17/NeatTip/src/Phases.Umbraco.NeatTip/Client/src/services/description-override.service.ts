import { LABEL_SELECTORS } from "../constants/selectors.js";
import { resolveDocumentKeyFromLocation } from "../utils/document-context.util.js";
import { queryLayoutRoot } from "../utils/shadow-dom.util.js";
import type { PropertyDescriptionUpdateTarget } from "./neattip-property-description-api.service.js";

type DescriptionOverrideState = Record<string, string>;

const STORAGE_KEY = "neattip.description.overrides.v1";

export type PropertyIdentity = {
  contentTypeKey?: string;
  blockContentTypeName?: string;
  propertyAlias?: string;
  propertyKey?: string;
  propertyLabel?: string;
  isElementPropertyContext?: boolean;
};

class DescriptionOverrideService {
  resolveUpdateTarget(layout: HTMLElement): PropertyDescriptionUpdateTarget | undefined {
    const documentKey = resolveDocumentKeyFromLocation();
    if (!documentKey) {
      return undefined;
    }

    const identity = this.resolvePropertyIdentity(layout);
    if (!identity?.propertyAlias && !identity?.propertyKey && !identity?.propertyLabel) {
      return undefined;
    }

    return {
      documentKey,
      contentTypeKey: identity.contentTypeKey,
      propertyAlias: identity.propertyAlias,
      propertyKey: identity.propertyKey,
      propertyLabel: identity.propertyLabel,
    };
  }

  resolvePropertyIdentity(layout: HTMLElement): PropertyIdentity | undefined {
    const propertyHost = findClosestAcrossShadow(
      layout,
      "umb-property, umb-content-workspace-property",
    );

    const contentTypeKey = this.#resolveContentTypeKey(layout);
    const blockContentTypeName = this.#resolveBlockWorkspaceContentTypeName(layout);
    const propertyAlias = this.#resolvePropertyAlias(layout, propertyHost);
    const propertyKey = this.#resolvePropertyGuid(layout, propertyHost);
    const propertyLabel = this.#resolvePropertyLabel(layout);
    const isElementPropertyContext = this.#isElementPropertyContext(layout);
    if (!propertyAlias && !propertyKey && !propertyLabel) {
      return undefined;
    }

    return {
      contentTypeKey,
      blockContentTypeName,
      propertyAlias,
      propertyKey,
      propertyLabel,
      isElementPropertyContext,
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
    const documentId = resolveDocumentKeyFromLocation();
    const propertyKey = this.#resolveStoragePropertyKey(layout);
    if (!documentId || !propertyKey) {
      return undefined;
    }

    return `${documentId}::${propertyKey}`;
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
    const layoutAlias = readPropertyLayoutValue(layout, "alias");
    if (layoutAlias) {
      return layoutAlias;
    }

    const hostAlias = readElementPropertyValue(propertyHost, "alias");
    if (hostAlias) {
      return hostAlias;
    }

    const directLayoutAlias =
      layout.getAttribute("property-alias")
      || layout.getAttribute("data-property-alias")
      || layout.getAttribute("data-alias")
      || layout.getAttribute("propertyAlias")
      || layout.getAttribute("name");
    if (directLayoutAlias?.trim()) {
      return directLayoutAlias.trim();
    }

    const hostAttributeAlias =
      propertyHost?.getAttribute("alias")
      || propertyHost?.getAttribute("property-alias")
      || propertyHost?.getAttribute("data-property-alias")
      || propertyHost?.getAttribute("data-alias")
      || propertyHost?.getAttribute("propertyAlias")
      || propertyHost?.getAttribute("name");
    if (hostAttributeAlias?.trim()) {
      return hostAttributeAlias.trim();
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

  #resolveContentTypeKey(layout: HTMLElement): string | undefined {
    let current: Node | null = layout;

    while (current) {
      if (current instanceof Element) {
        const contentTypeKey =
          current.getAttribute("data-content-element-type-key")
          || (current instanceof HTMLElement ? current.dataset.contentElementTypeKey : undefined);
        if (contentTypeKey?.trim() && isGuid(contentTypeKey.trim())) {
          return contentTypeKey.trim();
        }
      }

      if (current instanceof Element && current.assignedSlot) {
        current = current.assignedSlot;
        continue;
      }

      if (current.parentNode) {
        current = current.parentNode;
        continue;
      }

      const root = current.getRootNode();
      current = root instanceof ShadowRoot ? root.host : null;
    }

    return undefined;
  }

  #resolveBlockWorkspaceContentTypeName(layout: HTMLElement): string | undefined {
    const editor = findClosestAcrossShadow(
      layout,
      "umb-block-workspace-editor, umb-block-workspace-view-edit",
    );
    if (!editor) {
      return undefined;
    }

    const headline = editor.querySelector("#headline");
    return headline?.textContent?.trim() || undefined;
  }

  #isElementPropertyContext(layout: HTMLElement): boolean {
    return !!findClosestAcrossShadow(
      layout,
      "umb-block-workspace-editor, umb-block-workspace-view-edit, umb-block-workspace-view-edit-property",
    );
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
      if (value && isGuid(value)) {
        return value;
      }
    }

    return undefined;
  }

  #resolvePropertyLabel(layout: HTMLElement): string | undefined {
    const root = queryLayoutRoot(layout);
    const labelText = root.querySelector<HTMLElement>(LABEL_SELECTORS)?.textContent?.trim();
    if (labelText) {
      return labelText;
    }

    return readPropertyLayoutValue(layout, "label");
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

function isGuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

type UmbPropertyLayoutHost = HTMLElement & {
  alias?: string;
  label?: string;
  description?: string;
};

function readPropertyLayoutValue(
  layout: HTMLElement,
  field: "alias" | "label" | "description",
): string | undefined {
  const host = layout as UmbPropertyLayoutHost;
  const fromProperty = host[field]?.trim();
  if (fromProperty) {
    return fromProperty;
  }

  return layout.getAttribute(field)?.trim() || undefined;
}

function readElementPropertyValue(
  element: Element | null,
  field: "alias" | "label" | "description",
): string | undefined {
  if (!element) {
    return undefined;
  }

  const host = element as HTMLElement & Record<string, unknown>;
  const fromProperty = typeof host[field] === "string" ? host[field].trim() : "";
  if (fromProperty) {
    return fromProperty;
  }

  return element.getAttribute(field)?.trim() || undefined;
}

export const descriptionOverrideService = new DescriptionOverrideService();
