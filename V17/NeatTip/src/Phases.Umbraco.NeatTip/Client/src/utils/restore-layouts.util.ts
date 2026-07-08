import { DESCRIPTION_SELECTORS, NEATTIP_MARKERS } from "../constants/selectors.js";
import { restoreStoredDescription } from "./flash-description.util.js";
import { collectPropertyLayouts, queryLayoutRoot } from "./shadow-dom.util.js";

export function restoreAllNeatTipLayouts(): void {
  collectPropertyLayouts().forEach((layout) => {
    const root = queryLayoutRoot(layout);

    root.querySelectorAll(".neattip-wrapper, neat-tip-indicator").forEach((element) => {
      element.remove();
    });

    root.querySelectorAll<HTMLElement>("label, uui-label, #label").forEach((label) => {
      const originalTitle = label.dataset.originalTitle;
      if (!originalTitle) {
        return;
      }

      label.setAttribute("title", originalTitle);
      delete label.dataset.originalTitle;
    });

    root.querySelectorAll<HTMLElement>(DESCRIPTION_SELECTORS).forEach((element) => {
      element.classList.remove(NEATTIP_MARKERS.hidden, NEATTIP_MARKERS.keepVisible);
      element.style.visibility = "";
      element.style.display = "";
    });

    layout.classList.remove(
      NEATTIP_MARKERS.processed,
      NEATTIP_MARKERS.keepVisible,
    );

    root.querySelector("#neattip-flash-style")?.remove();
    restoreStoredDescription(layout);
    delete layout.dataset.neattipStoredDescription;
  });
}
