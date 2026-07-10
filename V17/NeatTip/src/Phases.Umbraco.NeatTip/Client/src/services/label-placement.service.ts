import {
  BLOCK_TITLE_SELECTORS,
  DESCRIPTION_SELECTORS,
  LABEL_SELECTORS,
  NEATTIP_MARKERS,
  PROPERTY_LAYOUT_TAG,
  TEXTBOX_ICONS_SELECTOR,
} from "../constants/selectors.js";
import {
  type CultureResolutionContext,
  cultureKey,
  getCultureDescription,
  getOriginalDescription,
  parseCultureDescriptions,
  setCultureDescription,
} from "../utils/culture-description.util.js";
import { resolveCultureDescriptionStorage } from "../utils/culture-description-codec.js";
import { getPropertyDescriptionFallback, helperTextService } from "./helper-text.service.js";
import { queryLayoutRoot } from "../utils/shadow-dom.util.js";

export class LabelPlacementService {
  placeIndicator(layout: HTMLElement, indicator: HTMLElement): boolean {
    const root = queryLayoutRoot(layout);

    if (root.querySelector(".neattip-wrapper, neat-tip-indicator")) {
      return false;
    }

    const wrapper = document.createElement("span");
    wrapper.className = NEATTIP_MARKERS.wrapper;
    wrapper.appendChild(indicator);
    this.#injectLayoutStyles(root);

    if (this.#placeAfterLabel(root, wrapper)) {
      return true;
    }

    if (this.#placeInLabelArea(root, wrapper)) {
      return true;
    }

    if (this.#placeInBlockTitle(layout, wrapper)) {
      return true;
    }

    if (this.#placeTopRight(layout, wrapper)) {
      return true;
    }

    return this.#placeAfterDescription(root, wrapper);
  }

  #placeAfterLabel(root: ParentNode, wrapper: HTMLElement): boolean {
    const label = root.querySelector<HTMLElement>(LABEL_SELECTORS);
    if (!label) {
      return false;
    }

    const rollbackIcon = label.querySelector(TEXTBOX_ICONS_SELECTOR);
    if (rollbackIcon?.parentElement) {
      rollbackIcon.insertAdjacentElement("afterend", wrapper);
      wrapper.style.marginLeft = "8px";
      return true;
    }

    label.insertAdjacentElement("afterend", wrapper);
    wrapper.style.marginLeft = "8px";
    return true;
  }

  #placeInLabelArea(root: ParentNode, wrapper: HTMLElement): boolean {
    const labelArea = root.querySelector<HTMLElement>(
      ".umb-property-editor__label, .control-label, [slot='label'], #headerColumn",
    );
    if (!labelArea) {
      return false;
    }

    const rollbackIcon = labelArea.querySelector(TEXTBOX_ICONS_SELECTOR);
    if (rollbackIcon?.parentElement) {
      rollbackIcon.insertAdjacentElement("afterend", wrapper);
      wrapper.style.marginLeft = "8px";
      return true;
    }

    const label = labelArea.querySelector<HTMLElement>(LABEL_SELECTORS);
    if (label) {
      label.insertAdjacentElement("afterend", wrapper);
      wrapper.style.marginLeft = "8px";
      return true;
    }

    labelArea.appendChild(wrapper);
    return true;
  }

  #placeInBlockTitle(layout: HTMLElement, wrapper: HTMLElement): boolean {
    let host: Element | null = layout;
    while (host) {
      if (host instanceof ShadowRoot) {
        host = host.host;
        continue;
      }

      const blockTitle = host
        .closest("umb-block-list, umb-block-grid")
        ?.querySelector<HTMLElement>(BLOCK_TITLE_SELECTORS);

      if (blockTitle) {
        blockTitle.appendChild(wrapper);
        return true;
      }

      const root = host.getRootNode();
      host = root instanceof ShadowRoot ? root.host : null;
    }

    return false;
  }

  #placeTopRight(layout: HTMLElement, wrapper: HTMLElement): boolean {
    const root = queryLayoutRoot(layout);
    const headerColumn = root.querySelector<HTMLElement>("#headerColumn") ?? layout;

    const position = getComputedStyle(headerColumn).position;
    if (position === "static") {
      headerColumn.style.position = "relative";
    }

    wrapper.style.position = "absolute";
    wrapper.style.top = "0";
    wrapper.style.right = "0";
    headerColumn.appendChild(wrapper);
    return true;
  }

  #placeAfterDescription(root: ParentNode, wrapper: HTMLElement): boolean {
    const description = root.querySelector<HTMLElement>(DESCRIPTION_SELECTORS);
    if (!description) {
      return false;
    }

    description.insertAdjacentElement("afterend", wrapper);
    return true;
  }

  #injectLayoutStyles(root: ParentNode): void {
    if (!(root instanceof ShadowRoot) || root.getElementById("neattip-layout-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "neattip-layout-styles";
    style.textContent = `
      .neattip-wrapper {
        display: inline-flex;
        align-items: center;
        margin-left: 8px;
        vertical-align: middle;
        line-height: 1;
      }

      neat-tip-indicator {
        display: inline-flex;
      }
    `;
    root.appendChild(style);
  }
}

export function getLivePropertyDescription(layout: HTMLElement): string {
  const host = layout as HTMLElement & { description?: string };
  if (host.description?.trim()) {
    return host.description.trim();
  }

  const attributeDescription = layout.getAttribute("description");
  if (attributeDescription?.trim()) {
    return attributeDescription.trim();
  }

  const root = queryLayoutRoot(layout);
  const ufm = root.querySelector<HTMLElement & { markdown?: string }>("umb-ufm-render#description");
  if (ufm?.markdown?.trim()) {
    return ufm.markdown.trim();
  }

  const markdownAttribute = ufm?.getAttribute("markdown");
  if (markdownAttribute?.trim()) {
    return markdownAttribute.trim();
  }

  const descriptionElement = root.querySelector<HTMLElement>(DESCRIPTION_SELECTORS);
  if (!descriptionElement) {
    return "";
  }

  return descriptionElement.textContent?.trim() ?? "";
}

export function getPropertyDescription(
  layout: HTMLElement,
  cultureContext?: CultureResolutionContext,
): string {
  return resolvePropertyDescription(layout, cultureContext);
}

export function resolvePropertyDescription(
  layout: HTMLElement,
  cultureContext?: CultureResolutionContext,
): string {
  const activeCulture = cultureContext?.activeCulture;
  const fallbackCulture =
    cultureContext?.fallbackCulture ?? helperTextService.getDefaultCulture();

  if (activeCulture !== undefined) {
    const activeText = getCultureDescription(layout, activeCulture);
    if (activeText) {
      return activeText;
    }
  }

  if (fallbackCulture !== undefined && cultureKey(fallbackCulture) !== cultureKey(activeCulture)) {
    const fallbackText = getCultureDescription(layout, fallbackCulture);
    if (fallbackText) {
      return fallbackText;
    }
  }

  const original = getOriginalDescription(layout);
  if (original) {
    const resolvedOriginal = resolveCultureDescriptionStorage(original, cultureContext);
    if (resolvedOriginal) {
      return resolvedOriginal;
    }
  }

  const propertyFallback = getPropertyDescriptionFallback(layout);
  if (propertyFallback) {
    return propertyFallback;
  }

  const hasCultureMap = Object.keys(parseCultureDescriptions(layout)).length > 0;
  if (!hasCultureMap) {
    const storedDescription = layout.dataset.neattipStoredDescription?.trim();
    if (storedDescription) {
      return storedDescription;
    }
  }

  return getLivePropertyDescription(layout);
}

export function syncResolvedDescription(
  layout: HTMLElement,
  cultureContext?: CultureResolutionContext,
): string {
  const cultureMap = parseCultureDescriptions(layout);
  const hasCultureMap = Object.keys(cultureMap).length > 0;
  const resolved = resolvePropertyDescription(layout, cultureContext).trim();

  if (cultureContext?.activeCulture !== undefined) {
    const activeCultureText = getCultureDescription(layout, cultureContext.activeCulture);
    if (activeCultureText) {
      layout.dataset.neattipStoredDescription = activeCultureText;
      return activeCultureText;
    }

    if (!hasCultureMap && resolved) {
      setCultureDescription(layout, cultureContext.activeCulture, resolved);
    }
  }

  if (resolved) {
    layout.dataset.neattipStoredDescription = resolved;
  } else {
    delete layout.dataset.neattipStoredDescription;
  }

  return resolved;
}

export function hideDescription(layout: HTMLElement): void {
  const root = queryLayoutRoot(layout);

  root.querySelectorAll<HTMLElement>(DESCRIPTION_SELECTORS).forEach((element) => {
    element.classList.add(NEATTIP_MARKERS.hidden);
    element.style.visibility = "visible";
    element.style.display = "none";
  });
}

export function markKeepVisible(layout: HTMLElement): void {
  const root = queryLayoutRoot(layout);

  root.querySelector("#neattip-flash-style")?.remove();

  root.querySelectorAll<HTMLElement>(DESCRIPTION_SELECTORS).forEach((element) => {
    element.classList.remove(NEATTIP_MARKERS.hidden);
    element.classList.add(NEATTIP_MARKERS.keepVisible);
    element.style.removeProperty("display");
    element.style.removeProperty("visibility");
    element.style.removeProperty("opacity");
    element.style.removeProperty("height");
    element.style.removeProperty("overflow");
  });
  layout.classList.add(NEATTIP_MARKERS.keepVisible);
}

export function hasPropertyLabel(layout: HTMLElement): boolean {
  const host = layout as HTMLElement & { label?: string };
  if (host.label?.trim()) {
    return true;
  }

  const attributeLabel = layout.getAttribute("label");
  if (attributeLabel?.trim()) {
    return true;
  }

  const root = queryLayoutRoot(layout);
  return !!root.querySelector(LABEL_SELECTORS);
}

export function isProcessed(layout: HTMLElement): boolean {
  return layout.classList.contains(NEATTIP_MARKERS.processed);
}

export function markProcessed(layout: HTMLElement): void {
  layout.classList.add(NEATTIP_MARKERS.processed);
  queryLayoutRoot(layout).querySelector("#neattip-flash-style")?.remove();
}

export function isPropertyLayout(element: Element): element is HTMLElement {
  return element.tagName.toLowerCase() === PROPERTY_LAYOUT_TAG;
}
