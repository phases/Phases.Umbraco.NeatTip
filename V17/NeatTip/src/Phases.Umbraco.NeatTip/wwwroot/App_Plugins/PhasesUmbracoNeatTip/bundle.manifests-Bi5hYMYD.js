import { UmbControllerBase as _ } from "@umbraco-cms/backoffice/class-api";
import { UMB_CURRENT_USER_CONTEXT as C } from "@umbraco-cms/backoffice/current-user";
const P = [
  {
    name: "Phases Umbraco Neat Tip Entrypoint",
    alias: "Phases.Umbraco.NeatTip.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-DZkeWQ9y.js")
  }
], N = "phases-neattip-settings-changed", E = "phases-neattip-settings", y = "Phases.Workspace.NeatTipSettings", G = "/umbraco/management/api/v1/neattip/settings", J = "/umbraco/management/api/v1/neattip/settings/property-description", R = "Umb.Condition.WorkspaceAlias", I = [
  {
    type: "menuItem",
    alias: "Phases.MenuItem.NeatTipSettings",
    name: "NeatTip Settings Menu Item",
    weight: 150,
    meta: {
      label: "NeatTip",
      icon: "icon-info",
      entityType: E,
      menus: ["Umb.Menu.AdvancedSettings"]
    }
  },
  {
    type: "workspace",
    kind: "default",
    alias: y,
    name: "NeatTip Settings Workspace",
    meta: {
      entityType: E,
      headline: "NeatTip"
    }
  },
  {
    type: "workspaceView",
    alias: "Phases.WorkspaceView.NeatTipSettings",
    name: "NeatTip Settings Workspace View",
    element: () => import("./neattip-settings.workspace-view.element-BGVCw9KW.js"),
    weight: 100,
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings"
    },
    conditions: [
      {
        alias: R,
        match: y
      }
    ]
  }
], d = [
  "Umb.Section.Settings"
], p = {
  canCopy: !0,
  canEditHelperText: !1
}, D = /* @__PURE__ */ Symbol("neattip-current-user");
class Q extends _ {
  #e = { ...p };
  #n = [...d];
  #i = /* @__PURE__ */ new Set();
  #t;
  #s = !1;
  constructor(e) {
    super(e), this.consumeContext(C, (t) => {
      this.observe(
        t?.currentUser,
        (n) => {
          this.#t = n, this.#s = n !== void 0, this.#r();
        },
        D
      );
    });
  }
  /**
   * Replaces the section aliases that grant Edit helper text.
   * Empty/invalid values fall back to the package default.
   */
  setEditHelperTextAllowedSections(e) {
    const t = (e ?? []).map((n) => n?.trim()).filter((n) => !!n);
    this.#n = t.length > 0 ? t : [...d], this.#r();
  }
  getPermissions() {
    return { ...this.#e };
  }
  /**
   * Returns actions the current user may see in the More menu.
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
    return this.#i.add(e), e(this.getPermissions()), () => {
      this.#i.delete(e);
    };
  }
  destroy() {
    this.#i.clear(), this.#t = void 0, this.#s = !1, this.#e = { ...p }, super.destroy();
  }
  #r() {
    this.#c(this.#o());
  }
  #o() {
    return !this.#s || !this.#t ? { ...p } : {
      canCopy: !0,
      canEditHelperText: this.#a(this.#t)
    };
  }
  #a(e) {
    if (e.isAdmin === !0)
      return !0;
    const t = e.allowedSections ?? [];
    return Array.isArray(t) ? this.#n.some(
      (n) => t.includes(n)
    ) : !1;
  }
  #c(e) {
    const t = e.canCopy !== this.#e.canCopy || e.canEditHelperText !== this.#e.canEditHelperText;
    if (this.#e = e, !!t)
      for (const n of this.#i)
        n(this.getPermissions());
  }
}
const a = {
  enabled: !0,
  minLength: 0,
  settingsLoaded: !1,
  editHelperTextAllowedSections: [
    ...d
  ]
};
function Z(i) {
  a.enabled = i.enabled, a.minLength = Math.max(0, i.minLength), a.editHelperTextAllowedSections = O(i.editHelperTextAllowedSections), a.settingsLoaded = !0;
}
function O(i) {
  const e = (i ?? []).map((t) => t?.trim()).filter((t) => !!t);
  return e.length > 0 ? e : [...d];
}
function ee() {
  window.dispatchEvent(new CustomEvent(N));
}
const o = {
  processed: "neattip-processed",
  hidden: "neattip-hidden",
  keepVisible: "neattip-keep-visible",
  wrapper: "neattip-wrapper"
}, l = [
  "#description",
  '[slot="description"]',
  ".property-description",
  "umb-ufm-render"
].join(", "), u = [
  "#label",
  "uui-label",
  '[slot="label"]',
  "label",
  ".umb-property-editor__label",
  ".control-label"
].join(", "), q = [
  ".umb-block-list__content-title",
  ".umb-block-grid__content-title"
].join(", "), x = [
  "umb-document-workspace-editor",
  "umb-document-workspace-split-view",
  "umb-document-workspace-view-info",
  "umb-content-workspace-view-edit",
  "umb-content-workspace-view-edit-tab",
  "umb-content-workspace-property",
  "umb-workspace-split-view",
  "umb-routable-workspace",
  "umb-workspace-editor",
  "umb-property"
].join(", "), te = [
  "umb-property-type-workspace",
  "umb-document-type-workspace",
  "umb-data-type-workspace",
  "umb-member-type-workspace",
  "umb-media-type-workspace"
].join(", "), S = ".mini-rollback-icon";
function U(i = document.body) {
  const e = [], t = /* @__PURE__ */ new Set(), n = (s) => {
    s instanceof HTMLElement && (s.tagName === "UMB-PROPERTY-LAYOUT" && !t.has(s) && (t.add(s), e.push(s)), s.shadowRoot && n(s.shadowRoot)), s.childNodes.forEach(n);
  };
  return n(i), e;
}
function ie(i) {
  let e = i;
  for (; e; ) {
    if (e instanceof Element && e.matches(x))
      return !0;
    if (e.parentNode) {
      e = e.parentNode;
      continue;
    }
    const t = e.getRootNode();
    if (t instanceof ShadowRoot) {
      e = t.host;
      continue;
    }
    break;
  }
  return !1;
}
function c(i) {
  return i.shadowRoot ?? i;
}
class ne {
  placeIndicator(e, t) {
    const n = c(e);
    if (n.querySelector(".neattip-wrapper, neat-tip-indicator"))
      return !1;
    const s = document.createElement("span");
    return s.className = o.wrapper, s.appendChild(t), this.#r(n), this.#e(n, s) || this.#n(n, s) || this.#i(e, s) || this.#t(e, s) ? !0 : this.#s(n, s);
  }
  #e(e, t) {
    const n = e.querySelector(u);
    if (!n)
      return !1;
    const s = n.querySelector(S);
    return s?.parentElement ? (s.insertAdjacentElement("afterend", t), t.style.marginLeft = "6px", !0) : (n.insertAdjacentElement("afterend", t), t.style.marginLeft = "6px", !0);
  }
  #n(e, t) {
    const n = e.querySelector(
      ".umb-property-editor__label, .control-label, [slot='label'], #headerColumn"
    );
    if (!n)
      return !1;
    const s = n.querySelector(S);
    if (s?.parentElement)
      return s.insertAdjacentElement("afterend", t), t.style.marginLeft = "6px", !0;
    const r = n.querySelector(u);
    return r ? (r.insertAdjacentElement("afterend", t), t.style.marginLeft = "6px", !0) : (n.appendChild(t), !0);
  }
  #i(e, t) {
    let n = e;
    for (; n; ) {
      if (n instanceof ShadowRoot) {
        n = n.host;
        continue;
      }
      const s = n.closest("umb-block-list, umb-block-grid")?.querySelector(q);
      if (s)
        return s.appendChild(t), !0;
      const r = n.getRootNode();
      n = r instanceof ShadowRoot ? r.host : null;
    }
    return !1;
  }
  #t(e, t) {
    const s = c(e).querySelector("#headerColumn") ?? e;
    return getComputedStyle(s).position === "static" && (s.style.position = "relative"), t.style.position = "absolute", t.style.top = "0", t.style.right = "0", s.appendChild(t), !0;
  }
  #s(e, t) {
    const n = e.querySelector(l);
    return n ? (n.insertAdjacentElement("afterend", t), !0) : !1;
  }
  #r(e) {
    if (!(e instanceof ShadowRoot) || e.getElementById("neattip-layout-styles"))
      return;
    const t = document.createElement("style");
    t.id = "neattip-layout-styles", t.textContent = `
      .neattip-wrapper {
        display: inline-flex;
        align-items: center;
        margin-left: 6px;
        vertical-align: middle;
      }

      neat-tip-indicator {
        display: inline-flex;
      }
    `, e.appendChild(t);
  }
}
function f(i) {
  const e = i;
  if (e.description?.trim())
    return e.description.trim();
  const t = i.getAttribute("description");
  if (t?.trim())
    return t.trim();
  const n = c(i), s = n.querySelector("umb-ufm-render#description");
  if (s?.markdown?.trim())
    return s.markdown.trim();
  const r = s?.getAttribute("markdown");
  if (r?.trim())
    return r.trim();
  const b = n.querySelector(l);
  return b ? b.textContent?.trim() ?? "" : "";
}
function H(i) {
  const e = i.dataset.neattipStoredDescription;
  return e?.trim() ? e.trim() : f(i);
}
function M(i) {
  return H(i) || f(i);
}
function se(i) {
  c(i).querySelectorAll(l).forEach((t) => {
    t.classList.add(o.hidden), t.style.visibility = "visible", t.style.display = "none";
  });
}
function j(i) {
  const e = c(i);
  e.querySelector("#neattip-flash-style")?.remove(), e.querySelectorAll(l).forEach((t) => {
    t.classList.remove(o.hidden), t.classList.add(o.keepVisible), t.style.removeProperty("display"), t.style.removeProperty("visibility"), t.style.removeProperty("opacity"), t.style.removeProperty("height"), t.style.removeProperty("overflow");
  }), i.classList.add(o.keepVisible);
}
function re(i) {
  return i.label?.trim() || i.getAttribute("label")?.trim() ? !0 : !!c(i).querySelector(u);
}
function oe(i) {
  return i.classList.contains(o.processed);
}
function V(i) {
  i.classList.add(o.processed), c(i).querySelector("#neattip-flash-style")?.remove();
}
const T = "neattip-flash-style";
function v() {
  if (!a.enabled)
    return !1;
  const i = window.location.pathname;
  return i.includes("/section/settings") || i.includes("/section/member") || i.includes("/section/media") ? !1 : i.includes("/section/content");
}
function W(i) {
  const e = i.dataset.neattipStoredDescription?.trim() || f(i);
  if (!e)
    return !1;
  i.dataset.neattipStoredDescription = e;
  const t = i;
  return !t.description?.trim() && !i.getAttribute("description")?.trim() || (t.description = "", i.removeAttribute("description"), i.requestUpdate?.("description")), !0;
}
function B(i) {
  const e = i.dataset.neattipStoredDescription?.trim();
  if (!e)
    return !1;
  const t = i;
  return t.description = e, i.setAttribute("description", e), i.requestUpdate?.("description"), !0;
}
function F(i, e, t = 32) {
  const n = (s) => {
    const r = i.shadowRoot;
    if (r) {
      e(r);
      return;
    }
    s <= 0 || queueMicrotask(() => n(s - 1));
  };
  n(t);
}
function K(i) {
  F(i, (e) => {
    if (e.getElementById(T))
      return;
    const t = document.createElement("style");
    t.id = T, t.textContent = `
      #description,
      umb-ufm-render#description,
      [slot="description"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
      }
    `, e.prepend(t);
  });
}
function Y(i, e = !1) {
  if (!a.enabled || i.classList.contains(o.keepVisible) || i.classList.contains(o.processed) && c(i).querySelector("neat-tip-indicator, .neattip-wrapper"))
    return;
  i.classList.contains(o.processed) && i.classList.remove(o.processed, o.keepVisible);
  const t = M(i);
  if (!t)
    return;
  if (t.length < a.minLength) {
    B(i), j(i), V(i);
    return;
  }
  W(i), K(i), c(i).querySelectorAll(l).forEach((s) => {
    s.classList.contains(o.processed) || s.classList.contains(o.keepVisible) || (s.style.display = "none", s.style.visibility = "hidden", s.style.opacity = "0", s.style.height = "0", s.style.overflow = "hidden");
  });
}
class X {
  #e = /* @__PURE__ */ new Set();
  #n = [];
  #i;
  #t = !1;
  constructor(e) {
    this.#i = e;
  }
  start(e = document.documentElement) {
    this.#r(e), this.#o(e);
  }
  stop() {
    this.#n.forEach((e) => e.disconnect()), this.#n.length = 0, this.#e.clear();
  }
  refresh(e = document.documentElement) {
    this.#o(e);
  }
  #s() {
    this.#t || (this.#t = !0, queueMicrotask(() => {
      this.#t = !1, this.#i();
    }));
  }
  #r(e) {
    if (!("childNodes" in e) || this.#e.has(e))
      return;
    this.#e.add(e);
    const t = new MutationObserver((n) => {
      for (const s of n)
        s.addedNodes.forEach((r) => this.#o(r));
      this.#s();
    });
    t.observe(e, { childList: !0, subtree: !0 }), this.#n.push(t);
  }
  #o(e) {
    e instanceof HTMLElement && e.shadowRoot && (this.#r(e.shadowRoot), this.#o(e.shadowRoot)), "childNodes" in e && e.childNodes.forEach((t) => this.#o(t));
  }
}
let w = !1, L, m = "";
function k() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}
function h(i = !1) {
  !a.settingsLoaded || !a.enabled || v() && U().forEach((e) => Y(e, i));
}
function g() {
  const i = k();
  i !== m && (m = i, h(!0));
}
function A() {
  w || typeof document > "u" || (w = !0, m = k(), v() && h(!0), L = new X(() => {
    g(), h();
  }), L.start(document.documentElement), window.setInterval(g, 200));
}
typeof document < "u" && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", A, { once: !0 }) : A());
const ae = [
  ...P,
  ...I
];
export {
  l as D,
  te as E,
  T as F,
  ne as L,
  o as N,
  X as S,
  v as a,
  oe as b,
  U as c,
  B as d,
  V as e,
  re as f,
  se as g,
  Y as h,
  K as i,
  u as j,
  J as k,
  ie as l,
  j as m,
  a as n,
  Q as o,
  N as p,
  c as q,
  M as r,
  W as s,
  ee as t,
  Z as u,
  G as v,
  ae as w
};
//# sourceMappingURL=bundle.manifests-Bi5hYMYD.js.map
