import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import {
  UmbNotificationContext,
  UMB_NOTIFICATION_CONTEXT,
} from "@umbraco-cms/backoffice/notification";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";
import {
  UmbValidationContext,
  umbBindToValidation,
} from "@umbraco-cms/backoffice/validation";
import {
  css,
  customElement,
  html,
  nothing,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import type { UmbWorkspaceViewElement } from "@umbraco-cms/backoffice/workspace";
import {
  dispatchNeatTipSettingsChanged,
  type NeatTipSettings,
} from "../config/neattip-runtime.js";
import {
  loadNeatTipSettings,
  saveNeatTipSettings,
} from "../services/neattip-settings-api.service.js";
import {
  NEATTIP_PACKAGE_NAME,
  NEATTIP_PACKAGE_VERSION,
} from "./constants.js";
import {
  getNeatTipDiagnostics,
  type NeatTipDiagnosticHealth,
  type NeatTipDiagnosticItem,
} from "./neattip-diagnostics.js";

type SaveButtonState = "" | "waiting" | "success" | "failed";

@customElement("phases-neattip-settings-workspace-view")
export class PhasesNeatTipSettingsWorkspaceViewElement
  extends UmbLitElement
  implements UmbWorkspaceViewElement
{
  #notificationContext?: UmbNotificationContext;
  #validationContext = new UmbValidationContext(this);

  @state()
  private _enabled = true;

  @state()
  private _minLength = 0;

  @state()
  private _loading = true;

  @state()
  private _saving = false;

  @state()
  private _saveState: SaveButtonState = "";

  @state()
  private _settingsLoadFailed = false;

  constructor() {
    super();
    this.consumeContext(UMB_NOTIFICATION_CONTEXT, (context) => {
      this.#notificationContext = context;
    });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    void this.#loadSettings();
  }

  override render() {
    if (this._loading) {
      return html`
        <div class="settings-page">
          <uui-box>
            <div class="loading">
              <uui-loader-circle></uui-loader-circle>
              <span>Loading settings…</span>
            </div>
          </uui-box>
        </div>
      `;
    }

    return html`
      <div class="settings-page uui-text">
        <header class="page-header">
          <h2>${NEATTIP_PACKAGE_NAME}</h2>
          <p class="page-description">
            Replace verbose property descriptions with compact info icons and interactive helper tooltips across the
            backoffice.
          </p>
        </header>

        <form class="settings-form" @submit=${this.#onFormSubmit}>
          <uui-box headline="General Settings">
            <umb-property-layout alias="enabled" label="Enable NeatTip">
              <p slot="description" class="setting-description">
                Replace Umbraco property descriptions with interactive helper tooltips. Disabling NeatTip immediately
                restores Umbraco's native property descriptions.
              </p>
              <div slot="editor">
                <uui-toggle
                  id="neattip-enabled"
                  .checked=${this._enabled}
                  label="Enable NeatTip"
                  @change=${this.#onEnabledChange}></uui-toggle>
              </div>
            </umb-property-layout>

            <umb-property-layout alias="minLength" label="Minimum Description Length">
              <p slot="description" class="setting-description">
                Descriptions shorter than this value continue using Umbraco's native description. 0 means every
                description uses NeatTip.
              </p>
              <div slot="editor">
                <uui-input
                  id="neattip-min-length"
                  type="number"
                  min="0"
                  step="1"
                  label="Minimum Description Length"
                  .value=${String(this._minLength)}
                  ?disabled=${!this._enabled || this._saving}
                  ${umbBindToValidation(this, "$.minLength", this._minLength)}
                  @input=${this.#onMinLengthChange}></uui-input>
              </div>
            </umb-property-layout>
          </uui-box>

          <div class="save-actions">
            <uui-button
              type="submit"
              look="primary"
              label="Save"
              .state=${this._saveState}
              ?disabled=${this._saving}
              aria-busy=${this._saving ? "true" : "false"}>
              Save
            </uui-button>
          </div>
        </form>

        <uui-box headline="Package Information">
          ${this.#renderInfoItem("Package", NEATTIP_PACKAGE_NAME)}
          ${this.#renderInfoItem("Version", NEATTIP_PACKAGE_VERSION)}
          ${this.#renderInfoItem("Localization", "Culture-aware helper text supported")}
          ${this.#renderInfoItem("Storage", "Managed internally by NeatTip")}
        </uui-box>

        <uui-box headline="Diagnostics">
          <p class="section-description">
            Read-only status of NeatTip services based on the current backoffice session.
          </p>
          ${getNeatTipDiagnostics({ settingsLoadFailed: this._settingsLoadFailed }).map((item) =>
            this.#renderDiagnosticItem(item),
          )}
        </uui-box>
      </div>
    `;
  }

  #renderInfoItem(label: string, value: string) {
    return html`
      <div class="info-item">
        <strong>${label}</strong>
        <span>${value}</span>
      </div>
    `;
  }

  #renderDiagnosticItem(item: NeatTipDiagnosticItem) {
    return html`
      <div class="diagnostic-item">
        <span class="diagnostic-label">${item.label}</span>
        <span class="diagnostic-status diagnostic-status--${item.health}">
          ${this.#renderDiagnosticIcon(item.health)}
          <span>${item.message}</span>
        </span>
      </div>
    `;
  }

  #renderDiagnosticIcon(health: NeatTipDiagnosticHealth) {
    if (health === "healthy") {
      return html`<uui-icon class="diagnostic-icon" name="icon-check"></uui-icon>`;
    }

    if (health === "warning") {
      return html`<uui-icon class="diagnostic-icon" name="icon-alert"></uui-icon>`;
    }

    return nothing;
  }

  async #loadSettings(): Promise<void> {
    this._loading = true;
    this._settingsLoadFailed = false;

    try {
      const settings = await loadNeatTipSettings();
      this._enabled = settings.enabled;
      this._minLength = settings.minLength;
    } catch {
      this._settingsLoadFailed = true;
      this.#notificationContext?.peek("danger", {
        data: { headline: "NeatTip", message: "Could not load NeatTip settings." },
      });
    } finally {
      this._loading = false;
    }
  }

  #onEnabledChange(event: Event): void {
    const target = event.target as HTMLInputElement & { checked: boolean };
    this._enabled = target.checked;
    this._saveState = "";

    if (!this._enabled) {
      this.#validationContext.messages.removeMessagesByTypeAndPath("client", "$.minLength");
    }
  }

  #onMinLengthChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const parsed = Number.parseInt(target.value, 10);

    if (Number.isNaN(parsed)) {
      return;
    }

    this._minLength = parsed;
    this._saveState = "";
  }

  #onFormSubmit(event: SubmitEvent): void {
    event.preventDefault();
    void this.#saveSettings();
  }

  async #saveSettings(): Promise<void> {
    if (this._saving) {
      return;
    }

    try {
      await this.#validationContext.validate();
    } catch {
      return;
    }

    this._saving = true;
    this._saveState = "waiting";

    const settings: NeatTipSettings = {
      enabled: this._enabled,
      minLength: this._minLength,
    };

    try {
      const saved = await saveNeatTipSettings(settings);
      this._enabled = saved.enabled;
      this._minLength = saved.minLength;
      this._saveState = "success";
      this.#notificationContext?.peek("positive", {
        data: { headline: "NeatTip", message: "Settings saved." },
      });
      dispatchNeatTipSettingsChanged();
    } catch {
      this._saveState = "failed";
      this.#notificationContext?.peek("danger", {
        data: { headline: "NeatTip", message: "Could not save NeatTip settings." },
      });
    } finally {
      this._saving = false;
    }
  }

  static override readonly styles = [
    UmbTextStyles,
    css`
      :host {
        display: block;
      }

      .settings-page {
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-layout-1);
        max-width: 800px;
        padding: var(--uui-size-layout-1);
      }

      .settings-form {
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-layout-1);
        margin: 0;
        padding: 0;
        border: 0;
      }

      .page-header h2 {
        margin: 0 0 var(--uui-size-space-2);
        font-size: var(--uui-type-h4-size);
        font-weight: 700;
      }

      .page-description {
        margin: 0;
        color: var(--uui-color-text-alt);
        max-width: 60ch;
      }

      .section-description {
        margin: 0 0 var(--uui-size-space-5);
        color: var(--uui-color-text-alt);
      }

      uui-box umb-property-layout:not(:last-child) {
        margin-bottom: var(--uui-size-space-5);
      }

      .setting-description {
        margin: var(--uui-size-space-1) 0 0;
        color: var(--uui-color-text-alt);
        font-size: var(--uui-type-small-size);
        line-height: 1.4;
        max-width: 40ch;
      }

      .save-actions {
        display: flex;
        justify-content: flex-start;
      }

      .info-item {
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-space-1);
      }

      .info-item:not(:last-child) {
        margin-bottom: var(--uui-size-space-6);
      }

      .info-item span {
        color: var(--uui-color-text-alt);
      }

      .diagnostic-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--uui-size-space-4);
        padding: var(--uui-size-space-3) 0;
      }

      .diagnostic-item:not(:last-child) {
        border-bottom: 1px solid var(--uui-color-border);
      }

      .diagnostic-label {
        font-weight: 600;
      }

      .diagnostic-status {
        display: inline-flex;
        align-items: center;
        gap: var(--uui-size-space-2);
      }

      .diagnostic-status--healthy {
        color: var(--uui-color-positive);
      }

      .diagnostic-status--warning {
        color: var(--uui-color-warning);
      }

      .diagnostic-status--inactive {
        color: var(--uui-color-text-alt);
      }

      .diagnostic-icon {
        font-size: 1rem;
      }

      .loading {
        display: flex;
        align-items: center;
        gap: var(--uui-size-space-3);
        color: var(--uui-color-text-alt);
      }
    `,
  ];
}

export default PhasesNeatTipSettingsWorkspaceViewElement;

declare global {
  interface HTMLElementTagNameMap {
    "phases-neattip-settings-workspace-view": PhasesNeatTipSettingsWorkspaceViewElement;
  }
}
