import type { TooltipPosition } from "./tooltip-position.service.js";
import { NEATTIP_CONFIG } from "../config/neattip.config.js";

type PositionChangeHandler = (position: TooltipPosition) => void;

export class TooltipDragService {
  #isDragging = false;
  #activePointerId: number | undefined;
  #startX = 0;
  #startY = 0;
  #startTop = 0;
  #startLeft = 0;
  #activeTooltip: HTMLElement | undefined;
  #pendingPosition: TooltipPosition | undefined;
  #animationFrameId: number | undefined;
  #onPositionChange: PositionChangeHandler | undefined;

  get isDragging(): boolean {
    return this.#isDragging;
  }

  setup(
    tooltip: HTMLElement,
    handle: HTMLElement,
    onPositionChange: PositionChangeHandler,
  ): void {
    this.teardown(tooltip, handle);
    this.#onPositionChange = onPositionChange;

    handle.addEventListener("pointerdown", this.#onPointerDown);
  }

  teardown(tooltip: HTMLElement, handle: HTMLElement): void {
    handle.removeEventListener("pointerdown", this.#onPointerDown);
    document.removeEventListener("pointermove", this.#onPointerMove);
    document.removeEventListener("pointerup", this.#onPointerUp);
    document.removeEventListener("pointercancel", this.#onPointerUp);
    if (this.#animationFrameId !== undefined) {
      cancelAnimationFrame(this.#animationFrameId);
      this.#animationFrameId = undefined;
    }
    tooltip.classList.remove("neattip-dragging");
    this.#activeTooltip = undefined;
    this.#pendingPosition = undefined;
    this.#activePointerId = undefined;
    this.#isDragging = false;
  }

  readonly #onPointerDown = (event: PointerEvent): void => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const tooltip = (event.currentTarget as HTMLElement).closest<HTMLElement>(".neattip-tooltip");
    if (!tooltip) {
      return;
    }

    if ((event.target as Element | null)?.closest("a, button, input, textarea, select")) {
      return;
    }

    event.preventDefault();
    this.#activeTooltip = tooltip;
    this.#activePointerId = event.pointerId;
    this.#isDragging = true;
    this.#startX = event.clientX;
    this.#startY = event.clientY;
    const rect = tooltip.getBoundingClientRect();
    this.#startTop = rect.top;
    this.#startLeft = rect.left;
    tooltip.classList.add("neattip-dragging");

    document.addEventListener("pointermove", this.#onPointerMove);
    document.addEventListener("pointerup", this.#onPointerUp);
    document.addEventListener("pointercancel", this.#onPointerUp);
  };

  readonly #onPointerMove = (event: PointerEvent): void => {
    if (!this.#isDragging || this.#activePointerId !== event.pointerId) {
      return;
    }

    const tooltip = this.#activeTooltip;
    if (!tooltip) {
      return;
    }

    const deltaX = event.clientX - this.#startX;
    const deltaY = event.clientY - this.#startY;
    const unclamped = {
      top: this.#startTop + deltaY,
      left: this.#startLeft + deltaX,
    };
    const maxTop = Math.max(
      NEATTIP_CONFIG.viewportMargin,
      window.innerHeight - tooltip.offsetHeight - NEATTIP_CONFIG.viewportMargin,
    );
    const maxLeft = Math.max(
      NEATTIP_CONFIG.viewportMargin,
      window.innerWidth - tooltip.offsetWidth - NEATTIP_CONFIG.viewportMargin,
    );
    this.#pendingPosition = {
      top: Math.max(NEATTIP_CONFIG.viewportMargin, Math.min(unclamped.top, maxTop)),
      left: Math.max(NEATTIP_CONFIG.viewportMargin, Math.min(unclamped.left, maxLeft)),
    };

    if (this.#animationFrameId === undefined) {
      this.#animationFrameId = requestAnimationFrame(() => {
        this.#animationFrameId = undefined;
        this.#flushPendingPosition();
      });
    }
  };

  readonly #onPointerUp = (event: PointerEvent): void => {
    if (this.#activePointerId !== event.pointerId) {
      return;
    }

    this.#flushPendingPosition();
    const tooltip = this.#activeTooltip;
    tooltip?.classList.remove("neattip-dragging");
    this.#activeTooltip = undefined;
    this.#pendingPosition = undefined;
    this.#activePointerId = undefined;
    this.#isDragging = false;
    document.removeEventListener("pointermove", this.#onPointerMove);
    document.removeEventListener("pointerup", this.#onPointerUp);
    document.removeEventListener("pointercancel", this.#onPointerUp);
  };

  #flushPendingPosition(): void {
    const tooltip = this.#activeTooltip;
    const position = this.#pendingPosition;
    if (!tooltip || !position) {
      return;
    }

    tooltip.style.top = `${position.top}px`;
    tooltip.style.left = `${position.left}px`;
    this.#onPositionChange?.(position);
  }
}
