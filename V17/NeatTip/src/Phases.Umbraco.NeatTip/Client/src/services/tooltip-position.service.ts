import { NEATTIP_CONFIG } from "../config/neattip.config.js";

export interface TooltipPosition {
  top: number;
  left: number;
}

export class TooltipPositionService {
  position(
    tooltip: HTMLElement,
    indicator: HTMLElement,
    viewportMargin = NEATTIP_CONFIG.viewportMargin,
  ): void {
    const indicatorRect = indicator.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let top = indicatorRect.bottom + 10;
    let left =
      indicatorRect.left + indicatorRect.width / 2 - tooltipRect.width / 2;

    const maxLeft = window.innerWidth - tooltipRect.width - viewportMargin;
    left = Math.max(viewportMargin, Math.min(left, maxLeft));

    const wouldOverflowBottom =
      top + tooltipRect.height > window.innerHeight - viewportMargin;

    tooltip.classList.toggle("neattip-bottom", wouldOverflowBottom);

    if (wouldOverflowBottom) {
      top = indicatorRect.top - tooltipRect.height - 10;
    }

    top = Math.max(viewportMargin, top);

    const arrowLeft = indicatorRect.left + indicatorRect.width / 2 - left;
    tooltip.style.setProperty("--arrow-left", `${arrowLeft}px`);
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }

  clampToViewport(
    position: TooltipPosition,
    tooltip: HTMLElement,
    margin = 10,
  ): TooltipPosition {
    const width = tooltip.offsetWidth;
    const height = tooltip.offsetHeight;

    return {
      top: Math.max(margin, Math.min(position.top, window.innerHeight - height - margin)),
      left: Math.max(margin, Math.min(position.left, window.innerWidth - width - margin)),
    };
  }
}
