import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import type { UmbWorkspaceViewElement } from "@umbraco-cms/backoffice/workspace";
import {
  dispatchNeatTipSettingsChanged,
  type NeatTipSettings,
} from "../config/neattip-runtime.js";
import {
  loadNeatTipSettings,
  saveNeatTipSettings,
} from "../services/neattip-settings-api.service.js";

@customElement("phases-neattip-settings-workspace-view")
export class PhasesNeatTipSettingsWorkspaceViewElement
  extends UmbLitElement
  implements UmbWorkspaceViewElement
{
  @state()
  private _enabled = true;

  @state()
  private _minLength = 0;

  @state()
  private _loading = true;

  @state()
  private _saving = false;

  @state()
  private _error = "";

  @state()
  private _success = "";

  override connectedCallback(): void {
    super.connectedCallback();
    void this.#loadSettings();
  }

  override render() {
    if (this._loading) {
      return html`
        <uui-box>
          <p>Loading settings...</p>
        </uui-box>
      `;
    }

    return html`
      <uui-box headline="NeatTip">
        <p>
          Control when NeatTip replaces Umbraco property descriptions with an info icon and tooltip.
        </p>

        <uui-form-layout-item>
          <uui-label slot="label" for="neattip-enabled">Enable NeatTip</uui-label>
          <div slot="description">
            When disabled, Umbraco descriptions are shown as normal across the backoffice.
          </div>
          <uui-toggle
            id="neattip-enabled"
            .checked=${this._enabled}
            @change=${this.#onEnabledChange}></uui-toggle>
        </uui-form-layout-item>

        <uui-form-layout-item>
          <uui-label slot="label" for="neattip-min-length">Minimum description length</uui-label>
          <div slot="description">
            If a property description is shorter than this value, the native Umbraco description is shown.
            At or above this length, NeatTip shows the info icon instead.
          </div>
          <uui-input
            id="neattip-min-length"
            type="number"
            min="0"
            .value=${String(this._minLength)}
            ?disabled=${!this._enabled}
            @input=${this.#onMinLengthChange}></uui-input>
        </uui-form-layout-item>

        ${this._error
          ? html`<p style="color: var(--uui-color-danger, #d42054);">${this._error}</p>`
          : ""}
        ${this._success
          ? html`<p style="color: var(--uui-color-positive, #2bc37c);">${this._success}</p>`
          : ""}

        <div style="margin-top: 1rem;">
          <uui-button
            look="primary"
            label="Save"
            ?disabled=${this._saving}
            @click=${this.#saveSettings}>
            ${this._saving ? "Saving..." : "Save"}
          </uui-button>
        </div>
      </uui-box>
    `;
  }

  async #loadSettings(): Promise<void> {
    this._loading = true;
    this._error = "";

    try {
      const settings = await loadNeatTipSettings();
      this._enabled = settings.enabled;
      this._minLength = settings.minLength;
    } catch {
      this._error = "Could not load NeatTip settings.";
    } finally {
      this._loading = false;
    }
  }

  #onEnabledChange(event: Event): void {
    const target = event.target as HTMLInputElement & { checked: boolean };
    this._enabled = target.checked;
    this._success = "";
  }

  #onMinLengthChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const parsed = Number.parseInt(target.value, 10);
    this._minLength = Number.isNaN(parsed) ? 0 : Math.max(0, parsed);
    this._success = "";
  }

  async #saveSettings(): Promise<void> {
    this._saving = true;
    this._error = "";
    this._success = "";

    const settings: NeatTipSettings = {
      enabled: this._enabled,
      minLength: this._minLength,
    };

    try {
      const saved = await saveNeatTipSettings(settings);
      this._enabled = saved.enabled;
      this._minLength = saved.minLength;
      this._success = "Settings saved.";
      dispatchNeatTipSettingsChanged();
    } catch {
      this._error = "Could not save NeatTip settings.";
    } finally {
      this._saving = false;
    }
  }
}

export default PhasesNeatTipSettingsWorkspaceViewElement;

declare global {
  interface HTMLElementTagNameMap {
    "phases-neattip-settings-workspace-view": PhasesNeatTipSettingsWorkspaceViewElement;
  }
}
