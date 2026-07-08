import { DESCRIPTION_SELECTORS, NEATTIP_MARKERS } from "../constants/selectors.js";
import { resolvePropertyDescription } from "../services/label-placement.service.js";
import {
  FLASH_STYLE_ID,
  injectFlashStyleIntoLayout,
  storeAndClearLayoutDescription,
} from "./flash-description.util.js";
import { collectPropertyLayouts, queryLayoutRoot } from "./shadow-dom.util.js";

function layoutHasIndicator(layout: HTMLElement): boolean {
  return !!queryLayoutRoot(layout).querySelector("neat-tip-indicator, .neattip-wrapper");
}

export function resetLayoutForReprocessing(layout: HTMLElement): void {
  const root = queryLayoutRoot(layout);
  const storedDescription = layout.dataset.neattipStoredDescription;

  root.querySelectorAll(".neattip-wrapper, neat-tip-indicator").forEach((element) => {
    element.remove();
  });

  layout.classList.remove(
    NEATTIP_MARKERS.processed,
    NEATTIP_MARKERS.keepVisible,
  );

  root.querySelector(`#${FLASH_STYLE_ID}`)?.remove();

  root.querySelectorAll<HTMLElement>(DESCRIPTION_SELECTORS).forEach((element) => {
    element.classList.remove(NEATTIP_MARKERS.hidden, NEATTIP_MARKERS.keepVisible);
    element.style.removeProperty("display");
    element.style.removeProperty("visibility");
    element.style.removeProperty("opacity");
    element.style.removeProperty("height");
    element.style.removeProperty("overflow");
  });

  if (storedDescription?.trim()) {
    layout.dataset.neattipStoredDescription = storedDescription.trim();
    injectFlashStyleIntoLayout(layout);
    return;
  }

  storeAndClearLayoutDescription(layout);
  injectFlashStyleIntoLayout(layout);
}

export function resetAllLayouts(layouts = collectPropertyLayouts()): void {
  layouts
    .filter((layout) => layout.classList.contains(NEATTIP_MARKERS.processed))
    .forEach((layout) => resetLayoutForReprocessing(layout));
}

export function resetUnhealthyLayouts(layouts = collectPropertyLayouts()): void {
  layouts
    .filter((layout) => isStaleProcessedLayout(layout))
    .forEach((layout) => resetLayoutForReprocessing(layout));
}

export function isStaleProcessedLayout(layout: HTMLElement): boolean {
  if (!layout.classList.contains(NEATTIP_MARKERS.processed)) {
    return false;
  }

  const hasIndicator = layoutHasIndicator(layout);
  const keepVisible = layout.classList.contains(NEATTIP_MARKERS.keepVisible);

  if (keepVisible) {
    return !hasIndicator && !resolvePropertyDescription(layout);
  }

  if (!hasIndicator) {
    return true;
  }

  const host = layout as HTMLElement & { description?: string };
  if (host.description?.trim()) {
    return true;
  }

  const root = queryLayoutRoot(layout);
  const description = root.querySelector<HTMLElement>(DESCRIPTION_SELECTORS);
  if (!description) {
    return false;
  }

  if (description.classList.contains(NEATTIP_MARKERS.hidden)) {
    return false;
  }

  return (description.textContent?.trim().length ?? 0) > 0;
}
