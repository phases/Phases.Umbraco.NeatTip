import { UmbLitElement as b } from "@umbraco-cms/backoffice/lit-element";
import { html as h, state as r, customElement as f } from "@umbraco-cms/backoffice/external/lit";
import { H as y } from "./bundle.manifests-C2kQPsY2.js";
import { l as w, s as N } from "./neattip-settings-api.service-BV0Kt6oB.js";
var S = Object.defineProperty, L = Object.getOwnPropertyDescriptor, d = (t) => {
  throw TypeError(t);
}, a = (t, e, i, l) => {
  for (var n = l > 1 ? void 0 : l ? L(e, i) : e, u = t.length - 1, p; u >= 0; u--)
    (p = t[u]) && (n = (l ? p(e, i, n) : p(n)) || n);
  return l && n && S(e, i, n), n;
}, T = (t, e, i) => e.has(t) || d("Cannot " + i), C = (t, e, i) => e.has(t) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), c = (t, e, i) => (T(t, e, "access private method"), i), o, _, g, m, v;
let s = class extends b {
  constructor() {
    super(...arguments), C(this, o), this._enabled = !0, this._minLength = 0, this._loading = !0, this._saving = !1, this._error = "", this._success = "";
  }
  connectedCallback() {
    super.connectedCallback(), c(this, o, _).call(this);
  }
  render() {
    return this._loading ? h`
        <uui-box>
          <p>Loading settings...</p>
        </uui-box>
      ` : h`
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
            @change=${c(this, o, g)}></uui-toggle>
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
            @input=${c(this, o, m)}></uui-input>
        </uui-form-layout-item>

        ${this._error ? h`<p style="color: var(--uui-color-danger, #d42054);">${this._error}</p>` : ""}
        ${this._success ? h`<p style="color: var(--uui-color-positive, #2bc37c);">${this._success}</p>` : ""}

        <div style="margin-top: 1rem;">
          <uui-button
            look="primary"
            label="Save"
            ?disabled=${this._saving}
            @click=${c(this, o, v)}>
            ${this._saving ? "Saving..." : "Save"}
          </uui-button>
        </div>
      </uui-box>
    `;
  }
};
o = /* @__PURE__ */ new WeakSet();
_ = async function() {
  this._loading = !0, this._error = "";
  try {
    const t = await w();
    this._enabled = t.enabled, this._minLength = t.minLength;
  } catch {
    this._error = "Could not load NeatTip settings.";
  } finally {
    this._loading = !1;
  }
};
g = function(t) {
  const e = t.target;
  this._enabled = e.checked, this._success = "";
};
m = function(t) {
  const e = t.target, i = Number.parseInt(e.value, 10);
  this._minLength = Number.isNaN(i) ? 0 : Math.max(0, i), this._success = "";
};
v = async function() {
  this._saving = !0, this._error = "", this._success = "";
  const t = {
    enabled: this._enabled,
    minLength: this._minLength
  };
  try {
    const e = await N(t);
    this._enabled = e.enabled, this._minLength = e.minLength, this._success = "Settings saved.", y();
  } catch {
    this._error = "Could not save NeatTip settings.";
  } finally {
    this._saving = !1;
  }
};
a([
  r()
], s.prototype, "_enabled", 2);
a([
  r()
], s.prototype, "_minLength", 2);
a([
  r()
], s.prototype, "_loading", 2);
a([
  r()
], s.prototype, "_saving", 2);
a([
  r()
], s.prototype, "_error", 2);
a([
  r()
], s.prototype, "_success", 2);
s = a([
  f("phases-neattip-settings-workspace-view")
], s);
const P = s;
export {
  s as PhasesNeatTipSettingsWorkspaceViewElement,
  P as default
};
//# sourceMappingURL=neattip-settings.workspace-view.element-8AAzHEB4.js.map
