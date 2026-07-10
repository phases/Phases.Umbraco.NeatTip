import { NEATTIP_CONFIG } from "../config/neattip.config.js";

export interface TooltipPosition {
  top: number;
  left: number;
}

export interface TooltipPositionOptions {
  host?: HTMLElement;
  viewportMargin?: number;
}

type TooltipPositionMode = "absolute" | "fixed";

interface PositionContext {
  height: number;
  mode: TooltipPositionMode;
  originLeft: number;
  originTop: number;
  scrollLeft: number;
  scrollTop: number;
  width: number;
}

export class TooltipPositionService {
  position(
    tooltip: HTMLElement,
    indicator: HTMLElement,
    options: TooltipPositionOptions = {},
  ): void {
    const viewportMargin = options.viewportMargin ?? NEATTIP_CONFIG.viewportMargin;
    const context = this.#resolveContext(options.host);
    this.applyHostPositionMode(tooltip, options.host);
    this.#placeTooltip(tooltip, indicator, viewportMargin, context);
  }

  applyHostPositionMode(tooltip: HTMLElement, host?: HTMLElement): void {
    tooltip.style.position = this.#resolveContext(host).mode;
  }

  readTooltipPosition(tooltip: HTMLElement, host?: HTMLElement): TooltipPosition {
    const context = this.#resolveContext(host);

    if (context.mode === "absolute") {
      return {
        top: tooltip.offsetTop,
        left: tooltip.offsetLeft,
      };
    }

    const rect = tooltip.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
    };
  }

  resolveBounds(host?: HTMLElement): Pick<PositionContext, "height" | "width"> {
    const context = this.#resolveContext(host);
    return {
      width: context.width,
      height: context.height,
    };
  }

  clampToViewport(
    position: TooltipPosition,
    tooltip: HTMLElement,
    margin = 10,
    host?: HTMLElement,
  ): TooltipPosition {
    const width = tooltip.offsetWidth;
    const height = tooltip.offsetHeight;
    const context = this.#resolveContext(host);

    return {
      top: Math.max(
        context.scrollTop + margin,
        Math.min(position.top, context.scrollTop + context.height - height - margin),
      ),
      left: Math.max(
        context.scrollLeft + margin,
        Math.min(position.left, context.scrollLeft + context.width - width - margin),
      ),
    };
  }

  #resolveContext(host?: HTMLElement): PositionContext {
    if (!host || host === document.body) {
      return {
        mode: "fixed",
        width: window.innerWidth,
        height: window.innerHeight,
        originTop: 0,
        originLeft: 0,
        scrollTop: 0,
        scrollLeft: 0,
      };
    }

    const hostRect = host.getBoundingClientRect();
    return {
      mode: "absolute",
      width: host.clientWidth,
      height: host.clientHeight,
      originTop: hostRect.top,
      originLeft: hostRect.left,
      scrollTop: host.scrollTop,
      scrollLeft: host.scrollLeft,
    };
  }

  #placeTooltip(
    tooltip: HTMLElement,
    indicator: HTMLElement,
    viewportMargin: number,
    context: PositionContext,
  ): void {
    const indicatorRect = indicator.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let top =
      indicatorRect.bottom - context.originTop + context.scrollTop + 10;
    let left =
      indicatorRect.left
      - context.originLeft
      + context.scrollLeft
      + indicatorRect.width / 2
      - tooltipRect.width / 2;

    const maxLeft =
      context.scrollLeft + context.width - tooltipRect.width - viewportMargin;
    left = Math.max(
      context.scrollLeft + viewportMargin,
      Math.min(left, maxLeft),
    );

    const visibleBottom =
      context.scrollTop + context.height - viewportMargin;
    const wouldOverflowBottom = top + tooltipRect.height > visibleBottom;

    tooltip.classList.toggle("neattip-bottom", wouldOverflowBottom);

    if (wouldOverflowBottom) {
      top =
        indicatorRect.top
        - context.originTop
        + context.scrollTop
        - tooltipRect.height
        - 10;
    }

    top = Math.max(context.scrollTop + viewportMargin, top);

    const arrowLeft =
      indicatorRect.left
      - context.originLeft
      + context.scrollLeft
      + indicatorRect.width / 2
      - left;
    tooltip.style.setProperty("--arrow-left", `${arrowLeft}px`);
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }
}
