import { N as y, l as Qt } from "./neattip-settings-api.service-BV0Kt6oB.js";
import { N as m, c as b, q as E, F as Ct, D as ot, i as dt, s as kt, r as Pt, n as h, h as ht, a as ut, S as Nt, L as te, b as W, d as M, e as O, f as Dt, g as _, j as D, m as B, k, l as ee, o as ie, p as se, t as oe, u as ne, v as Mt, w as re, x as ae, y as ce, z as le, A as pe, B as de, E as he, C as ue, G as Ht } from "./bundle.manifests-C2kQPsY2.js";
import { umbHttpClient as fe } from "@umbraco-cms/backoffice/http-client";
import { UmbControllerBase as me } from "@umbraco-cms/backoffice/class-api";
import { UMB_VARIANT_CONTEXT as ve } from "@umbraco-cms/backoffice/variant";
const z = globalThis, nt = z.ShadowRoot && (z.ShadyCSS === void 0 || z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, rt = /* @__PURE__ */ Symbol(), ft = /* @__PURE__ */ new WeakMap();
let Rt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== rt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (nt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ft.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ft.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ye = (o) => new Rt(typeof o == "string" ? o : o + "", void 0, rt), ge = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, s, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[n + 1], o[0]);
  return new Rt(e, o, rt);
}, be = (o, t) => {
  if (nt) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = z.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, o.appendChild(i);
  }
}, mt = nt ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return ye(e);
})(o) : o;
const { is: we, defineProperty: Ee, getOwnPropertyDescriptor: Ae, getOwnPropertyNames: Se, getOwnPropertySymbols: $e, getPrototypeOf: xe } = Object, Y = globalThis, vt = Y.trustedTypes, Le = vt ? vt.emptyScript : "", _e = Y.reactiveElementPolyfillSupport, H = (o, t) => o, tt = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? Le : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, Ot = (o, t) => !we(o, t), yt = { attribute: !0, type: String, converter: tt, reflect: !1, useDefault: !1, hasChanged: Ot };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Y.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let L = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = yt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Ee(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: n } = Ae(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const c = s?.call(this);
      n?.call(this, r), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? yt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(H("elementProperties"))) return;
    const t = xe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(H("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(H("properties"))) {
      const e = this.properties, i = [...Se(e), ...$e(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(mt(s));
    } else t !== void 0 && e.push(mt(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return be(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : tt).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const n = i.getPropertyOptions(s), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : tt;
      this._$Em = s;
      const c = r.fromAttribute(e, n.type);
      this[s] = c ?? this._$Ej?.get(s) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, n) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (n = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? Ot)(n, e) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: n }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, n] of i) {
        const { wrapped: r } = n, c = this[s];
        r !== !0 || this._$AL.has(s) || c === void 0 || this.C(s, void 0, n, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[H("elementProperties")] = /* @__PURE__ */ new Map(), L[H("finalized")] = /* @__PURE__ */ new Map(), _e?.({ ReactiveElement: L }), (Y.reactiveElementVersions ??= []).push("2.1.2");
const at = globalThis, gt = (o) => o, V = at.trustedTypes, bt = V ? V.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, It = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, qt = "?" + w, Te = `<${qt}>`, $ = document, I = () => $.createComment(""), q = (o) => o === null || typeof o != "object" && typeof o != "function", ct = Array.isArray, Ce = (o) => ct(o) || typeof o?.[Symbol.iterator] == "function", G = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, wt = /-->/g, Et = />/g, A = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), At = /'/g, St = /"/g, Ut = /^(?:script|style|textarea|title)$/i, ke = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), Pe = ke(1), T = /* @__PURE__ */ Symbol.for("lit-noChange"), u = /* @__PURE__ */ Symbol.for("lit-nothing"), $t = /* @__PURE__ */ new WeakMap(), S = $.createTreeWalker($, 129);
function Ft(o, t) {
  if (!ct(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return bt !== void 0 ? bt.createHTML(t) : t;
}
const Ne = (o, t) => {
  const e = o.length - 1, i = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = P;
  for (let c = 0; c < e; c++) {
    const a = o[c];
    let l, d, p = -1, f = 0;
    for (; f < a.length && (r.lastIndex = f, d = r.exec(a), d !== null); ) f = r.lastIndex, r === P ? d[1] === "!--" ? r = wt : d[1] !== void 0 ? r = Et : d[2] !== void 0 ? (Ut.test(d[2]) && (s = RegExp("</" + d[2], "g")), r = A) : d[3] !== void 0 && (r = A) : r === A ? d[0] === ">" ? (r = s ?? P, p = -1) : d[1] === void 0 ? p = -2 : (p = r.lastIndex - d[2].length, l = d[1], r = d[3] === void 0 ? A : d[3] === '"' ? St : At) : r === St || r === At ? r = A : r === wt || r === Et ? r = P : (r = A, s = void 0);
    const v = r === A && o[c + 1].startsWith("/>") ? " " : "";
    n += r === P ? a + Te : p >= 0 ? (i.push(l), a.slice(0, p) + It + a.slice(p) + w + v) : a + w + (p === -2 ? c : v);
  }
  return [Ft(o, n + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class U {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let n = 0, r = 0;
    const c = t.length - 1, a = this.parts, [l, d] = Ne(t, e);
    if (this.el = U.createElement(l, i), S.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (s = S.nextNode()) !== null && a.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const p of s.getAttributeNames()) if (p.endsWith(It)) {
          const f = d[r++], v = s.getAttribute(p).split(w), x = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: n, name: x[2], strings: v, ctor: x[1] === "." ? Me : x[1] === "?" ? He : x[1] === "@" ? Re : X }), s.removeAttribute(p);
        } else p.startsWith(w) && (a.push({ type: 6, index: n }), s.removeAttribute(p));
        if (Ut.test(s.tagName)) {
          const p = s.textContent.split(w), f = p.length - 1;
          if (f > 0) {
            s.textContent = V ? V.emptyScript : "";
            for (let v = 0; v < f; v++) s.append(p[v], I()), S.nextNode(), a.push({ type: 2, index: ++n });
            s.append(p[f], I());
          }
        }
      } else if (s.nodeType === 8) if (s.data === qt) a.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = s.data.indexOf(w, p + 1)) !== -1; ) a.push({ type: 7, index: n }), p += w.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = $.createElement("template");
    return i.innerHTML = t, i;
  }
}
function C(o, t, e = o, i) {
  if (t === T) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const n = q(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== n && (s?._$AO?.(!1), n === void 0 ? s = void 0 : (s = new n(o), s._$AT(o, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = C(o, s._$AS(o, t.values), s, i)), t;
}
class De {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? $).importNode(e, !0);
    S.currentNode = s;
    let n = S.nextNode(), r = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let l;
        a.type === 2 ? l = new F(n, n.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (l = new Oe(n, this, t)), this._$AV.push(l), a = i[++c];
      }
      r !== a?.index && (n = S.nextNode(), r++);
    }
    return S.currentNode = $, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class F {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = C(this, t, e), q(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== T && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ce(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && q(this._$AH) ? this._$AA.nextSibling.data = t : this.T($.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = U.createElement(Ft(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const n = new De(s, this), r = n.u(this.options);
      n.p(e), this.T(r), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = $t.get(t.strings);
    return e === void 0 && $t.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    ct(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const n of t) s === e.length ? e.push(i = new F(this.O(I()), this.O(I()), this, this.options)) : i = e[s], i._$AI(n), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = gt(t).nextSibling;
      gt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class X {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, s) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = C(this, t, e, 0), r = !q(t) || t !== this._$AH && t !== T, r && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = n[0], a = 0; a < n.length - 1; a++) l = C(this, c[i + a], e, a), l === T && (l = this._$AH[a]), r ||= !q(l) || l !== this._$AH[a], l === u ? t = u : t !== u && (t += (l ?? "") + n[a + 1]), this._$AH[a] = l;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Me extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class He extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Re extends X {
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? u) === T) return;
    const i = this._$AH, s = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Oe {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const Ie = at.litHtmlPolyfillSupport;
Ie?.(U, F), (at.litHtmlVersions ??= []).push("3.3.3");
const qe = (o, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const n = e?.renderBefore ?? null;
    i._$litPart$ = s = new F(t.insertBefore(I(), n), n, void 0, e ?? {});
  }
  return s._$AI(o), s;
};
const lt = globalThis;
class R extends L {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = qe(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return T;
  }
}
R._$litElement$ = !0, R.finalized = !0, lt.litElementHydrateSupport?.({ LitElement: R });
const Ue = lt.litElementPolyfillSupport;
Ue?.({ LitElement: R });
(lt.litElementVersions ??= []).push("4.2.2");
const Fe = (o) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(o, t);
  }) : customElements.define(o, t);
};
var Be = Object.getOwnPropertyDescriptor, ze = (o, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Be(t, e) : t, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(s) || s);
  return s;
};
let et = class extends R {
  render() {
    return Pe`
      <uui-icon name="icon-info"></uui-icon>
      <slot></slot>
    `;
  }
};
et.styles = ge`
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
        color ${y.fadeSpeed}ms ease,
        opacity ${y.fadeSpeed}ms ease,
        transform ${y.fadeSpeed}ms ease;
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
et = ze([
  Fe("neat-tip-indicator")
], et);
function We(o) {
  const t = E(o);
  return !!(o.querySelector("neat-tip-indicator, .neattip-wrapper") || t.querySelector("neat-tip-indicator, .neattip-wrapper"));
}
function K(o) {
  const t = E(o), e = o.dataset.neattipStoredDescription, i = /* @__PURE__ */ new Set();
  if (o.querySelectorAll(".neattip-wrapper, neat-tip-indicator").forEach((s) => {
    i.add(s);
  }), t.querySelectorAll(".neattip-wrapper, neat-tip-indicator").forEach((s) => {
    i.add(s);
  }), i.forEach((s) => {
    s.remove();
  }), o.classList.remove(
    m.processed,
    m.keepVisible
  ), delete o.dataset.neattipResolvedCulture, t.querySelector(`#${Ct}`)?.remove(), t.querySelectorAll(ot).forEach((s) => {
    s.classList.remove(m.hidden, m.keepVisible), s.style.removeProperty("display"), s.style.removeProperty("visibility"), s.style.removeProperty("opacity"), s.style.removeProperty("height"), s.style.removeProperty("overflow");
  }), e?.trim()) {
    o.dataset.neattipStoredDescription = e.trim(), dt(o);
    return;
  }
  kt(o), dt(o);
}
function Ve(o = b()) {
  o.filter((t) => t.classList.contains(m.processed)).forEach((t) => K(t));
}
function Ke(o = b()) {
  o.filter((t) => Bt(t)).forEach((t) => K(t));
}
function Bt(o) {
  if (!o.classList.contains(m.processed))
    return !1;
  const t = We(o);
  if (o.classList.contains(m.keepVisible))
    return !t && !Pt(o);
  if (!t)
    return !0;
  const s = E(o).querySelector(ot);
  return !s || s.classList.contains(m.hidden) ? !1 : (s.textContent?.trim().length ?? 0) > 0;
}
class je {
  constructor(t) {
    this.workspace = t;
  }
  #t;
  #i;
  #e;
  setLayoutDetectedHandler(t) {
    this.#e = t;
  }
  start() {
    !h.settingsLoaded || !h.enabled || this.workspace.isContentEditingContext() && (this.#n(), this.#o(), this.#i?.refresh(), this.#c());
  }
  stop() {
    clearTimeout(this.#t), this.#i?.stop(), this.#i = void 0;
  }
  cancelFallback() {
    clearTimeout(this.#t), this.#t = void 0;
  }
  hideLayoutDescriptions(t, e = !1) {
    ht(t, e);
  }
  scanAllLayouts() {
    !h.settingsLoaded || !ut() || b().forEach((t) => this.#r(t, !0));
  }
  #n() {
    b().forEach((t) => this.#r(t, !0));
  }
  #o() {
    this.#i || (this.#i = new Nt(() => {
      !h.settingsLoaded || !ut() || b().forEach((t) => this.#r(t));
    }), this.#i.start(document.documentElement));
  }
  #r(t, e = !1) {
    ht(t, e), this.#e?.(t);
  }
  #c() {
    clearTimeout(this.#t), this.#t = setTimeout(() => {
      this.workspace.isDocumentContentEdit() || b().forEach((t) => {
        t.classList.contains(m.processed) || (E(t).querySelectorAll("[id='description'], umb-ufm-render, [slot='description']").forEach((e) => {
          e.style.display = "", e.style.visibility = "visible", e.style.opacity = "", e.style.height = "", e.style.overflow = "", e.classList.add(m.keepVisible);
        }), t.classList.add(m.keepVisible), E(t).querySelector(`#${Ct}`)?.remove());
      });
    }, y.flashFallbackMs);
  }
}
const zt = /* @__PURE__ */ new WeakMap();
function Ye(o, t) {
  zt.set(o, t);
}
function N(o) {
  return zt.get(o);
}
function Z(o, t) {
  const i = E(o).querySelector("umb-ufm-render#description");
  let s = "";
  if (i?.shadowRoot) {
    const n = i.shadowRoot.innerHTML.trim(), r = i.shadowRoot.textContent?.trim();
    n && r && (s = n);
  }
  return s || (s = Wt(t)), Kt(s);
}
function xt(o) {
  return Kt(Wt(o));
}
function Wt(o) {
  const t = o.trim();
  if (!t)
    return "";
  const e = t.split(/\n{2,}/);
  return e.length === 1 ? `<p>${Lt(e[0]).replace(/\n/g, "<br>")}</p>` : e.map((i) => `<p>${Lt(i).replace(/\n/g, "<br>")}</p>`).join("");
}
function Lt(o) {
  return o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const J = /(https?:\/\/[^\s<]+|www\.[^\s<]+|mailto:[^\s<]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, Xe = /* @__PURE__ */ new Set(["script", "style", "iframe", "object", "embed", "link", "meta"]), Vt = /^(?:javascript|data|vbscript):/i;
function Kt(o) {
  const t = document.createElement("template");
  t.innerHTML = o, Ge(t.content), Ze(t.content);
  const e = document.createElement("div");
  return e.appendChild(t.content.cloneNode(!0)), e.innerHTML;
}
function Ge(o) {
  for (const t of Array.from(o.childNodes))
    jt(t);
}
function jt(o) {
  if (!(o instanceof Element))
    return;
  const t = o.tagName.toLowerCase();
  if (Xe.has(t)) {
    o.remove();
    return;
  }
  for (const e of Array.from(o.attributes)) {
    const i = e.name.toLowerCase();
    if (i.startsWith("on")) {
      o.removeAttribute(e.name);
      continue;
    }
    if (i === "href" || i === "src") {
      const s = e.value.trim();
      Vt.test(s) && o.removeAttribute(e.name);
    }
  }
  t === "a" && (o.classList.add("neattip-link"), Yt(o));
  for (const e of Array.from(o.childNodes))
    jt(e);
}
function Ze(o) {
  const t = document.createTreeWalker(o, NodeFilter.SHOW_TEXT), e = [];
  for (; t.nextNode(); ) {
    const i = t.currentNode;
    !(i instanceof Text) || ti(i) || e.push(i);
  }
  for (const i of e) {
    const s = Je(i.data);
    s && i.replaceWith(s);
  }
}
function Je(o) {
  J.lastIndex = 0;
  let t = J.exec(o);
  if (!t)
    return null;
  const e = document.createDocumentFragment();
  let i = 0;
  for (; t; ) {
    const s = t.index, n = t[0], { token: r, trailing: c } = ii(n);
    s > i && e.append(document.createTextNode(o.slice(i, s)));
    const a = Qe(r);
    a ? e.append(a) : e.append(document.createTextNode(r)), c && e.append(document.createTextNode(c)), i = s + n.length, t = J.exec(o);
  }
  return i < o.length && e.append(document.createTextNode(o.slice(i))), e;
}
function Qe(o) {
  const t = ei(o);
  if (!t)
    return null;
  const e = document.createElement("a");
  return e.className = "neattip-link", e.href = t, e.textContent = o, Yt(e), e;
}
function ti(o) {
  let t = o.parentNode;
  for (; t; ) {
    if (t instanceof HTMLAnchorElement)
      return !0;
    t = t.parentNode;
  }
  return !1;
}
function ei(o) {
  const t = o.trim();
  if (!t)
    return null;
  const e = t.startsWith("www.") ? `https://${t}` : t.includes("@") && !t.startsWith("mailto:") ? `mailto:${t}` : t;
  try {
    const s = new URL(e).protocol.toLowerCase();
    return s !== "http:" && s !== "https:" && s !== "mailto:" ? null : e;
  } catch {
    return null;
  }
}
function ii(o) {
  let t = o.length;
  for (; t > 0 && /[),.;!?]/.test(o[t - 1] ?? ""); )
    t -= 1;
  return {
    token: o.slice(0, t),
    trailing: o.slice(t)
  };
}
function Yt(o) {
  const t = o.getAttribute("href") ?? "";
  if (!t || Vt.test(t.trim())) {
    o.removeAttribute("href");
    return;
  }
  o.setAttribute("target", "_blank"), o.setAttribute("rel", "noopener noreferrer");
}
class si {
  constructor(t, e, i) {
    this.workspace = t, this.tooltipManager = e, this.cultureService = i;
  }
  #t = new te();
  process(t) {
    if (!(!h.settingsLoaded || !h.enabled) && this.workspace.shouldProcessElement(t)) {
      if (W(t)) {
        const e = this.cultureService.getResolutionContext(), i = M(e.activeCulture), s = t.dataset.neattipResolvedCulture?.trim();
        if (s && i && s !== i)
          K(t);
        else if (Bt(t))
          K(t);
        else
          return;
      }
      try {
        O.applyToLayout(t), Dt(t);
        const e = this.cultureService.getResolutionContext(), i = _(t, e);
        if (i && i.length < h.minLength) {
          D(t), B(t), k(t);
          return;
        }
        if (i ? t.dataset.neattipStoredDescription = i : delete t.dataset.neattipStoredDescription, !ee(t)) {
          D(t), B(t), k(t);
          return;
        }
        this.#i(t), ie(t);
        const n = this.#e(i);
        if (!this.#t.placeIndicator(t, n)) {
          D(t), B(t), k(t);
          return;
        }
        Ye(n, t), this.#n(n, t), t.dataset.neattipResolvedCulture = M(e.activeCulture), k(t);
      } catch {
        D(t), B(t), k(t);
      }
    }
  }
  #i(t) {
    (t.shadowRoot ?? t).querySelectorAll("label, uui-label, #label").forEach((i) => {
      const s = i.getAttribute("title");
      s && (i.dataset.originalTitle = s, i.removeAttribute("title"));
    });
  }
  #e(t) {
    const e = document.createElement("neat-tip-indicator");
    return e.classList.add("neattip-indicator"), e.setAttribute("role", "button"), e.setAttribute("tabindex", "0"), e.setAttribute(
      "aria-label",
      t ? "View property description" : "Add property description"
    ), e.dataset.neattipMarkdown = t, e.textContent = y.indicatorChar, e;
  }
  refreshLayoutDescription(t) {
    if (!W(t))
      return "";
    O.applyToLayout(t);
    const e = this.cultureService.getResolutionContext(), i = _(t, e), s = E(t).querySelector("neat-tip-indicator");
    return s && (s.dataset.neattipMarkdown = i, s.setAttribute(
      "aria-label",
      i ? "View property description" : "Add property description"
    )), t.dataset.neattipResolvedCulture = M(e.activeCulture), this.tooltipManager.refreshIfActiveLayout(t), i;
  }
  #n(t, e) {
    let i = !1;
    const s = (a) => {
      if (!(a instanceof Node))
        return !1;
      if (a === t || t.contains(a))
        return !0;
      const l = a.getRootNode();
      return l instanceof ShadowRoot && l.host === t;
    }, n = () => {
      const a = this.cultureService.getResolutionContext(), l = _(e, a).trim();
      return l ? t.dataset.neattipMarkdown = l : delete t.dataset.neattipMarkdown, l;
    };
    t.addEventListener("click", (a) => {
      a.preventDefault(), a.stopPropagation(), this.tooltipManager.toggle(t, n());
    });
    const r = () => {
      i || (i = !0, !this.tooltipManager.isEditing() && (this.tooltipManager.isToggled() && !this.tooltipManager.isActiveIndicator(t) || (this.tooltipManager.cancelScheduledHide(), this.tooltipManager.show(t, n(), !1))));
    }, c = (a) => {
      s(a.relatedTarget) || (i = !1, this.tooltipManager.scheduleHide(a));
    };
    t.addEventListener("pointerenter", r), t.addEventListener("pointerleave", c), t.addEventListener("keydown", (a) => {
      a.key !== "Enter" && a.key !== " " || (a.preventDefault(), this.tooltipManager.toggle(t, n()));
    });
  }
}
class oi {
  constructor(t, e, i) {
    this.workspace = t, this.processor = e, this.cultureService = i;
  }
  #t;
  #i;
  #e;
  #n = /* @__PURE__ */ new WeakMap();
  #o = /* @__PURE__ */ new Set();
  start() {
    this.#c(), this.#t = new Nt(() => this.#r()), this.#t.start(document.documentElement);
  }
  scanNow() {
    this.#t?.refresh(), this.#c();
  }
  processLayout(t) {
    this.#s(t), this.processor.process(t);
  }
  stop() {
    clearTimeout(this.#i), this.#e && cancelAnimationFrame(this.#e), this.#o.forEach((t) => t.disconnect()), this.#o.clear(), this.#n = /* @__PURE__ */ new WeakMap(), this.#t?.stop(), this.#t = void 0;
  }
  #r() {
    clearTimeout(this.#i), this.#e && cancelAnimationFrame(this.#e), this.#e = requestAnimationFrame(() => {
      this.#c();
    }), this.#i = setTimeout(
      () => {
        this.#c();
      },
      y.observerDebounceMs
    );
  }
  async #c() {
    if (!h.settingsLoaded || !h.enabled || !this.workspace.isDocumentContentEdit())
      return;
    const t = se();
    if (t)
      try {
        await O.ensureLoaded(t);
      } catch {
      }
    b().forEach((e) => {
      this.#s(e), this.processor.process(e);
    });
  }
  #s(t) {
    if (this.#n.has(t))
      return;
    const e = new MutationObserver(() => {
      if (!W(t)) {
        this.processor.process(t);
        return;
      }
      this.#p(t);
    });
    e.observe(t, {
      attributes: !0,
      attributeFilter: ["description", "label"]
    }), this.#n.set(t, e), this.#o.add(e);
  }
  refreshAllLayoutDescriptions() {
    !h.enabled || !this.workspace.isDocumentContentEdit() || b().filter((t) => W(t)).forEach((t) => this.processor.refreshLayoutDescription(t));
  }
  #p(t) {
    const e = oe(t).trim();
    if (!e)
      return;
    if (Object.keys(ne(t)).length > 0) {
      this.processor.refreshLayoutDescription(t);
      return;
    }
    Dt(t);
    const i = this.cultureService.getResolutionContext();
    Mt(t, i.activeCulture, e), this.processor.refreshLayoutDescription(t), (t.description?.trim() || t.getAttribute("description")?.trim()) && kt(t);
  }
}
const ni = [0, 50, 150, 400, 800, 1500];
class ri {
  #t = /* @__PURE__ */ new Set();
  #i;
  #e = "";
  start() {
    this.#e = this.#n(), this.#i = window.setInterval(() => {
      const t = this.#n();
      t !== this.#e && (this.#e = t, this.#o());
    }, 200);
  }
  stop() {
    this.#i && (clearInterval(this.#i), this.#i = void 0);
  }
  subscribe(t) {
    return this.#t.add(t), () => {
      this.#t.delete(t);
    };
  }
  notifyNow() {
    this.#o();
  }
  #n() {
    return `${window.location.pathname}${window.location.search}${window.location.hash}`;
  }
  #o() {
    for (const t of this.#t)
      t();
    for (const t of ni)
      window.setTimeout(() => {
        for (const e of this.#t)
          e();
      }, t);
  }
}
const ai = [{ scheme: "bearer", type: "http" }];
async function ci(o, t) {
  const e = {
    documentKey: o.documentKey,
    description: t.trim()
  };
  o.propertyAlias?.trim() && (e.propertyAlias = o.propertyAlias.trim()), o.contentTypeKey?.trim() && (e.contentTypeKey = o.contentTypeKey.trim()), o.propertyKey?.trim() && (e.propertyKey = o.propertyKey.trim()), o.propertyLabel?.trim() && (e.propertyLabel = o.propertyLabel.trim());
  const i = o.culture?.trim();
  i && (e.culture = i);
  const n = (await fe.put({
    url: re,
    security: ai,
    body: e,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })).data;
  return {
    description: n?.description ?? t.trim(),
    cultureDescription: n?.cultureDescription,
    propertyDescription: n?.propertyDescription,
    contentTypeKey: n?.contentTypeKey ? String(n.contentTypeKey).trim() : void 0,
    propertyAlias: n?.propertyAlias?.trim(),
    propertyKey: n?.propertyKey ? String(n.propertyKey).trim() : void 0
  };
}
class Xt {
  position(t, e, i = {}) {
    const s = i.viewportMargin ?? y.viewportMargin, n = this.#t(i.host);
    this.applyHostPositionMode(t, i.host), this.#i(t, e, s, n);
  }
  applyHostPositionMode(t, e) {
    t.style.position = this.#t(e).mode;
  }
  readTooltipPosition(t, e) {
    if (this.#t(e).mode === "absolute")
      return {
        top: t.offsetTop,
        left: t.offsetLeft
      };
    const s = t.getBoundingClientRect();
    return {
      top: s.top,
      left: s.left
    };
  }
  resolveBounds(t) {
    const e = this.#t(t);
    return {
      width: e.width,
      height: e.height
    };
  }
  clampToViewport(t, e, i = 10, s) {
    const n = e.offsetWidth, r = e.offsetHeight, c = this.#t(s);
    return {
      top: Math.max(
        c.scrollTop + i,
        Math.min(t.top, c.scrollTop + c.height - r - i)
      ),
      left: Math.max(
        c.scrollLeft + i,
        Math.min(t.left, c.scrollLeft + c.width - n - i)
      )
    };
  }
  #t(t) {
    if (!t || t === document.body)
      return {
        mode: "fixed",
        width: window.innerWidth,
        height: window.innerHeight,
        originTop: 0,
        originLeft: 0,
        scrollTop: 0,
        scrollLeft: 0
      };
    const e = t.getBoundingClientRect();
    return {
      mode: "absolute",
      width: t.clientWidth,
      height: t.clientHeight,
      originTop: e.top,
      originLeft: e.left,
      scrollTop: t.scrollTop,
      scrollLeft: t.scrollLeft
    };
  }
  #i(t, e, i, s) {
    const n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
    let c = n.bottom - s.originTop + s.scrollTop + 10, a = n.left - s.originLeft + s.scrollLeft + n.width / 2 - r.width / 2;
    const l = s.scrollLeft + s.width - r.width - i;
    a = Math.max(
      s.scrollLeft + i,
      Math.min(a, l)
    );
    const d = s.scrollTop + s.height - i, p = c + r.height > d;
    t.classList.toggle("neattip-bottom", p), p && (c = n.top - s.originTop + s.scrollTop - r.height - 10), c = Math.max(s.scrollTop + i, c);
    const f = n.left - s.originLeft + s.scrollLeft + n.width / 2 - a;
    t.style.setProperty("--arrow-left", `${f}px`), t.style.top = `${c}px`, t.style.left = `${a}px`;
  }
}
class li {
  #t = !1;
  #i;
  #e = 0;
  #n = 0;
  #o = 0;
  #r = 0;
  #c;
  #s;
  #p;
  #h;
  #f;
  #a;
  #d = new Xt();
  get isDragging() {
    return this.#t;
  }
  setup(t, e, i, s) {
    this.teardown(t, e), this.#f = i, this.#s = s, e.addEventListener("pointerdown", this.#u);
  }
  teardown(t, e) {
    if (e.removeEventListener("pointerdown", this.#u), document.removeEventListener("pointermove", this.#m), document.removeEventListener("pointerup", this.#l), document.removeEventListener("pointercancel", this.#l), this.#h !== void 0 && (cancelAnimationFrame(this.#h), this.#h = void 0), this.#a && this.#i !== void 0)
      try {
        this.#a.releasePointerCapture(this.#i);
      } catch {
      }
    t.classList.remove("neattip-dragging"), this.#a = void 0, this.#p = void 0, this.#i = void 0, this.#t = !1, this.#s = void 0;
  }
  #u = (t) => {
    if (t.pointerType === "mouse" && t.button !== 0)
      return;
    const e = t.currentTarget.closest(".neattip-tooltip");
    if (!e || t.target?.closest("a, button, input, textarea, select"))
      return;
    t.preventDefault(), t.stopPropagation();
    const i = t.currentTarget;
    this.#a = i, i.setPointerCapture(t.pointerId), this.#c = e, this.#i = t.pointerId, this.#t = !0, this.#e = t.clientX, this.#n = t.clientY;
    const s = this.#d.readTooltipPosition(e, this.#s);
    this.#o = s.top, this.#r = s.left, e.classList.add("neattip-dragging"), document.addEventListener("pointermove", this.#m), document.addEventListener("pointerup", this.#l), document.addEventListener("pointercancel", this.#l);
  };
  #m = (t) => {
    if (!this.#t || this.#i !== t.pointerId)
      return;
    const e = this.#c;
    if (!e)
      return;
    const i = t.clientX - this.#e, s = t.clientY - this.#n, n = {
      top: this.#o + s,
      left: this.#r + i
    };
    this.#p = this.#d.clampToViewport(
      n,
      e,
      y.viewportMargin,
      this.#s
    ), this.#h === void 0 && (this.#h = requestAnimationFrame(() => {
      this.#h = void 0, this.#v();
    }));
  };
  #l = (t) => {
    if (this.#i !== t.pointerId)
      return;
    if (this.#v(), this.#c?.classList.remove("neattip-dragging"), this.#a)
      try {
        this.#a.releasePointerCapture(t.pointerId);
      } catch {
      }
    this.#a = void 0, this.#c = void 0, this.#p = void 0, this.#i = void 0, this.#t = !1, document.removeEventListener("pointermove", this.#m), document.removeEventListener("pointerup", this.#l), document.removeEventListener("pointercancel", this.#l);
  };
  #v() {
    const t = this.#c, e = this.#p;
    !t || !e || (t.style.top = `${e.top}px`, t.style.left = `${e.left}px`, this.#f?.(e));
  }
}
class pi {
  resolve(t) {
    return this.#t(t) ?? document.body;
  }
  isBodyHost(t) {
    return t === document.body;
  }
  isDialogHost(t) {
    return t instanceof HTMLDialogElement;
  }
  #t(t) {
    let e = t;
    for (; e; ) {
      if (e instanceof HTMLDialogElement && e.open)
        return e;
      e = this.#i(e);
    }
    return null;
  }
  #i(t) {
    if (t instanceof Element && t.assignedSlot)
      return t.assignedSlot;
    if (t.parentNode)
      return t.parentNode;
    const e = t.getRootNode();
    return e instanceof ShadowRoot ? e.host : null;
  }
}
const di = 'umb-property-layout [slot=description].neattip-keep-visible,umb-property-layout #description.neattip-keep-visible,umb-property-layout .property-description.neattip-keep-visible,umb-property-layout umb-ufm-render.neattip-keep-visible{visibility:visible!important;display:block!important}.neattip-hidden{display:none!important}.neattip-wrapper{display:inline-flex;align-items:center;isolation:isolate;margin-left:8px;vertical-align:middle;line-height:1}umb-property-layout neat-tip-indicator,umb-property-layout .neattip-indicator{flex-shrink:0;align-self:center}.neattip-tooltip{position:fixed;z-index:999999;display:none;opacity:0;transform:translateY(2px) scale(.985);transform-origin:center top;box-sizing:border-box;width:max-content;min-width:200px;max-width:320px;padding:10px 12px 0;border:1px solid var(--uui-color-border-standalone, #dbdbdb);border-radius:8px;background:var(--uui-color-surface, #fff);color:var(--uui-color-text, #262626);font-size:13px;line-height:1.5;box-shadow:0 8px 20px #0000001a;transition:opacity .15s ease,transform .15s ease;pointer-events:none}.neattip-tooltip.neattip-visible{display:block;opacity:1;transform:translateY(0) scale(1)}.neattip-tooltip:before,.neattip-tooltip:after{content:"";position:absolute;left:var(--arrow-left, 50%);transform:translate(-50%);border:8px solid transparent}.neattip-tooltip:before{top:-16px;border-bottom-color:var(--uui-color-border, #e0e0e0)}.neattip-tooltip:after{top:-15px;border-bottom-color:var(--uui-color-surface, #fff)}.neattip-tooltip.neattip-bottom:before{top:auto;bottom:-16px;border-bottom-color:transparent;border-top-color:var(--uui-color-border, #e0e0e0)}.neattip-tooltip.neattip-bottom:after{top:auto;bottom:-15px;border-bottom-color:transparent;border-top-color:var(--uui-color-surface, #fff)}.neattip-tooltip-header{height:16px;margin:-2px -4px 0;cursor:grab;border-radius:4px 4px 2px 2px;flex-shrink:0}.neattip-tooltip-body{min-width:0;padding-bottom:2px}.neattip-tooltip.neattip-dragging .neattip-tooltip-header{cursor:grabbing}.neattip-tooltip-content strong{font-weight:600}.neattip-tooltip-content{padding:4px 0 6px;color:inherit;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word}.neattip-tooltip.neattip-empty .neattip-tooltip-content{color:var(--uui-color-text-alt, #6f6f6f)}.neattip-empty-state-message{margin:0;font-size:12px;line-height:1.4}.neattip-tooltip-editor{display:none;margin-top:4px;padding-bottom:6px}.neattip-editor-hidden,.neattip-actions-hidden{display:none!important}.neattip-editor-input{display:block;box-sizing:border-box;width:100%;min-height:180px;border:1px solid var(--uui-color-border-emphasis, #bfbfbf);border-radius:var(--uui-border-radius, 3px);background:var(--uui-color-surface, #fff);color:inherit;font:inherit;line-height:1.5;padding:10px;resize:vertical;outline:none}.neattip-editor-input:focus{border-color:var(--uui-color-focus, #3550b8);box-shadow:0 0 0 1px #3550b840}.neattip-tooltip-actions{display:flex;gap:var(--uui-size-space-1, 4px);justify-content:flex-end;align-items:center;margin:8px -12px 0;padding:8px 12px 10px;border-top:1px solid var(--uui-color-border, #ebebeb);flex-shrink:0}.neattip-inline-actions{display:inline-flex;gap:2px;align-items:center;margin-left:auto}.neattip-action-button{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;padding:0;border:0;border-radius:var(--uui-border-radius, 3px);background:transparent;color:var(--uui-color-text-alt, #6f6f6f);cursor:pointer}.neattip-action-button:hover{background:var(--uui-color-surface-emphasis, #f3f3f3);color:var(--uui-color-interactive-emphasis, #174f8c)}.neattip-action-button:focus-visible{outline:2px solid var(--uui-color-focus, #3550b8);outline-offset:2px}.neattip-action-icon{display:inline-flex;width:16px;height:16px;pointer-events:none}.neattip-action-icon svg{display:block;width:100%;height:100%}.neattip-tooltip.neattip-mode-edit .neattip-tooltip-content{display:none}.neattip-tooltip.neattip-mode-edit .neattip-tooltip-editor{display:block}.neattip-tooltip.neattip-mode-edit{width:min(420px,calc(100vw - 32px))}.neattip-editor-action,.neattip-empty-action{--uui-button-height: 28px}.neattip-copy-feedback{margin-right:auto;min-height:1em;font-size:12px;line-height:1;color:var(--uui-color-positive, #2f7d32);opacity:0;transform:translateY(2px);transition:opacity .14s ease,transform .14s ease;pointer-events:none}.neattip-copy-feedback-visible{opacity:1;transform:translateY(0)}.neattip-tooltip-content *{color:inherit}.neattip-tooltip-content a,.neattip-tooltip-content .neattip-link{color:var(--uui-color-interactive, #007acc);text-decoration:underline;overflow-wrap:anywhere;word-break:break-word}.neattip-tooltip-content ul,.neattip-tooltip-content ol{margin:.5em 0;padding-left:1.5em}.neattip-tooltip-content p{margin:.5em 0}.neattip-tooltip-content p:first-child{margin-top:0}.neattip-tooltip-content p:last-child{margin-bottom:0}.neattip-tooltip-content code{background:var(--uui-color-background, #f4f4f4);padding:1px 4px;border-radius:3px;font-size:12px}.neattip-tooltip-content pre{background:var(--uui-color-background, #f4f4f4);padding:8px;border-radius:4px;overflow-x:auto;font-size:12px}.umb-block-list__block .neattip-indicator,.umb-block-grid__block .neattip-indicator,.umb-block-list__block neat-tip-indicator,.umb-block-grid__block neat-tip-indicator{width:14px;height:14px}@media(max-width:768px){.neattip-tooltip{min-width:min(200px,calc(100vw - 40px));max-width:calc(100vw - 40px)}}@media(max-width:480px){.neattip-tooltip{font-size:12px;padding:8px 10px 0}.neattip-tooltip-actions{margin-left:-10px;margin-right:-10px;padding-left:10px;padding-right:10px}}@media(prefers-reduced-motion:reduce){.neattip-tooltip,.neattip-tooltip-content,.neattip-tooltip-editor,.neattip-copy-feedback{transition:none}}@media(prefers-contrast:high){.neattip-tooltip{border-width:2px;box-shadow:none}}@media print{.neattip-wrapper,.neattip-indicator,neat-tip-indicator,.neattip-tooltip{display:none!important}.neattip-hidden{display:block!important}}', it = "neattip-styles", Q = /* @__PURE__ */ new WeakSet();
function Gt(o) {
  if (Q.has(o))
    return;
  const t = fi(o);
  if (t.querySelector(`#${it}`)) {
    Q.add(o);
    return;
  }
  const e = document.createElement("style");
  e.id = it, e.textContent = di, t.appendChild(e), Q.add(o);
}
function hi() {
  Gt(document.body);
}
function ui() {
  document.head.querySelector(`#${it}`)?.remove();
}
function fi(o) {
  return o === document.body ? document.head : o;
}
const mi = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"/><path d="M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706zM5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1"/></svg>', vi = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"/></svg>';
class yi {
  #t;
  #i = document.body;
  #e;
  #n;
  #o;
  #r;
  #c;
  #s = !1;
  #p = !1;
  #h = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  #f;
  #a;
  #d = new Xt();
  #u = new li();
  #m = new pi();
  #l;
  #v;
  constructor(t, e) {
    this.#l = t, this.#v = e;
  }
  start() {
    document.addEventListener("pointerdown", this.#M, !1), document.addEventListener("click", this.#H, !1), document.addEventListener("keydown", this.#R), window.addEventListener("scroll", this.#w, !0), document.addEventListener("scroll", this.#w, !0), window.addEventListener("resize", this.#w), window.addEventListener("popstate", this.#$), window.addEventListener("hashchange", this.#$), this.#f = this.#l.subscribe(() => {
      this.#t && (this.#L(
        this.#t,
        this.#t.dataset.neattipCurrentMarkdown ?? ""
      ), this.#E(this.#t), this.#t.classList.contains("neattip-mode-edit") && !this.#l.canPerform("edit") && this.#g());
    });
  }
  stop() {
    this.hide(!0), clearTimeout(this.#r), clearTimeout(this.#c), this.#f?.(), this.#f = void 0, this.#a !== void 0 && (cancelAnimationFrame(this.#a), this.#a = void 0), document.removeEventListener("pointerdown", this.#M, !1), document.removeEventListener("click", this.#H, !1), document.removeEventListener("keydown", this.#R), window.removeEventListener("scroll", this.#w, !0), document.removeEventListener("scroll", this.#w, !0), window.removeEventListener("resize", this.#w), window.removeEventListener("popstate", this.#$), window.removeEventListener("hashchange", this.#$);
    const t = this.#t?.querySelector(".neattip-tooltip-header");
    this.#t && t && this.#u.teardown(this.#t, t), this.#t?.remove(), this.#t = void 0;
  }
  show(t, e, i = !1) {
    if (clearTimeout(this.#n), clearTimeout(this.#o), this.#y()) {
      this.#e === t && this.cancelScheduledHide();
      return;
    }
    i && (this.#s = !0);
    const s = i || this.#h ? 0 : y.tooltipDelay;
    this.#n = setTimeout(() => {
      if (!t.isConnected)
        return;
      const n = this.#P();
      this.#N(t), n.style.pointerEvents = "none", n.classList.remove("neattip-visible", "neattip-bottom"), n.style.maxWidth = `${y.tooltipMaxWidth}px`, n.style.minWidth = `${y.tooltipMinWidth}px`;
      const r = n.querySelector(".neattip-tooltip-content"), c = N(t), a = this.#v.getResolutionContext(), l = e.trim() || t.dataset.neattipMarkdown?.trim() || (c ? _(c, a) : "") || "", d = c ? Z(c, l) : xt(l);
      r && (r.innerHTML = d), n.dataset.neattipCurrentMarkdown = l, this.#I(n, l), n.style.display = "block", n.offsetHeight;
      const p = t.dataset.neattipId ?? crypto.randomUUID();
      t.dataset.neattipId = p;
      const f = t.dataset.neattipPosition;
      if (this.#s && f) {
        const v = JSON.parse(f);
        n.style.top = `${v.top}px`, n.style.left = `${v.left}px`;
      } else
        this.#d.position(n, t, {
          host: this.#A()
        });
      this.#B(n), n.classList.add("neattip-visible"), n.style.pointerEvents = "auto", this.#e = t, t.classList.toggle("neattip-active", this.#s);
    }, s);
  }
  hide(t = !1) {
    if (clearTimeout(this.#n), clearTimeout(this.#o), clearTimeout(this.#c), (this.#s || this.#y()) && !t)
      return;
    const e = this.#t;
    if (!e)
      return;
    this.#g();
    const i = e.querySelector(".neattip-tooltip-header");
    i && this.#u.teardown(e, i), e.classList.remove("neattip-visible", "neattip-bottom", "neattip-dragging"), e.style.pointerEvents = "none", e.style.display = "none", e.parentElement !== document.body && document.body.appendChild(e), this.#i = document.body, this.#e?.classList.remove("neattip-active"), this.#e = void 0, this.#s = !1, document.querySelectorAll("[data-neattip-position]").forEach((s) => {
      delete s.dataset.neattipPosition;
    });
  }
  scheduleHide(t) {
    this.#s || this.#y() || t instanceof MouseEvent && this.#W(t) || (clearTimeout(this.#o), this.#o = setTimeout(() => {
      this.#V() || this.hide(!1);
    }, y.tooltipHideDelay));
  }
  cancelScheduledHide() {
    clearTimeout(this.#o);
  }
  toggle(t, e) {
    if (!this.#y()) {
      if (this.#s && this.#e === t) {
        this.hide(!0);
        return;
      }
      this.hide(!0), this.show(t, e, !0);
    }
  }
  isActiveIndicator(t) {
    return this.#e === t;
  }
  isToggled() {
    return this.#s;
  }
  isEditing() {
    return this.#y();
  }
  onCultureChange() {
    const t = this.#t;
    if (t) {
      if (t.classList.contains("neattip-mode-edit")) {
        const e = t.querySelector(".neattip-editor-input"), i = t.dataset.neattipEditBaseline?.trim() ?? "", n = !((e?.value.trim() ?? "") !== i) && this.#l.canPerform("edit");
        this.#g(), n && this.#C();
        return;
      }
      this.#e && this.#k();
    }
  }
  #k() {
    const t = this.#t, e = this.#e;
    if (!t || !e)
      return;
    const i = N(e), s = this.#v.getResolutionContext(), n = i ? _(i, s) : this.#x();
    e.dataset.neattipMarkdown = n;
    const r = t.querySelector(".neattip-tooltip-content"), c = i ? Z(i, n) : xt(n);
    r && (r.innerHTML = c), t.dataset.neattipCurrentMarkdown = n, this.#L(t, n), this.#E(t);
  }
  refreshIfActiveLayout(t) {
    const e = this.#e;
    !e || N(e) !== t || this.#t?.classList.contains("neattip-mode-edit") || this.#k();
  }
  #P() {
    if (this.#t)
      return this.#t;
    const t = document.createElement("div");
    return t.className = "neattip-tooltip", t.setAttribute("role", "tooltip"), t.innerHTML = `
      <div class="neattip-tooltip-header" aria-hidden="true"></div>
      <div class="neattip-tooltip-body">
        <div class="neattip-tooltip-content"></div>
        <div class="neattip-tooltip-editor">
          <textarea class="neattip-editor-input" rows="5" aria-label="Helper text"></textarea>
        </div>
      </div>
      <div class="neattip-tooltip-actions">
        <span class="neattip-copy-feedback" aria-live="polite"></span>
        <div class="neattip-inline-actions" role="toolbar" aria-label="Helper text actions">
          <button
            class="neattip-action-button"
            type="button"
            aria-label="Copy"
            title="Copy"
            data-neattip-action="copy"
          >
            <span class="neattip-action-icon">${mi}</span>
          </button>
          <button
            class="neattip-action-button"
            type="button"
            aria-label="Edit"
            title="Edit"
            data-neattip-action="edit"
          >
            <span class="neattip-action-icon">${vi}</span>
          </button>
        </div>
        <uui-button
          class="neattip-empty-action neattip-editor-hidden"
          type="button"
          look="primary"
          color="default"
          label="Add helper text"
          title="Add helper text"
          data-neattip-action="add"
        ></uui-button>
        <uui-button
          class="neattip-editor-action neattip-editor-hidden"
          type="button"
          look="primary"
          color="positive"
          label="Save"
          title="Save"
          data-neattip-action="save"
        ></uui-button>
        <uui-button
          class="neattip-editor-action neattip-editor-hidden"
          type="button"
          look="secondary"
          color="default"
          label="Cancel"
          title="Cancel"
          data-neattip-action="cancel"
        ></uui-button>
      </div>
    `, t.addEventListener("click", this.#O), t.addEventListener("click-label", this.#O), this.#F(t), this.#z(t), this.#E(t), document.body.appendChild(t), this.#t = t, t;
  }
  #N(t) {
    const e = this.#P(), i = this.#m.resolve(t);
    this.#i = i, Gt(i), e.parentElement !== i && i.appendChild(e), this.#d.applyHostPositionMode(e, this.#A());
  }
  #A() {
    return this.#m.isBodyHost(this.#i) ? void 0 : this.#i;
  }
  #q() {
    this.#a === void 0 && (this.#a = requestAnimationFrame(() => {
      this.#a = void 0, this.#U();
    }));
  }
  #U() {
    const t = this.#t, e = this.#e;
    if (!t?.classList.contains("neattip-visible") || !e?.isConnected || this.#u.isDragging)
      return;
    this.#N(e);
    const i = e.dataset.neattipPosition;
    if (this.#s && i) {
      const s = JSON.parse(i);
      t.style.top = `${s.top}px`, t.style.left = `${s.left}px`;
      return;
    }
    this.#d.position(t, e, {
      host: this.#A()
    });
  }
  #F(t) {
    const e = (i) => {
      i.stopPropagation();
    };
    t.addEventListener("pointerdown", e), t.addEventListener("mousedown", e);
  }
  #B(t) {
    const e = t.querySelector(".neattip-tooltip-header");
    e && this.#u.setup(
      t,
      e,
      (i) => {
        this.#e?.setAttribute("data-neattip-position", JSON.stringify(i));
      },
      this.#A()
    );
  }
  #z(t) {
    if (this.#p)
      return;
    this.#p = !0;
    const e = () => {
      this.cancelScheduledHide(), this.#T();
    }, i = (s) => {
      !this.#s && !this.#y() && !this.#u.isDragging && this.scheduleHide(s);
    };
    t.addEventListener("pointerenter", e), t.addEventListener("mouseenter", e), t.addEventListener("pointerleave", i), t.addEventListener("mouseleave", i);
  }
  #W(t) {
    if (this.#S(t.relatedTarget))
      return !0;
    if (!this.#t?.classList.contains("neattip-visible"))
      return !1;
    const e = document.elementFromPoint(t.clientX, t.clientY);
    return this.#S(e);
  }
  #S(t) {
    if (!(t instanceof Node))
      return !1;
    let e = t;
    for (; e; ) {
      if (e === this.#t || e === this.#e || e instanceof Element && (e.classList.contains("neattip-tooltip") || e.classList.contains("neattip-wrapper") || e.classList.contains("neattip-indicator") || e.tagName.toLowerCase() === "neat-tip-indicator"))
        return !0;
      if (e.parentNode) {
        e = e.parentNode;
        continue;
      }
      const i = e.getRootNode();
      e = i instanceof ShadowRoot ? i.host : null;
    }
    return !1;
  }
  #D(t) {
    const e = typeof t.composedPath == "function" ? t.composedPath() : [];
    for (const i of e)
      if (this.#S(i))
        return !0;
    return this.#S(t.target);
  }
  #T() {
    this.#s = !0, this.cancelScheduledHide(), this.#e?.classList.add("neattip-active");
  }
  #V() {
    const t = this.#t;
    return !!(t?.classList.contains("neattip-visible") && t.matches(":hover") || this.#e?.matches(":hover"));
  }
  #M = (t) => {
    this.#t?.classList.contains("neattip-visible") && (this.#D(t) || this.#y() || this.hide(!0));
  };
  #H = (t) => {
    this.#D(t) || this.#y() || this.hide(!0);
  };
  #R = (t) => {
    if (t.key === "Escape") {
      if (this.#t?.classList.contains("neattip-mode-edit")) {
        t.preventDefault(), this.#g();
        return;
      }
      this.hide(!0);
    }
  };
  #w = () => {
    this.#t?.classList.contains("neattip-visible") && (this.#u.isDragging || this.#q());
  };
  #$ = () => {
    this.#y() || this.hide(!0);
  };
  #O = (t) => {
    const e = this.#K(t);
    if (!e)
      return;
    this.cancelScheduledHide(), this.#T(), t.preventDefault(), t.stopPropagation();
    const i = e.dataset.neattipAction;
    if (!i)
      return;
    const s = i === "save" || i === "add" ? "edit" : i === "copy" || i === "edit" ? i : null;
    if (!(s && !this.#l.canPerform(s)))
      switch (i) {
        case "copy":
          this.#j();
          break;
        case "edit":
          this.#C();
          break;
        case "add":
          this.#C();
          break;
        case "save":
          this.#Y();
          break;
        case "cancel":
          this.#g();
          break;
      }
  };
  #K(t) {
    const e = typeof t.composedPath == "function" ? t.composedPath() : [];
    for (const s of e) {
      if (!(s instanceof Element) || !(s instanceof HTMLElement))
        continue;
      if (s.hasAttribute("data-neattip-action"))
        return s;
      const n = s.closest("[data-neattip-action]");
      if (n)
        return n;
    }
    const i = t.target;
    if (i instanceof HTMLElement)
      return i.closest("[data-neattip-action]") ?? void 0;
  }
  #I(t, e) {
    t.dataset.neattipCurrentMarkdown = e, this.#_(), this.#b("Save"), this.#g(), this.#L(t, e), this.#E(t);
  }
  #E(t) {
    const e = this.#l.getAllowedActions(), i = this.#X(t), s = t.querySelector("[data-neattip-action='copy']"), n = t.querySelector("[data-neattip-action='edit']"), r = t.querySelector(".neattip-inline-actions"), c = t.querySelector(".neattip-empty-action"), a = t.querySelector(".neattip-tooltip-actions"), l = t.querySelector(".neattip-copy-feedback"), d = !i && e.includes("copy"), p = !i && e.includes("edit"), f = d || p, v = i && this.#l.canPerform("edit"), x = f || v;
    s?.classList.toggle("neattip-editor-hidden", !d), n?.classList.toggle("neattip-editor-hidden", !p), r?.classList.toggle("neattip-editor-hidden", !f), c?.classList.toggle("neattip-editor-hidden", !v), l?.classList.toggle("neattip-editor-hidden", i), a?.classList.toggle("neattip-actions-hidden", !x);
  }
  #j() {
    const t = this.#x();
    t && (navigator.clipboard?.writeText(t), this.#G());
  }
  #C() {
    if (!this.#l.canPerform("edit"))
      return;
    const t = this.#t;
    if (!t)
      return;
    const e = t.querySelector(".neattip-editor-input"), i = t.querySelector(".neattip-inline-actions"), s = t.querySelector(".neattip-empty-action"), n = t.querySelector("[data-neattip-action='save']"), r = t.querySelector("[data-neattip-action='cancel']");
    if (!e || !i || !s || !n || !r)
      return;
    const c = this.#x();
    t.dataset.neattipCurrentMarkdown = c, t.dataset.neattipEditBaseline = c, e.value = c, this.#_(), this.cancelScheduledHide(), this.#T(), t.classList.add("neattip-mode-edit"), t.style.maxWidth = "420px", this.#e?.classList.add("neattip-active"), t.querySelector(".neattip-tooltip-actions")?.classList.remove("neattip-actions-hidden"), i.classList.add("neattip-editor-hidden"), s.classList.add("neattip-editor-hidden"), n.classList.remove("neattip-editor-hidden"), r.classList.remove("neattip-editor-hidden"), this.#b("Save"), e.disabled = !1, requestAnimationFrame(() => {
      e.value = c, e.focus(), e.setSelectionRange(e.value.length, e.value.length);
    });
  }
  #g() {
    const t = this.#t;
    if (!t)
      return;
    const e = t.querySelector(".neattip-inline-actions"), i = t.querySelector("[data-neattip-action='save']"), s = t.querySelector("[data-neattip-action='cancel']");
    if (!e || !i || !s)
      return;
    const n = this.#s;
    t.classList.remove("neattip-mode-edit"), delete t.dataset.neattipEditBaseline, e.classList.remove("neattip-editor-hidden"), i.classList.add("neattip-editor-hidden"), s.classList.add("neattip-editor-hidden");
    const r = t.querySelector(".neattip-editor-input");
    r && (r.value = this.#x(), r.disabled = !0), t.style.maxWidth = `${y.tooltipMaxWidth}px`, t.style.minWidth = `${y.tooltipMinWidth}px`, this.#L(t, t.dataset.neattipCurrentMarkdown ?? ""), this.#E(t), n || this.#e?.classList.remove("neattip-active");
  }
  #y() {
    return this.#t?.classList.contains("neattip-mode-edit") ?? !1;
  }
  async #Y() {
    if (!this.#l.canPerform("edit")) {
      this.#g();
      return;
    }
    const t = this.#t, e = this.#e;
    if (!t || !e)
      return;
    const i = t.querySelector(".neattip-editor-input"), s = t.querySelector(".neattip-tooltip-content");
    if (!i || !s)
      return;
    const n = i.value.trim(), r = N(e);
    if (!r)
      return;
    const c = ae.resolveUpdateTarget(r);
    if (!c) {
      this.#b("No target");
      return;
    }
    try {
      this.#b("Saving...");
      const a = await ci(
        {
          ...c,
          culture: this.#v.getActiveCulture() ?? void 0
        },
        n
      );
      ce(r, a.description);
      const l = a.propertyDescription?.trim();
      l ? (r.dataset.neattipPropertyDescriptionFallback = l, r.dataset.neattipOriginalDescription = l) : (delete r.dataset.neattipPropertyDescriptionFallback, delete r.dataset.neattipOriginalDescription);
      const d = le(a.description);
      O.updateFromSave(
        a.propertyAlias ?? c.propertyAlias,
        a.propertyKey ?? c.propertyKey,
        d,
        l ?? "",
        a.contentTypeKey ?? c.contentTypeKey
      );
      const p = a.cultureDescription?.trim() || n;
      r.dataset.neattipStoredDescription = p, Mt(r, this.#v.getActiveCulture(), p), e.dataset.neattipMarkdown = p, t.dataset.neattipCurrentMarkdown = p, s.innerHTML = Z(r, p), this.#b("Saved"), this.#Z("✓ Saved", 1e3), this.#c = window.setTimeout(() => {
        this.#b("Save"), this.#I(t, p);
      }, 1e3);
    } catch {
      this.#b("Failed");
      return;
    }
  }
  #x() {
    const e = this.#t?.dataset.neattipCurrentMarkdown?.trim();
    if (e)
      return e;
    const i = this.#e;
    if (!i)
      return "";
    const s = N(i), n = this.#v.getResolutionContext();
    return i.dataset.neattipMarkdown?.trim() || (s ? _(s, n) : "") || (s ? Pt(s, n) : "") || "";
  }
  #X(t) {
    return !t.dataset.neattipCurrentMarkdown?.trim();
  }
  #L(t, e) {
    const i = t.querySelector(".neattip-tooltip-content");
    if (!i)
      return;
    const s = !e.trim();
    if (t.classList.toggle("neattip-empty", s), !s)
      return;
    const n = this.#l.canPerform("edit") ? "No helper text yet." : "No helper text available.";
    i.innerHTML = `<p class="neattip-empty-state-message">${n}</p>`;
  }
  #b(t) {
    const e = this.#t?.querySelector("[data-neattip-action='save']");
    e && (e.setAttribute("label", t), e.setAttribute("title", t));
  }
  #G() {
    const t = this.#t?.querySelector(".neattip-copy-feedback");
    t && (clearTimeout(this.#r), t.classList.remove("neattip-editor-hidden"), t.textContent = "✓ Copied", t.classList.add("neattip-copy-feedback-visible"), this.#r = window.setTimeout(() => this.#_(), 1e3));
  }
  #_() {
    clearTimeout(this.#r);
    const t = this.#t?.querySelector(".neattip-copy-feedback");
    t && (t.classList.remove("neattip-copy-feedback-visible"), t.textContent = "");
  }
  #Z(t, e) {
    const i = this.#t?.querySelector(".neattip-copy-feedback");
    i && (clearTimeout(this.#r), i.classList.remove("neattip-editor-hidden"), i.textContent = t, i.classList.add("neattip-copy-feedback-visible"), this.#r = window.setTimeout(() => this.#_(), e));
  }
}
const _t = "neattip-display-culture", Tt = "neattip-fallback-culture";
class gi extends me {
  #t;
  #i;
  #e = /* @__PURE__ */ new Set();
  constructor(t) {
    super(t), this.consumeContext(ve, (e) => {
      this.#n(e);
    });
  }
  getActiveCulture() {
    return pe() ?? this.#t ?? null;
  }
  getFallbackCulture() {
    return this.#i;
  }
  getResolutionContext() {
    return {
      activeCulture: this.getActiveCulture(),
      fallbackCulture: this.#i
    };
  }
  subscribe(t) {
    return this.#e.add(t), () => {
      this.#e.delete(t);
    };
  }
  destroy() {
    this.#e.clear(), this.removeUmbControllerByAlias(_t), this.removeUmbControllerByAlias(Tt), super.destroy();
  }
  #n(t) {
    t && (this.observe(
      t.displayCulture,
      (e) => {
        const i = this.#t, s = e ?? null;
        this.#t = s, M(i) !== M(s) && this.#e.forEach((n) => n(s, i));
      },
      _t
    ), this.observe(
      t.fallbackCulture,
      (e) => {
        this.#i = e ?? null;
      },
      Tt
    ));
  }
}
const bi = /\/document\/edit\//i, wi = /\/section\/content/i, Ei = ["/section/settings", "/section/member", "/section/media"];
class Ai {
  #t = /* @__PURE__ */ new Set();
  #i;
  #e;
  isContentEditingContext() {
    const t = window.location.pathname;
    return Ei.some((e) => t.includes(e)) ? !1 : wi.test(t);
  }
  isDocumentContentEdit() {
    const t = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    return bi.test(t);
  }
  shouldProcessElement(t) {
    return !this.isDocumentContentEdit() || Si(t) ? !1 : de(t) || $i(t);
  }
  subscribeNavigation(t) {
    return this.#t.add(t), this.#t.size === 1 && this.#n(), () => {
      this.#t.delete(t), this.#t.size === 0 && this.#o();
    };
  }
  #n() {
    this.#i = history.pushState.bind(history), this.#e = history.replaceState.bind(history), history.pushState = (...t) => {
      this.#i(...t), this.#r();
    }, history.replaceState = (...t) => {
      this.#e(...t), this.#r();
    };
  }
  #o() {
    this.#i && (history.pushState = this.#i), this.#e && (history.replaceState = this.#e), this.#i = void 0, this.#e = void 0;
  }
  #r() {
    queueMicrotask(() => {
      this.#t.forEach((t) => t());
    });
    for (const t of [50, 150, 400, 800])
      window.setTimeout(() => {
        this.#t.forEach((e) => e());
      }, t);
  }
}
function Si(o) {
  let t = o;
  for (; t; ) {
    if (t instanceof Element && t.matches(he))
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
function $i(o) {
  let t = o;
  for (; t; ) {
    if (t instanceof Element && t.matches("umb-property, umb-content-workspace-property"))
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
class xi {
  #t;
  #i;
  #e = new Ai();
  #n = new ri();
  #o;
  #r = new je(this.#e);
  #c;
  #s;
  #p;
  #h;
  #f;
  #a;
  #d = () => {
    this.#u();
  };
  constructor(t) {
    this.#t = new ue(t), this.#i = new gi(t), this.#t.setEditHelperTextAllowedSections(
      h.editHelperTextAllowedSections
    ), this.#o = new yi(this.#t, this.#i), this.#c = new si(
      this.#e,
      this.#o,
      this.#i
    ), this.#s = new oi(
      this.#e,
      this.#c,
      this.#i
    );
  }
  /** Refresh section aliases from runtime settings (config-driven permissions). */
  syncPermissionsFromRuntime() {
    this.#t.setEditHelperTextAllowedSections(
      h.editHelperTextAllowedSections
    );
  }
  start() {
    this.#r.setLayoutDetectedHandler((t) => {
      this.#s.processLayout(t);
    }), this.#r.start(), this.#o.start(), this.#s.start(), this.#n.start(), this.#p = this.#e.subscribeNavigation(this.#d), this.#h = this.#n.subscribe(this.#d), this.#f = this.#i.subscribe(() => {
      this.#l();
    }), window.addEventListener("popstate", this.#d), window.addEventListener("hashchange", this.#d), this.#m();
  }
  stop() {
    clearTimeout(this.#a), this.#a = void 0, this.#p?.(), this.#p = void 0, this.#h?.(), this.#h = void 0, this.#f?.(), this.#f = void 0, window.removeEventListener("popstate", this.#d), window.removeEventListener("hashchange", this.#d), this.#n.stop(), this.#s.stop(), this.#o.stop(), this.#r.stop(), this.#t.destroy(), this.#i.destroy();
  }
  rescan() {
    h.enabled && (Ve(), this.#r.scanAllLayouts(), this.#s.scanNow());
  }
  #u() {
    clearTimeout(this.#a), this.#a = window.setTimeout(() => {
      this.#a = void 0, this.#m();
    }, 100);
  }
  #m() {
    this.#o.hide(!0), O.invalidate(), !(!h.enabled || !this.#e.isDocumentContentEdit()) && (Ke(), this.#r.start(), this.#s.scanNow());
  }
  #l() {
    if (!h.enabled || !this.#e.isDocumentContentEdit())
      return;
    const t = () => {
      this.#s.refreshAllLayoutDescriptions(), this.#s.scanNow(), this.#o.onCultureChange();
    };
    requestAnimationFrame(t);
    for (const e of [100, 300, 800])
      window.setTimeout(t, e);
  }
}
function st() {
  b().forEach((o) => {
    const t = E(o);
    t.querySelectorAll(".neattip-wrapper, neat-tip-indicator").forEach((e) => {
      e.remove();
    }), t.querySelectorAll("label, uui-label, #label").forEach((e) => {
      const i = e.dataset.originalTitle;
      i && (e.setAttribute("title", i), delete e.dataset.originalTitle);
    }), t.querySelectorAll(ot).forEach((e) => {
      e.classList.remove(m.hidden, m.keepVisible), e.style.visibility = "", e.style.display = "";
    }), o.classList.remove(
      m.processed,
      m.keepVisible
    ), t.querySelector("#neattip-flash-style")?.remove(), D(o), delete o.dataset.neattipStoredDescription;
  });
}
let j, g;
function Li() {
  hi();
}
function _i() {
  ui();
}
function Zt() {
  !h.enabled || !j || (g ? g.syncPermissionsFromRuntime() : (g = new xi(j), g.start()));
}
function pt() {
  g?.stop(), g = void 0;
}
async function Ti() {
  try {
    await Qt();
  } catch {
    h.settingsLoaded = !0;
  }
  if (h.enabled) {
    Zt(), g?.syncPermissionsFromRuntime(), g?.rescan();
    return;
  }
  pt(), st();
}
const Jt = () => {
  if (h.enabled) {
    st(), Zt(), g?.syncPermissionsFromRuntime(), g?.rescan();
    return;
  }
  pt(), st();
}, Ri = (o) => {
  j = o, Li(), Ti(), window.addEventListener(Ht, Jt);
}, Oi = () => {
  window.removeEventListener(Ht, Jt), pt(), _i(), j = void 0;
};
export {
  Ri as onInit,
  Oi as onUnload
};
//# sourceMappingURL=entrypoint-Djjrm3-3.js.map
