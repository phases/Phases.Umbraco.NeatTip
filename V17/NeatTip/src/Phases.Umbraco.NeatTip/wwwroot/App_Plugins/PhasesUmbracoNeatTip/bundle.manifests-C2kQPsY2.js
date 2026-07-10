import { UmbControllerBase as tt } from "@umbraco-cms/backoffice/class-api";
import { UMB_CURRENT_USER_CONTEXT as et } from "@umbraco-cms/backoffice/current-user";
import { umbHttpClient as it } from "@umbraco-cms/backoffice/http-client";
const rt = [
  {
    name: "Phases Umbraco Neat Tip Entrypoint",
    alias: "Phases.Umbraco.NeatTip.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-Djjrm3-3.js")
  }
], nt = "phases-neattip-settings-changed", _ = "phases-neattip-settings", R = "Phases.Workspace.NeatTipSettings", Ut = "/umbraco/management/api/v1/neattip/settings", qt = "/umbraco/management/api/v1/neattip/settings/property-description", st = "/umbraco/management/api/v1/neattip/settings/property-descriptions", ot = "Umb.Condition.WorkspaceAlias", at = [
  {
    type: "menuItem",
    alias: "Phases.MenuItem.NeatTipSettings",
    name: "NeatTip Settings Menu Item",
    weight: 150,
    meta: {
      label: "NeatTip",
      icon: "icon-info",
      entityType: _,
      menus: ["Umb.Menu.AdvancedSettings"]
    }
  },
  {
    type: "workspace",
    kind: "default",
    alias: R,
    name: "NeatTip Settings Workspace",
    meta: {
      entityType: _,
      headline: "NeatTip"
    }
  },
  {
    type: "workspaceView",
    alias: "Phases.WorkspaceView.NeatTipSettings",
    name: "NeatTip Settings Workspace View",
    element: () => import("./neattip-settings.workspace-view.element-8AAzHEB4.js"),
    weight: 100,
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings"
    },
    conditions: [
      {
        alias: ot,
        match: R
      }
    ]
  }
], A = [
  "Umb.Section.Settings"
], C = {
  canCopy: !0,
  canEditHelperText: !1
}, ct = /* @__PURE__ */ Symbol("neattip-current-user");
class $t extends tt {
  #t = { ...C };
  #r = [...A];
  #e = /* @__PURE__ */ new Set();
  #i;
  #s = !1;
  constructor(t) {
    super(t), this.consumeContext(et, (e) => {
      this.observe(
        e?.currentUser,
        (r) => {
          this.#i = r, this.#s = r !== void 0, this.#o();
        },
        ct
      );
    });
  }
  /**
   * Replaces the section aliases that grant Edit helper text.
   * Empty/invalid values fall back to the package default.
   */
  setEditHelperTextAllowedSections(t) {
    const e = (t ?? []).map((r) => r?.trim()).filter((r) => !!r);
    this.#r = e.length > 0 ? e : [...A], this.#o();
  }
  getPermissions() {
    return { ...this.#t };
  }
  /**
   * Returns actions the current user may see in the tooltip.
   * Prefer this over disabling items — unauthorized actions are omitted.
   */
  getAllowedActions() {
    const t = [];
    return this.#t.canCopy && t.push("copy"), this.#t.canEditHelperText && t.push("edit"), t;
  }
  canPerform(t) {
    switch (t) {
      case "copy":
        return this.#t.canCopy;
      case "edit":
        return this.#t.canEditHelperText;
      default:
        return !1;
    }
  }
  subscribe(t) {
    return this.#e.add(t), t(this.getPermissions()), () => {
      this.#e.delete(t);
    };
  }
  destroy() {
    this.#e.clear(), this.#i = void 0, this.#s = !1, this.#t = { ...C }, super.destroy();
  }
  #o() {
    this.#c(this.#n());
  }
  #n() {
    return !this.#s || !this.#i ? { ...C } : {
      canCopy: !0,
      canEditHelperText: this.#a(this.#i)
    };
  }
  #a(t) {
    if (t.isAdmin === !0)
      return !0;
    const e = t.allowedSections ?? [];
    return Array.isArray(e) ? this.#r.some(
      (r) => e.includes(r)
    ) : !1;
  }
  #c(t) {
    const e = t.canCopy !== this.#t.canCopy || t.canEditHelperText !== this.#t.canEditHelperText;
    if (this.#t = t, !!e)
      for (const r of this.#e)
        r(this.getPermissions());
  }
}
const h = {
  enabled: !0,
  minLength: 0,
  settingsLoaded: !1,
  editHelperTextAllowedSections: [
    ...A
  ]
};
function Ft(i) {
  h.enabled = i.enabled, h.minLength = Math.max(0, i.minLength), h.editHelperTextAllowedSections = pt(i.editHelperTextAllowedSections), h.settingsLoaded = !0;
}
function pt(i) {
  const t = (i ?? []).map((e) => e?.trim()).filter((e) => !!e);
  return t.length > 0 ? t : [...A];
}
function Ht() {
  window.dispatchEvent(new CustomEvent(nt));
}
const u = {
  processed: "neattip-processed",
  hidden: "neattip-hidden",
  keepVisible: "neattip-keep-visible",
  wrapper: "neattip-wrapper"
}, w = [
  "#description",
  '[slot="description"]',
  ".property-description",
  "umb-ufm-render"
].join(", "), g = [
  "#label",
  "uui-label",
  '[slot="label"]',
  "label",
  ".umb-property-editor__label",
  ".control-label"
].join(", "), lt = [
  ".umb-block-list__content-title",
  ".umb-block-grid__content-title"
].join(", "), ut = [
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
].join(", "), Vt = [
  "umb-property-type-workspace",
  "umb-document-type-workspace",
  "umb-data-type-workspace",
  "umb-member-type-workspace",
  "umb-media-type-workspace"
].join(", "), O = ".mini-rollback-icon", H = "neattip://cultures/";
function V(i) {
  return !!i?.startsWith(H);
}
function W(i) {
  if (!V(i))
    return {};
  try {
    const t = i.slice(H.length), e = JSON.parse(t);
    return !e || typeof e != "object" ? {} : Object.fromEntries(
      Object.entries(e).filter(([, r]) => r?.trim())
    );
  } catch {
    return {};
  }
}
function dt(i, t) {
  const e = i?.trim() ?? "";
  if (!e)
    return "";
  const r = W(e);
  if (Object.keys(r).length === 0)
    return e;
  const s = t?.activeCulture;
  if (s !== void 0) {
    const c = I(r, s);
    if (c)
      return c;
  }
  const o = t?.fallbackCulture;
  if (o !== void 0 && y(o) !== y(s)) {
    const c = I(r, o);
    if (c)
      return c;
  }
  return Object.values(r).find((c) => c?.trim())?.trim() ?? "";
}
function I(i, t) {
  const e = y(t), r = i[e]?.trim();
  return r || (e === y(null) ? "" : Object.entries(i).find(
    ([s]) => s.toLowerCase() === e.toLowerCase()
  )?.[1]?.trim() ?? "");
}
function ft(i, t) {
  const e = W(t);
  if (Object.keys(e).length === 0)
    return;
  const r = i.dataset.neattipCultureDescriptions;
  let n = e;
  if (r)
    try {
      const s = JSON.parse(r);
      n = { ...e, ...s };
    } catch {
      n = e;
    }
  i.dataset.neattipCultureDescriptions = JSON.stringify(n);
}
const E = "neattipCultureDescriptions", L = "neattipOriginalDescription", z = "__invariant__";
function y(i) {
  const t = i?.trim();
  return t || z;
}
function v(i) {
  const t = i.dataset[E];
  if (!t)
    return {};
  try {
    const e = JSON.parse(t);
    return typeof e == "object" && e ? e : {};
  } catch {
    return {};
  }
}
function G(i, t) {
  const e = Object.entries(t).filter(([, r]) => r.trim());
  if (e.length === 0) {
    delete i.dataset[E];
    return;
  }
  i.dataset[E] = JSON.stringify(Object.fromEntries(e));
}
function k(i, t) {
  const e = v(i), r = y(t), n = e[r]?.trim();
  return n || (r === z ? void 0 : Object.entries(e).find(
    ([o]) => o.toLowerCase() === r.toLowerCase()
  )?.[1]?.trim() || void 0);
}
function mt(i, t, e) {
  const r = y(t), n = v(i), s = e.trim();
  s ? n[r] = s : delete n[r], G(i, n);
}
function K(i) {
  if (i.dataset[L]?.trim() || Object.keys(v(i)).length > 0)
    return;
  const e = i.description?.trim() || i.getAttribute("description")?.trim() || i.dataset.neattipStoredDescription?.trim();
  e && (i.dataset[L] = e, ft(i, e));
}
function ht(i) {
  return i.dataset[L]?.trim() ?? "";
}
const yt = /\/document\/edit\/([^/?#]+)/i, bt = /\/document\/edit\/[^/?#]+\/([a-z]{2}(?:-[a-z]{2})?)\b/i;
function N(i = `${window.location.pathname}${window.location.search}${window.location.hash}`) {
  return i.match(yt)?.[1]?.trim() || void 0;
}
function Wt(i = `${window.location.pathname}${window.location.search}${window.location.hash}`) {
  return i.match(bt)?.[1]?.trim() || void 0;
}
function Tt(i = document.body) {
  const t = [], e = /* @__PURE__ */ new Set(), r = (n) => {
    n instanceof HTMLElement && (n.tagName === "UMB-PROPERTY-LAYOUT" && !e.has(n) && (e.add(n), t.push(n)), n.shadowRoot && r(n.shadowRoot)), n.childNodes.forEach(r);
  };
  return r(i), t;
}
function zt(i) {
  let t = i;
  for (; t; ) {
    if (t instanceof Element && t.matches(ut))
      return !0;
    if (t.parentNode) {
      t = t.parentNode;
      continue;
    }
    const e = t.getRootNode();
    if (e instanceof ShadowRoot) {
      t = e.host;
      continue;
    }
    break;
  }
  return !1;
}
function d(i) {
  return i.shadowRoot ?? i;
}
const M = "neattip.description.overrides.v1";
class gt {
  resolveUpdateTarget(t) {
    const e = N();
    if (!e)
      return;
    const r = this.resolvePropertyIdentity(t);
    if (!(!r?.propertyAlias && !r?.propertyKey && !r?.propertyLabel))
      return {
        documentKey: e,
        contentTypeKey: r.contentTypeKey,
        propertyAlias: r.propertyAlias,
        propertyKey: r.propertyKey,
        propertyLabel: r.propertyLabel
      };
  }
  resolvePropertyIdentity(t) {
    const e = S(
      t,
      "umb-property, umb-content-workspace-property"
    ), r = this.#i(t), n = this.#s(t), s = this.#e(t, e), o = this.#n(t, e), a = this.#a(t), c = this.#o(t);
    if (!(!s && !o && !a))
      return {
        contentTypeKey: r,
        blockContentTypeName: n,
        propertyAlias: s,
        propertyKey: o,
        propertyLabel: a,
        isElementPropertyContext: c
      };
  }
  get(t) {
    const e = this.#t(t);
    if (!e)
      return;
    const n = this.#c()[e]?.trim();
    return n || void 0;
  }
  set(t, e) {
    const r = this.#t(t);
    if (!r)
      return !1;
    const n = e.trim();
    if (!n)
      return !1;
    const s = this.#c();
    return s[r] = n, this.#p(s), !0;
  }
  #t(t) {
    const e = N(), r = this.#r(t);
    if (!(!e || !r))
      return `${e}::${r}`;
  }
  #r(t) {
    const e = S(t, "umb-property, umb-content-workspace-property"), r = this.#e(t, e);
    if (r)
      return r.toLowerCase();
    const n = this.#n(t, e);
    if (n)
      return `key:${n.toLowerCase()}`;
    const o = d(t).querySelector(g)?.textContent?.trim();
    return o ? `label:${o.toLowerCase()}` : void 0;
  }
  #e(t, e) {
    const r = B(t, "alias");
    if (r)
      return r;
    const n = wt(e, "alias");
    if (n)
      return n;
    const s = t.getAttribute("property-alias") || t.getAttribute("data-property-alias") || t.getAttribute("data-alias") || t.getAttribute("propertyAlias") || t.getAttribute("name");
    if (s?.trim())
      return s.trim();
    const o = e?.getAttribute("alias") || e?.getAttribute("property-alias") || e?.getAttribute("data-property-alias") || e?.getAttribute("data-alias") || e?.getAttribute("propertyAlias") || e?.getAttribute("name");
    if (o?.trim())
      return o.trim();
    const c = d(t).querySelector(
      "[property-alias], [data-property-alias], [data-alias], [propertyAlias]"
    );
    return (c?.getAttribute("property-alias") || c?.getAttribute("data-property-alias") || c?.getAttribute("data-alias") || c?.getAttribute("propertyAlias"))?.trim() || void 0;
  }
  #i(t) {
    let e = t;
    for (; e; ) {
      if (e instanceof Element) {
        const n = e.getAttribute("data-content-element-type-key") || (e instanceof HTMLElement ? e.dataset.contentElementTypeKey : void 0);
        if (n?.trim() && x(n.trim()))
          return n.trim();
      }
      if (e instanceof Element && e.assignedSlot) {
        e = e.assignedSlot;
        continue;
      }
      if (e.parentNode) {
        e = e.parentNode;
        continue;
      }
      const r = e.getRootNode();
      e = r instanceof ShadowRoot ? r.host : null;
    }
  }
  #s(t) {
    const e = S(
      t,
      "umb-block-workspace-editor, umb-block-workspace-view-edit"
    );
    return e && e.querySelector("#headline")?.textContent?.trim() || void 0;
  }
  #o(t) {
    return !!S(
      t,
      "umb-block-workspace-editor, umb-block-workspace-view-edit, umb-block-workspace-view-edit-property"
    );
  }
  #n(t, e) {
    const r = [
      e?.getAttribute("key"),
      e?.getAttribute("data-key"),
      e?.getAttribute("property-key"),
      t.getAttribute("key"),
      t.getAttribute("data-key"),
      t.getAttribute("property-key")
    ];
    for (const n of r) {
      const s = n?.trim();
      if (s && x(s))
        return s;
    }
  }
  #a(t) {
    const r = d(t).querySelector(g)?.textContent?.trim();
    return r || B(t, "label");
  }
  #c() {
    try {
      const t = localStorage.getItem(M);
      if (!t)
        return {};
      const e = JSON.parse(t);
      return typeof e == "object" && e ? e : {};
    } catch {
      return {};
    }
  }
  #p(t) {
    try {
      localStorage.setItem(M, JSON.stringify(t));
    } catch {
    }
  }
}
function S(i, t) {
  let e = i;
  for (; e; ) {
    if (e instanceof Element && e.matches(t))
      return e;
    if (e.parentNode) {
      e = e.parentNode;
      continue;
    }
    const r = e.getRootNode();
    e = r instanceof ShadowRoot ? r.host : null;
  }
  return null;
}
function x(i) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(i);
}
function B(i, t) {
  const r = i[t]?.trim();
  return r || i.getAttribute(t)?.trim() || void 0;
}
function wt(i, t) {
  if (!i)
    return;
  const e = i, r = typeof e[t] == "string" ? e[t].trim() : "";
  return r || i.getAttribute(t)?.trim() || void 0;
}
const vt = new gt(), St = [{ scheme: "bearer", type: "http" }];
async function At(i) {
  const e = (await it.get({
    url: st,
    security: St,
    query: {
      documentKey: i
    },
    headers: {
      Accept: "application/json"
    }
  })).data;
  return {
    contentTypeAlias: e?.contentTypeAlias ?? "",
    contentTypeKey: Ct(e?.contentTypeKey),
    defaultCulture: e?.defaultCulture,
    properties: e?.properties ?? []
  };
}
function Ct(i) {
  return typeof i == "string" ? i.trim() : i != null ? String(i).trim() : "";
}
const Y = "neattipPropertyDescriptionFallback";
class Et {
  #t;
  #r;
  #e;
  #i;
  getDefaultCulture() {
    return this.#i;
  }
  resolveContentTypeKeyByName(t) {
    if (!(!this.#t || !t?.trim()))
      return this.#t.contentTypeKeyByName.get(t.trim().toLowerCase());
  }
  async ensureLoaded(t = N()) {
    t && (this.#r === t && this.#t || this.#e && (await this.#e, this.#r === t && this.#t) || (this.#e = this.#s(t).finally(() => {
      this.#e = void 0;
    }), await this.#e));
  }
  invalidate() {
    this.#t = void 0, this.#r = void 0, this.#e = void 0, this.#i = void 0;
  }
  applyToLayout(t) {
    const e = this.#o(t);
    if (!e)
      return;
    Object.keys(e.cultureMap).length > 0 && G(t, e.cultureMap);
    const r = e.propertyDescription?.trim();
    if (r) {
      t.dataset[Y] = r;
      const n = t.dataset.neattipOriginalDescription?.trim(), s = Object.keys(e.cultureMap).length > 0;
      (!n || !V(n)) && !s && (t.dataset.neattipOriginalDescription = r);
    }
  }
  updateFromSave(t, e, r, n = "", s) {
    if (!this.#t)
      return;
    const o = this.#n(
      t,
      e,
      void 0,
      s
    ), a = {
      contentTypeKey: s ?? o?.contentTypeKey ?? "",
      contentTypeName: o?.contentTypeName ?? "",
      propertyAlias: t ?? o?.propertyAlias ?? "",
      propertyName: o?.propertyName ?? "",
      propertyKey: e ?? o?.propertyKey ?? "",
      propertyDescription: n || o?.propertyDescription || "",
      cultureMap: { ...o?.cultureMap ?? {}, ...r }
    };
    this.#c(a);
  }
  async #s(t) {
    const e = await At(t), r = b(e.contentTypeKey).toLowerCase(), n = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
    for (const l of e.properties) {
      const m = Lt(l), T = !!r && m.contentTypeKey.toLowerCase() === r;
      this.#p(
        m,
        a,
        c,
        f,
        p,
        n,
        T ? s : void 0,
        T ? o : void 0
      );
    }
    this.#t = {
      documentContentTypeKey: r,
      contentTypeKeyByName: n,
      documentPropertiesByAlias: s,
      documentPropertiesByLabel: o,
      propertiesByAlias: a,
      propertiesByKey: c,
      propertiesByLabel: f,
      propertiesByContentTypeAndAlias: p
    }, this.#r = t, this.#i = e.defaultCulture?.trim() || void 0;
  }
  #o(t) {
    if (!this.#t)
      return;
    const e = vt.resolvePropertyIdentity(t), r = e?.contentTypeKey || this.resolveContentTypeKeyByName(e?.blockContentTypeName);
    return this.#n(
      e?.propertyAlias,
      e?.propertyKey,
      e?.propertyLabel,
      r,
      e?.isElementPropertyContext === !0
    );
  }
  #n(t, e, r, n, s = !1) {
    if (!this.#t)
      return;
    const o = b(e).toLowerCase();
    if (o) {
      const p = this.#t.propertiesByKey.get(o);
      if (p)
        return p;
    }
    const a = b(n).toLowerCase(), c = t?.trim().toLowerCase(), f = r?.trim().toLowerCase();
    if (a && c) {
      const p = this.#t.propertiesByContentTypeAndAlias.get(
        `${a}:${c}`
      );
      if (p)
        return p;
    }
    if (!a && c && !s) {
      const p = this.#t.documentPropertiesByAlias.get(c);
      if (p)
        return p;
    }
    if (!a && f && !s) {
      const p = this.#t.documentPropertiesByLabel.get(f);
      if (p)
        return p;
    }
    if (c) {
      const p = this.#t.propertiesByAlias.get(c), l = this.#a(
        p,
        r,
        a || void 0
      );
      if (l)
        return l;
    }
    if (f) {
      const p = this.#t.propertiesByLabel.get(f);
      return this.#a(
        p,
        r,
        a || void 0
      );
    }
  }
  #a(t, e, r) {
    if (!t?.length)
      return;
    if (r) {
      const a = t.filter(
        (c) => c.contentTypeKey.toLowerCase() === r
      );
      if (a.length === 1)
        return a[0];
    }
    if (t.length === 1)
      return t[0];
    const n = e?.trim();
    if (!n)
      return;
    const s = t.filter(
      (a) => a.contentTypeName?.toLowerCase() === n.toLowerCase()
    );
    if (s.length === 1)
      return s[0];
    const o = t.filter(
      (a) => a.propertyName?.toLowerCase() === n.toLowerCase()
    );
    if (o.length === 1)
      return o[0];
  }
  #c(t) {
    if (!this.#t)
      return;
    const e = !!this.#t.documentContentTypeKey && t.contentTypeKey.toLowerCase() === this.#t.documentContentTypeKey;
    this.#p(
      t,
      this.#t.propertiesByAlias,
      this.#t.propertiesByKey,
      this.#t.propertiesByLabel,
      this.#t.propertiesByContentTypeAndAlias,
      this.#t.contentTypeKeyByName,
      e ? this.#t.documentPropertiesByAlias : void 0,
      e ? this.#t.documentPropertiesByLabel : void 0
    );
  }
  #p(t, e, r, n, s, o, a, c) {
    if (t.propertyAlias) {
      const l = t.propertyAlias.toLowerCase(), m = e.get(l) ?? [];
      m.some((T) => T.propertyKey === t.propertyKey) || (m.push(t), e.set(l, m)), a?.set(l, t);
    }
    const f = b(t.propertyKey).toLowerCase();
    if (f && r.set(f, t), t.propertyName) {
      const l = t.propertyName.toLowerCase(), m = n.get(l) ?? [];
      m.some((T) => T.propertyKey === t.propertyKey) || (m.push(t), n.set(l, m)), c?.set(l, t);
    }
    const p = b(t.contentTypeKey).toLowerCase();
    if (p && t.propertyAlias) {
      const l = `${p}:${t.propertyAlias.toLowerCase()}`;
      s.set(l, t);
    }
    t.contentTypeName && p && o.set(t.contentTypeName.toLowerCase(), p);
  }
}
function Lt(i) {
  return {
    contentTypeKey: b(i.contentTypeKey),
    contentTypeName: i.contentTypeName?.trim() ?? "",
    propertyAlias: i.propertyAlias?.trim() ?? "",
    propertyName: i.propertyName?.trim() ?? "",
    propertyKey: b(i.propertyKey),
    propertyDescription: i.propertyDescription?.trim() ?? "",
    cultureMap: i.cultureMap ?? {}
  };
}
function b(i) {
  return typeof i == "string" ? i.trim() : i != null ? String(i).trim() : "";
}
const kt = new Et();
function Nt(i) {
  return i.dataset[Y]?.trim() || void 0;
}
class Gt {
  placeIndicator(t, e) {
    const r = d(t);
    if (r.querySelector(".neattip-wrapper, neat-tip-indicator"))
      return !1;
    const n = document.createElement("span");
    return n.className = u.wrapper, n.appendChild(e), this.#o(r), this.#t(r, n) || this.#r(r, n) || this.#e(t, n) || this.#i(t, n) ? !0 : this.#s(r, n);
  }
  #t(t, e) {
    const r = t.querySelector(g);
    if (!r)
      return !1;
    const n = r.querySelector(O);
    return n?.parentElement ? (n.insertAdjacentElement("afterend", e), e.style.marginLeft = "8px", !0) : (r.insertAdjacentElement("afterend", e), e.style.marginLeft = "8px", !0);
  }
  #r(t, e) {
    const r = t.querySelector(
      ".umb-property-editor__label, .control-label, [slot='label'], #headerColumn"
    );
    if (!r)
      return !1;
    const n = r.querySelector(O);
    if (n?.parentElement)
      return n.insertAdjacentElement("afterend", e), e.style.marginLeft = "8px", !0;
    const s = r.querySelector(g);
    return s ? (s.insertAdjacentElement("afterend", e), e.style.marginLeft = "8px", !0) : (r.appendChild(e), !0);
  }
  #e(t, e) {
    let r = t;
    for (; r; ) {
      if (r instanceof ShadowRoot) {
        r = r.host;
        continue;
      }
      const n = r.closest("umb-block-list, umb-block-grid")?.querySelector(lt);
      if (n)
        return n.appendChild(e), !0;
      const s = r.getRootNode();
      r = s instanceof ShadowRoot ? s.host : null;
    }
    return !1;
  }
  #i(t, e) {
    const n = d(t).querySelector("#headerColumn") ?? t;
    return getComputedStyle(n).position === "static" && (n.style.position = "relative"), e.style.position = "absolute", e.style.top = "0", e.style.right = "0", n.appendChild(e), !0;
  }
  #s(t, e) {
    const r = t.querySelector(w);
    return r ? (r.insertAdjacentElement("afterend", e), !0) : !1;
  }
  #o(t) {
    if (!(t instanceof ShadowRoot) || t.getElementById("neattip-layout-styles"))
      return;
    const e = document.createElement("style");
    e.id = "neattip-layout-styles", e.textContent = `
      .neattip-wrapper {
        display: inline-flex;
        align-items: center;
        margin-left: 8px;
        vertical-align: middle;
        line-height: 1;
      }

      neat-tip-indicator {
        display: inline-flex;
      }
    `, t.appendChild(e);
  }
}
function J(i) {
  const t = i;
  if (t.description?.trim())
    return t.description.trim();
  const e = i.getAttribute("description");
  if (e?.trim())
    return e.trim();
  const r = d(i), n = r.querySelector("umb-ufm-render#description");
  if (n?.markdown?.trim())
    return n.markdown.trim();
  const s = n?.getAttribute("markdown");
  if (s?.trim())
    return s.trim();
  const o = r.querySelector(w);
  return o ? o.textContent?.trim() ?? "" : "";
}
function X(i, t) {
  const e = t?.activeCulture, r = t?.fallbackCulture ?? kt.getDefaultCulture();
  if (e !== void 0) {
    const a = k(i, e);
    if (a)
      return a;
  }
  if (r !== void 0 && y(r) !== y(e)) {
    const a = k(i, r);
    if (a)
      return a;
  }
  const n = ht(i);
  if (n) {
    const a = dt(n, t);
    if (a)
      return a;
  }
  const s = Nt(i);
  if (s)
    return s;
  if (!(Object.keys(v(i)).length > 0)) {
    const a = i.dataset.neattipStoredDescription?.trim();
    if (a)
      return a;
  }
  return J(i);
}
function Yt(i, t) {
  const e = v(i), r = Object.keys(e).length > 0, n = X(i, t).trim();
  if (t?.activeCulture !== void 0) {
    const s = k(i, t.activeCulture);
    if (s)
      return i.dataset.neattipStoredDescription = s, s;
    !r && n && mt(i, t.activeCulture, n);
  }
  return n ? i.dataset.neattipStoredDescription = n : delete i.dataset.neattipStoredDescription, n;
}
function Jt(i) {
  d(i).querySelectorAll(w).forEach((e) => {
    e.classList.add(u.hidden), e.style.visibility = "visible", e.style.display = "none";
  });
}
function Pt(i) {
  const t = d(i);
  t.querySelector("#neattip-flash-style")?.remove(), t.querySelectorAll(w).forEach((e) => {
    e.classList.remove(u.hidden), e.classList.add(u.keepVisible), e.style.removeProperty("display"), e.style.removeProperty("visibility"), e.style.removeProperty("opacity"), e.style.removeProperty("height"), e.style.removeProperty("overflow");
  }), i.classList.add(u.keepVisible);
}
function Xt(i) {
  return i.label?.trim() || i.getAttribute("label")?.trim() ? !0 : !!d(i).querySelector(g);
}
function Qt(i) {
  return i.classList.contains(u.processed);
}
function Dt(i) {
  i.classList.add(u.processed), d(i).querySelector("#neattip-flash-style")?.remove();
}
const j = "neattip-flash-style";
function Q() {
  if (!h.enabled)
    return !1;
  const i = window.location.pathname;
  return i.includes("/section/settings") || i.includes("/section/member") || i.includes("/section/media") ? !1 : i.includes("/section/content");
}
function _t(i) {
  K(i);
  const t = i.dataset.neattipStoredDescription?.trim() || J(i);
  if (!t)
    return !1;
  K(i), i.dataset.neattipStoredDescription = t;
  const e = i;
  return !e.description?.trim() && !i.getAttribute("description")?.trim() || (e.description = "", i.removeAttribute("description"), i.requestUpdate?.("description")), !0;
}
function Rt(i) {
  const t = i.dataset.neattipStoredDescription?.trim();
  if (!t)
    return !1;
  const e = i;
  return e.description = t, i.setAttribute("description", t), i.requestUpdate?.("description"), !0;
}
function Ot(i, t, e = 32) {
  const r = (n) => {
    const s = i.shadowRoot;
    if (s) {
      t(s);
      return;
    }
    n <= 0 || queueMicrotask(() => r(n - 1));
  };
  r(e);
}
function It(i) {
  Ot(i, (t) => {
    if (t.getElementById(j))
      return;
    const e = document.createElement("style");
    e.id = j, e.textContent = `
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
    `, t.prepend(e);
  });
}
function Kt(i, t = !1) {
  if (!h.enabled || i.classList.contains(u.keepVisible) || i.classList.contains(u.processed) && d(i).querySelector("neat-tip-indicator, .neattip-wrapper"))
    return;
  i.classList.contains(u.processed) && i.classList.remove(u.processed, u.keepVisible);
  const e = X(i);
  if (!e)
    return;
  if (e.length < h.minLength) {
    Rt(i), Pt(i), Dt(i);
    return;
  }
  _t(i), It(i), d(i).querySelectorAll(w).forEach((n) => {
    n.classList.contains(u.processed) || n.classList.contains(u.keepVisible) || (n.style.display = "none", n.style.visibility = "hidden", n.style.opacity = "0", n.style.height = "0", n.style.overflow = "hidden");
  });
}
class Mt {
  #t = /* @__PURE__ */ new Set();
  #r = [];
  #e;
  #i = !1;
  constructor(t) {
    this.#e = t;
  }
  start(t = document.documentElement) {
    this.#o(t), this.#n(t);
  }
  stop() {
    this.#r.forEach((t) => t.disconnect()), this.#r.length = 0, this.#t.clear();
  }
  refresh(t = document.documentElement) {
    this.#n(t);
  }
  #s() {
    this.#i || (this.#i = !0, queueMicrotask(() => {
      this.#i = !1, this.#e();
    }));
  }
  #o(t) {
    if (!("childNodes" in t) || this.#t.has(t))
      return;
    this.#t.add(t);
    const e = new MutationObserver((r) => {
      for (const n of r)
        n.addedNodes.forEach((s) => this.#n(s));
      this.#s();
    });
    e.observe(t, { childList: !0, subtree: !0 }), this.#r.push(e);
  }
  #n(t) {
    t instanceof HTMLElement && t.shadowRoot && (this.#o(t.shadowRoot), this.#n(t.shadowRoot)), "childNodes" in t && t.childNodes.forEach((e) => this.#n(e));
  }
}
let U = !1, q, P = "";
function Z() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}
function D(i = !1) {
  !h.settingsLoaded || !h.enabled || Q() && Tt().forEach((t) => Kt(t, i));
}
function $() {
  const i = Z();
  i !== P && (P = i, D(!0));
}
function F() {
  U || typeof document > "u" || (U = !0, P = Z(), Q() && D(!0), q = new Mt(() => {
    $(), D();
  }), q.start(document.documentElement), window.setInterval($, 200));
}
typeof document < "u" && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", F, { once: !0 }) : F());
const Zt = [
  ...rt,
  ...at
];
export {
  Wt as A,
  zt as B,
  $t as C,
  w as D,
  Vt as E,
  j as F,
  nt as G,
  Ht as H,
  Ft as I,
  Ut as J,
  Zt as K,
  Gt as L,
  u as N,
  Mt as S,
  Q as a,
  Qt as b,
  Tt as c,
  y as d,
  kt as e,
  K as f,
  Yt as g,
  Kt as h,
  It as i,
  Rt as j,
  Dt as k,
  Xt as l,
  Pt as m,
  h as n,
  Jt as o,
  N as p,
  d as q,
  X as r,
  _t as s,
  J as t,
  v as u,
  mt as v,
  qt as w,
  vt as x,
  ft as y,
  W as z
};
//# sourceMappingURL=bundle.manifests-C2kQPsY2.js.map
