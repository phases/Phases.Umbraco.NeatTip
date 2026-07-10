import { umbHttpClient as d } from "@umbraco-cms/backoffice/http-client";
import { b as f, e as h } from "./bundle.manifests-CTV0Iwlo.js";
import { UmbControllerBase as S } from "@umbraco-cms/backoffice/class-api";
import { UMB_CURRENT_USER_CONTEXT as E } from "@umbraco-cms/backoffice/current-user";
const b = {
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
}, p = [
  "Umb.Section.Settings"
], r = {
  canCopy: !0,
  canEditHelperText: !1
}, y = /* @__PURE__ */ Symbol("neattip-current-user");
class N extends S {
  #e = { ...r };
  #a;
  #t = /* @__PURE__ */ new Set();
  #i = /* @__PURE__ */ new Set();
  #s;
  #o = !1;
  #n;
  constructor(e) {
    super(e), this.consumeContext(E, (i) => {
      this.observe(
        i?.currentUser,
        (a) => {
          const o = this.#n;
          this.#s = a, this.#o = a !== void 0, this.#n = a?.unique, o !== this.#n && this.#l(), this.#r();
        },
        y
      );
    });
  }
  /**
   * Applies the server-evaluated edit permission flag.
   * Undefined resets to the safe default (deny edit).
   */
  setServerCanEditHelperText(e) {
    this.#a = e, this.#r();
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
    this.#t.clear(), this.#i.clear(), this.#s = void 0, this.#o = !1, this.#n = void 0, this.#a = void 0, this.#e = { ...r }, super.destroy();
  }
  #l() {
    for (const e of this.#i)
      e();
  }
  #r() {
    this.#d(this.#c());
  }
  #c() {
    return !this.#o || !this.#s ? { ...r } : {
      canCopy: !0,
      canEditHelperText: this.#a === !0
    };
  }
  #d(e) {
    const i = e.canCopy !== this.#e.canCopy || e.canEditHelperText !== this.#e.canEditHelperText;
    if (this.#e = e, !!i)
      for (const a of this.#t)
        a(this.getPermissions());
  }
}
const n = {
  enabled: !0,
  minLength: 0,
  settingsLoaded: !1,
  canEditHelperText: void 0,
  editHelperTextAllowedSections: [
    ...p
  ]
};
function u(t) {
  n.enabled = t.enabled, n.minLength = Math.max(0, t.minLength), n.canEditHelperText = t.canEditHelperText, n.editHelperTextAllowedSections = v(t.editHelperTextAllowedSections), n.settingsLoaded = !0;
}
function v(t) {
  const e = (t ?? []).map((i) => i?.trim()).filter((i) => !!i);
  return e.length > 0 ? e : [...p];
}
function U() {
  window.dispatchEvent(new CustomEvent(f));
}
const T = [{ scheme: "bearer", type: "http" }];
function m() {
  b.minLength = n.minLength;
}
function l(t) {
  const e = (t.editHelperTextAllowedSections ?? []).map((i) => i?.trim()).filter((i) => !!i);
  return {
    enabled: t.enabled,
    minLength: Math.max(0, t.minLength),
    canEditHelperText: t.canEditHelperText,
    editHelperTextAllowedSections: e.length > 0 ? e : [...n.editHelperTextAllowedSections]
  };
}
function g(t) {
  return t && typeof t == "object" && "data" in t ? t.data : t;
}
async function A() {
  const t = await d.get({
    url: h,
    security: T
  });
  return l(g(t));
}
async function H(t) {
  const e = await d.put({
    url: h,
    security: T,
    body: l(t),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  return l(g(e));
}
async function _() {
  const t = await A();
  return u(t), m(), t;
}
async function P(t) {
  const e = await H(t);
  return u(e), m(), e;
}
let s = !1, c = !1;
function R() {
  s = !0;
}
function I(t) {
  c = t;
}
function D(t) {
  const e = n.settingsLoaded && !t?.settingsLoadFailed, i = e && n.canEditHelperText !== void 0, a = n.enabled ? c ? "healthy" : "warning" : "inactive", o = n.enabled ? c ? "Active" : "Unavailable" : "Disabled";
  return [
    {
      label: "Package",
      health: s ? "healthy" : "warning",
      message: s ? "Loaded" : "Not loaded"
    },
    {
      label: "Settings",
      health: e ? "healthy" : "warning",
      message: e ? "Loaded" : "Not loaded"
    },
    {
      label: "Tooltip Service",
      health: a,
      message: o
    },
    {
      label: "Localization",
      health: s ? "healthy" : "warning",
      message: s ? "Available" : "Unavailable"
    },
    {
      label: "Permission Service",
      health: i ? "healthy" : "warning",
      message: i ? "Ready" : "Unavailable"
    },
    {
      label: "Helper Text Storage",
      health: e ? "healthy" : "warning",
      message: e ? "Available" : "Unavailable"
    }
  ];
}
export {
  b as N,
  N as a,
  P as b,
  U as d,
  D as g,
  _ as l,
  R as m,
  n,
  I as s
};
//# sourceMappingURL=neattip-diagnostics-QgR-BwEz.js.map
