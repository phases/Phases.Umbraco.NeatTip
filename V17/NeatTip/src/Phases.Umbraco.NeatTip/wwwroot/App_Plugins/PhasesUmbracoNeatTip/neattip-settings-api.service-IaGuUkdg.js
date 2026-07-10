import { umbHttpClient as a } from "@umbraco-cms/backoffice/http-client";
import { b as m, c } from "./bundle.manifests-_iprUSr9.js";
import { UmbControllerBase as E } from "@umbraco-cms/backoffice/class-api";
import { UMB_CURRENT_USER_CONTEXT as f } from "@umbraco-cms/backoffice/current-user";
const S = {
  minLength: 0,
  tooltipDelay: 200,
  tooltipHideDelay: 200,
  tooltipMinWidth: 200,
  tooltipMaxWidth: 320,
  indicatorChar: "i",
  fadeSpeed: 150,
  observerDebounceMs: 150,
  flashFallbackMs: 3e3,
  viewportMargin: 20
}, l = [
  "Umb.Section.Settings"
], r = {
  canCopy: !0,
  canEditHelperText: !1
}, g = /* @__PURE__ */ Symbol("neattip-current-user");
class w extends E {
  #e = { ...r };
  #s;
  #t = /* @__PURE__ */ new Set();
  #i = /* @__PURE__ */ new Set();
  #r;
  #o = !1;
  #n;
  constructor(e) {
    super(e), this.consumeContext(f, (i) => {
      this.observe(
        i?.currentUser,
        (s) => {
          const T = this.#n;
          this.#r = s, this.#o = s !== void 0, this.#n = s?.unique, T !== this.#n && this.#c(), this.#a();
        },
        g
      );
    });
  }
  /**
   * Applies the server-evaluated edit permission flag.
   * Undefined resets to the safe default (deny edit).
   */
  setServerCanEditHelperText(e) {
    this.#s = e, this.#a();
  }
  /**
   * Subscribe to current-user identity changes so server permission can be refreshed.
   */
  onUserChanged(e) {
    return this.#i.add(e), () => {
      this.#i.delete(e);
    };
  }
  getPermissions() {
    return { ...this.#e };
  }
  /**
   * Returns actions the current user may see in the tooltip.
   * Prefer this over disabling items — unauthorized actions are omitted.
   */
  getAllowedActions() {
    const e = [];
    return this.#e.canCopy && e.push("copy"), this.#e.canEditHelperText && e.push("edit"), e;
  }
  canPerform(e) {
    switch (e) {
      case "copy":
        return this.#e.canCopy;
      case "edit":
        return this.#e.canEditHelperText;
      default:
        return !1;
    }
  }
  subscribe(e) {
    return this.#t.add(e), e(this.getPermissions()), () => {
      this.#t.delete(e);
    };
  }
  destroy() {
    this.#t.clear(), this.#i.clear(), this.#r = void 0, this.#o = !1, this.#n = void 0, this.#s = void 0, this.#e = { ...r }, super.destroy();
  }
  #c() {
    for (const e of this.#i)
      e();
  }
  #a() {
    this.#d(this.#l());
  }
  #l() {
    return !this.#o || !this.#r ? { ...r } : {
      canCopy: !0,
      canEditHelperText: this.#s === !0
    };
  }
  #d(e) {
    const i = e.canCopy !== this.#e.canCopy || e.canEditHelperText !== this.#e.canEditHelperText;
    if (this.#e = e, !!i)
      for (const s of this.#t)
        s(this.getPermissions());
  }
}
const n = {
  enabled: !0,
  minLength: 0,
  settingsLoaded: !1,
  canEditHelperText: void 0,
  editHelperTextAllowedSections: [
    ...l
  ]
};
function d(t) {
  n.enabled = t.enabled, n.minLength = Math.max(0, t.minLength), n.canEditHelperText = t.canEditHelperText, n.editHelperTextAllowedSections = y(t.editHelperTextAllowedSections), n.settingsLoaded = !0;
}
function y(t) {
  const e = (t ?? []).map((i) => i?.trim()).filter((i) => !!i);
  return e.length > 0 ? e : [...l];
}
function N() {
  window.dispatchEvent(new CustomEvent(m));
}
const p = [{ scheme: "bearer", type: "http" }];
function h() {
  S.minLength = n.minLength;
}
function o(t) {
  const e = (t.editHelperTextAllowedSections ?? []).map((i) => i?.trim()).filter((i) => !!i);
  return {
    enabled: t.enabled,
    minLength: Math.max(0, t.minLength),
    canEditHelperText: t.canEditHelperText,
    editHelperTextAllowedSections: e.length > 0 ? e : [...n.editHelperTextAllowedSections]
  };
}
function u(t) {
  return t && typeof t == "object" && "data" in t ? t.data : t;
}
async function C() {
  const t = await a.get({
    url: c,
    security: p
  });
  return o(u(t));
}
async function x(t) {
  const e = await a.put({
    url: c,
    security: p,
    body: o(t),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  return o(u(e));
}
async function v() {
  const t = await C();
  return d(t), h(), t;
}
async function L(t) {
  const e = await x(t);
  return d(e), h(), e;
}
export {
  S as N,
  w as a,
  N as d,
  v as l,
  n,
  L as s
};
//# sourceMappingURL=neattip-settings-api.service-IaGuUkdg.js.map
