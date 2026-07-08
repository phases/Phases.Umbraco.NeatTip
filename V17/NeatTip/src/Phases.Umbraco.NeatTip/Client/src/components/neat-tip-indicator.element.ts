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
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid var(--uui-color-border-emphasis, #b5b5b5);
      color: var(--uui-color-text-alt, #6f6f6f);
      font-size: 12px;
      line-height: 1;
      cursor: pointer;
      vertical-align: middle;
      isolation: isolate;
      user-select: none;
      background-color: var(--uui-color-surface, #fff);
      transition: background-color ${NEATTIP_CONFIG.fadeSpeed}ms ease,
        border-color ${NEATTIP_CONFIG.fadeSpeed}ms ease,
        color ${NEATTIP_CONFIG.fadeSpeed}ms ease;
    }

    :host(:hover),
    :host(.neattip-active) {
      background-color: var(--uui-color-surface-emphasis, #f3f3f3);
      border-color: var(--uui-color-border-emphasis, #9b9b9b);
      color: var(--uui-color-interactive-emphasis, #174f8c);
    }

    :host(:active),
    :host(.neattip-pressed) {
      background-color: var(--uui-color-background-emphasis, #e8e8e8);
      border-color: var(--uui-color-border, #8b8b8b);
    }

    :host(:focus-visible) {
      outline: 2px solid var(--uui-color-focus, #3550b8);
      outline-offset: 2px;
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--uui-color-focus, #3550b8) 25%, transparent);
    }

    uui-icon {
      font-size: 12px;
      color: currentColor;
      pointer-events: none;
    }

    slot {
      display: none;
    }

    @media (max-width: 768px) {
      :host {
        width: 18px;
        height: 18px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      :host {
        transition: none;
      }
    }

    @media (prefers-contrast: high) {
      :host {
        border-width: 2px;
        color: #000;
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
