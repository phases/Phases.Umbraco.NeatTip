import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { NEATTIP_CONFIG } from "../config/neattip.config.js";

@customElement("neat-tip-indicator")
export class NeatTipIndicatorElement extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      color: var(--uui-color-text-alt, #6f6f6f);
      opacity: 0.82;
      line-height: 1;
      cursor: pointer;
      vertical-align: middle;
      isolation: isolate;
      user-select: none;
      transform: scale(1);
      transition:
        color ${NEATTIP_CONFIG.fadeSpeed}ms ease,
        opacity ${NEATTIP_CONFIG.fadeSpeed}ms ease,
        transform ${NEATTIP_CONFIG.fadeSpeed}ms ease;
    }

    :host(:hover) {
      color: var(--uui-color-text, #242424);
      opacity: 0.95;
      transform: scale(1.04);
    }

    :host(.neattip-active) {
      color: var(--uui-color-interactive-emphasis, #174f8c);
      opacity: 1;
      transform: scale(1.04);
    }

    :host(:focus-visible) {
      outline: 2px solid var(--uui-color-focus, #3550b8);
      outline-offset: 2px;
    }

    uui-icon {
      font-size: 16px;
      color: currentColor;
      pointer-events: none;
    }

    slot {
      display: none;
    }

    @media (max-width: 768px) {
      :host {
        width: 16px;
        height: 16px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      :host {
        transition: none;
      }
    }

    @media (prefers-contrast: high) {
      :host {
        opacity: 1;
      }
    }
  `;

  override render() {
    return html`
      <uui-icon name="icon-info"></uui-icon>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "neat-tip-indicator": NeatTipIndicatorElement;
  }
}
