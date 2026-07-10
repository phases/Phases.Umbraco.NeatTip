import { UmbLitElement as C } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as z } from "@umbraco-cms/backoffice/notification";
import { UmbTextStyles as k } from "@umbraco-cms/backoffice/style";
import { UmbValidationContext as E, umbBindToValidation as P } from "@umbraco-cms/backoffice/validation";
import { html as l, nothing as I, css as D, state as p, customElement as A } from "@umbraco-cms/backoffice/external/lit";
import { g as M, l as F, b as O, d as U } from "./neattip-diagnostics-B7gRF6kI.js";
import { c as b, d as V } from "./bundle.manifests-C3OabUEp.js";
var W = Object.defineProperty, G = Object.getOwnPropertyDescriptor, y = (t) => {
  throw TypeError(t);
}, r = (t, e, i, d) => {
  for (var o = d > 1 ? void 0 : d ? G(e, i) : e, v = t.length - 1, m; v >= 0; v--)
    (m = t[v]) && (o = (d ? m(e, i, o) : m(o)) || o);
  return d && o && W(e, i, o), o;
}, _ = (t, e, i) => e.has(t) || y("Cannot " + i), h = (t, e, i) => (_(t, e, "read from private field"), e.get(t)), f = (t, e, i) => e.has(t) ? y("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), R = (t, e, i, d) => (_(t, e, "write to private field"), e.set(t, i), i), s = (t, e, i) => (_(t, e, "access private method"), i), c, g, a, u, x, T, w, N, S, L, $;
let n = class extends C {
  constructor() {
    super(), f(this, a), f(this, c), f(this, g, new E(this)), this._enabled = !0, this._minLength = 0, this._loading = !0, this._saving = !1, this._saveState = "", this._settingsLoadFailed = !1, this.consumeContext(z, (t) => {
      R(this, c, t);
    });
  }
  connectedCallback() {
    super.connectedCallback(), s(this, a, w).call(this);
  }
  render() {
    return this._loading ? l`
        <div class="settings-page">
          <uui-box>
            <div class="loading">
              <uui-loader-circle></uui-loader-circle>
              <span>Loading settings…</span>
            </div>
          </uui-box>
        </div>
      ` : l`
      <div class="settings-page uui-text">
        <header class="page-header">
          <h2>${b}</h2>
          <p class="page-description">
            Replace verbose property descriptions with compact info icons and interactive helper tooltips across the
            backoffice.
          </p>
        </header>

        <form class="settings-form" @submit=${s(this, a, L)}>
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
                  @change=${s(this, a, N)}></uui-toggle>
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
                  ${P(this, "$.minLength", this._minLength)}
                  @input=${s(this, a, S)}></uui-input>
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
          ${s(this, a, u).call(this, "Package", b)}
          ${s(this, a, u).call(this, "Version", V)}
          ${s(this, a, u).call(this, "Localization", "Culture-aware helper text supported")}
          ${s(this, a, u).call(this, "Storage", "Managed internally by NeatTip")}
        </uui-box>

        <uui-box headline="Diagnostics">
          <p class="section-description">
            Read-only status of NeatTip services based on the current backoffice session.
          </p>
          ${M({ settingsLoadFailed: this._settingsLoadFailed }).map(
      (t) => s(this, a, x).call(this, t)
    )}
        </uui-box>
      </div>
    `;
  }
};
c = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakMap();
a = /* @__PURE__ */ new WeakSet();
u = function(t, e) {
  return l`
      <div class="info-item">
        <strong>${t}</strong>
        <span>${e}</span>
      </div>
    `;
};
x = function(t) {
  return l`
      <div class="diagnostic-item">
        <span class="diagnostic-label">${t.label}</span>
        <span class="diagnostic-status diagnostic-status--${t.health}">
          ${s(this, a, T).call(this, t.health)}
          <span>${t.message}</span>
        </span>
      </div>
    `;
};
T = function(t) {
  return t === "healthy" ? l`<uui-icon class="diagnostic-icon" name="icon-check"></uui-icon>` : t === "warning" ? l`<uui-icon class="diagnostic-icon" name="icon-alert"></uui-icon>` : I;
};
w = async function() {
  this._loading = !0, this._settingsLoadFailed = !1;
  try {
    const t = await F();
    this._enabled = t.enabled, this._minLength = t.minLength;
  } catch {
    this._settingsLoadFailed = !0, h(this, c)?.peek("danger", {
      data: { headline: "NeatTip", message: "Could not load NeatTip settings." }
    });
  } finally {
    this._loading = !1;
  }
};
N = function(t) {
  const e = t.target;
  this._enabled = e.checked, this._saveState = "", this._enabled || h(this, g).messages.removeMessagesByTypeAndPath("client", "$.minLength");
};
S = function(t) {
  const e = t.target, i = Number.parseInt(e.value, 10);
  Number.isNaN(i) || (this._minLength = i, this._saveState = "");
};
L = function(t) {
  t.preventDefault(), s(this, a, $).call(this);
};
$ = async function() {
  if (this._saving)
    return;
  try {
    await h(this, g).validate();
  } catch {
    return;
  }
  this._saving = !0, this._saveState = "waiting";
  const t = {
    enabled: this._enabled,
    minLength: this._minLength
  };
  try {
    const e = await O(t);
    this._enabled = e.enabled, this._minLength = e.minLength, this._saveState = "success", h(this, c)?.peek("positive", {
      data: { headline: "NeatTip", message: "Settings saved." }
    }), U();
  } catch {
    this._saveState = "failed", h(this, c)?.peek("danger", {
      data: { headline: "NeatTip", message: "Could not save NeatTip settings." }
    });
  } finally {
    this._saving = !1;
  }
};
n.styles = [
  k,
  D`
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
    `
];
r([
  p()
], n.prototype, "_enabled", 2);
r([
  p()
], n.prototype, "_minLength", 2);
r([
  p()
], n.prototype, "_loading", 2);
r([
  p()
], n.prototype, "_saving", 2);
r([
  p()
], n.prototype, "_saveState", 2);
r([
  p()
], n.prototype, "_settingsLoadFailed", 2);
n = r([
  A("phases-neattip-settings-workspace-view")
], n);
const Q = n;
export {
  n as PhasesNeatTipSettingsWorkspaceViewElement,
  Q as default
};
//# sourceMappingURL=neattip-settings.workspace-view.element-okr9CjHR.js.map
