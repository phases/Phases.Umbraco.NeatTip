import { N as f, l as Wt } from "./neattip-settings-api.service-ClbKK1Rt.js";
import { N as m, c as A, r as D, q as g, D as Z, F as xt, i as nt, s as jt, n as u, h as at, a as ct, S as _t, L as Bt, b as Vt, d as P, m as U, e as T, f as Kt, g as Yt, j as lt, k as Gt, l as Xt, E as Jt, o as Zt, p as Lt } from "./bundle.manifests-Bi5hYMYD.js";
import { umbHttpClient as Qt } from "@umbraco-cms/backoffice/http-client";
const z = globalThis, Q = z.ShadowRoot && (z.ShadyCSS === void 0 || z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, tt = /* @__PURE__ */ Symbol(), pt = /* @__PURE__ */ new WeakMap();
let kt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Q && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = pt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && pt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const te = (s) => new kt(typeof s == "string" ? s : s + "", void 0, tt), ee = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, o, r) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[r + 1], s[0]);
  return new kt(e, s, tt);
}, ie = (s, t) => {
  if (Q) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = z.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, s.appendChild(i);
  }
}, dt = Q ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return te(e);
})(s) : s;
const { is: oe, defineProperty: se, getOwnPropertyDescriptor: re, getOwnPropertyNames: ne, getOwnPropertySymbols: ae, getPrototypeOf: ce } = Object, j = globalThis, ht = j.trustedTypes, le = ht ? ht.emptyScript : "", pe = j.reactiveElementPolyfillSupport, M = (s, t) => s, G = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? le : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, Tt = (s, t) => !oe(s, t), ut = { attribute: !0, type: String, converter: G, reflect: !1, useDefault: !1, hasChanged: Tt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), j.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let _ = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ut) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && se(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: r } = re(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: o, set(n) {
      const c = o?.call(this);
      r?.call(this, n), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ut;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const t = ce(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(M("properties"))) {
      const e = this.properties, i = [...ne(e), ...ae(e)];
      for (const o of i) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, o] of e) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const o = this._$Eu(e, i);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) e.unshift(dt(o));
    } else t !== void 0 && e.push(dt(t));
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
    return ie(t, this.constructor.elementStyles), t;
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
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : G).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = i.getPropertyOptions(o), n = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : G;
      this._$Em = o;
      const c = n.fromAttribute(e, r.type);
      this[o] = c ?? this._$Ej?.get(o) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, r) {
    if (t !== void 0) {
      const n = this.constructor;
      if (o === !1 && (r = this[t]), i ??= n.getPropertyOptions(t), !((i.hasChanged ?? Tt)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: o, wrapped: r }, n) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, r] of i) {
        const { wrapped: n } = r, c = this[o];
        n !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, r, c);
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
_.elementStyles = [], _.shadowRootOptions = { mode: "open" }, _[M("elementProperties")] = /* @__PURE__ */ new Map(), _[M("finalized")] = /* @__PURE__ */ new Map(), pe?.({ ReactiveElement: _ }), (j.reactiveElementVersions ??= []).push("2.1.2");
const et = globalThis, ft = (s) => s, F = et.trustedTypes, mt = F ? F.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Ct = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, Pt = "?" + w, de = `<${Pt}>`, x = document, R = () => x.createComment(""), H = (s) => s === null || typeof s != "object" && typeof s != "function", it = Array.isArray, he = (s) => it(s) || typeof s?.[Symbol.iterator] == "function", V = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, vt = /-->/g, bt = />/g, $ = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gt = /'/g, yt = /"/g, Mt = /^(?:script|style|textarea|title)$/i, ue = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), fe = ue(1), L = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), wt = /* @__PURE__ */ new WeakMap(), S = x.createTreeWalker(x, 129);
function Nt(s, t) {
  if (!it(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return mt !== void 0 ? mt.createHTML(t) : t;
}
const me = (s, t) => {
  const e = s.length - 1, i = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = C;
  for (let c = 0; c < e; c++) {
    const a = s[c];
    let p, d, l = -1, v = 0;
    for (; v < a.length && (n.lastIndex = v, d = n.exec(a), d !== null); ) v = n.lastIndex, n === C ? d[1] === "!--" ? n = vt : d[1] !== void 0 ? n = bt : d[2] !== void 0 ? (Mt.test(d[2]) && (o = RegExp("</" + d[2], "g")), n = $) : d[3] !== void 0 && (n = $) : n === $ ? d[0] === ">" ? (n = o ?? C, l = -1) : d[1] === void 0 ? l = -2 : (l = n.lastIndex - d[2].length, p = d[1], n = d[3] === void 0 ? $ : d[3] === '"' ? yt : gt) : n === yt || n === gt ? n = $ : n === vt || n === bt ? n = C : (n = $, o = void 0);
    const y = n === $ && s[c + 1].startsWith("/>") ? " " : "";
    r += n === C ? a + de : l >= 0 ? (i.push(p), a.slice(0, l) + Ct + a.slice(l) + w + y) : a + w + (l === -2 ? c : y);
  }
  return [Nt(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class O {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let r = 0, n = 0;
    const c = t.length - 1, a = this.parts, [p, d] = me(t, e);
    if (this.el = O.createElement(p, i), S.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (o = S.nextNode()) !== null && a.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const l of o.getAttributeNames()) if (l.endsWith(Ct)) {
          const v = d[n++], y = o.getAttribute(l).split(w), q = /([.?@])?(.*)/.exec(v);
          a.push({ type: 1, index: r, name: q[2], strings: y, ctor: q[1] === "." ? be : q[1] === "?" ? ge : q[1] === "@" ? ye : B }), o.removeAttribute(l);
        } else l.startsWith(w) && (a.push({ type: 6, index: r }), o.removeAttribute(l));
        if (Mt.test(o.tagName)) {
          const l = o.textContent.split(w), v = l.length - 1;
          if (v > 0) {
            o.textContent = F ? F.emptyScript : "";
            for (let y = 0; y < v; y++) o.append(l[y], R()), S.nextNode(), a.push({ type: 2, index: ++r });
            o.append(l[v], R());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Pt) a.push({ type: 2, index: r });
      else {
        let l = -1;
        for (; (l = o.data.indexOf(w, l + 1)) !== -1; ) a.push({ type: 7, index: r }), l += w.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = x.createElement("template");
    return i.innerHTML = t, i;
  }
}
function k(s, t, e = s, i) {
  if (t === L) return t;
  let o = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const r = H(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== r && (o?._$AO?.(!1), r === void 0 ? o = void 0 : (o = new r(s), o._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = o : e._$Cl = o), o !== void 0 && (t = k(s, o._$AS(s, t.values), o, i)), t;
}
class ve {
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
    const { el: { content: e }, parts: i } = this._$AD, o = (t?.creationScope ?? x).importNode(e, !0);
    S.currentNode = o;
    let r = S.nextNode(), n = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let p;
        a.type === 2 ? p = new I(r, r.nextSibling, this, t) : a.type === 1 ? p = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (p = new we(r, this, t)), this._$AV.push(p), a = i[++c];
      }
      n !== a?.index && (r = S.nextNode(), n++);
    }
    return S.currentNode = x, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class I {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, o) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = k(this, t, e), H(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== L && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : he(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && H(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = O.createElement(Nt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const r = new ve(o, this), n = r.u(this.options);
      r.p(e), this.T(n), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = wt.get(t.strings);
    return e === void 0 && wt.set(t.strings, e = new O(t)), e;
  }
  k(t) {
    it(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const r of t) o === e.length ? e.push(i = new I(this.O(R()), this.O(R()), this, this.options)) : i = e[o], i._$AI(r), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = ft(t).nextSibling;
      ft(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class B {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, o, r) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(t, e = this, i, o) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = k(this, t, e, 0), n = !H(t) || t !== this._$AH && t !== L, n && (this._$AH = t);
    else {
      const c = t;
      let a, p;
      for (t = r[0], a = 0; a < r.length - 1; a++) p = k(this, c[i + a], e, a), p === L && (p = this._$AH[a]), n ||= !H(p) || p !== this._$AH[a], p === h ? t = h : t !== h && (t += (p ?? "") + r[a + 1]), this._$AH[a] = p;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class be extends B {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class ge extends B {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class ye extends B {
  constructor(t, e, i, o, r) {
    super(t, e, i, o, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = k(this, t, e, 0) ?? h) === L) return;
    const i = this._$AH, o = t === h && i !== h || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== h && (i === h || o);
    o && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class we {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    k(this, t);
  }
}
const Ae = et.litHtmlPolyfillSupport;
Ae?.(O, I), (et.litHtmlVersions ??= []).push("3.3.3");
const $e = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = o = new I(t.insertBefore(R(), r), r, void 0, e ?? {});
  }
  return o._$AI(s), o;
};
const ot = globalThis;
class N extends _ {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = $e(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return L;
  }
}
N._$litElement$ = !0, N.finalized = !0, ot.litElementHydrateSupport?.({ LitElement: N });
const Ee = ot.litElementPolyfillSupport;
Ee?.({ LitElement: N });
(ot.litElementVersions ??= []).push("4.2.2");
const Se = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
var xe = Object.getOwnPropertyDescriptor, _e = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? xe(t, e) : t, r = s.length - 1, n; r >= 0; r--)
    (n = s[r]) && (o = n(o) || o);
  return o;
};
let X = class extends N {
  render() {
    return fe`
      <uui-icon name="icon-info"></uui-icon>
      <slot></slot>
    `;
  }
};
X.styles = ee`
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
      transition: background-color ${f.fadeSpeed}ms ease,
        border-color ${f.fadeSpeed}ms ease,
        color ${f.fadeSpeed}ms ease;
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
X = _e([
  Se("neat-tip-indicator")
], X);
function Le(s) {
  return !!g(s).querySelector("neat-tip-indicator, .neattip-wrapper");
}
function st(s) {
  const t = g(s), e = s.dataset.neattipStoredDescription;
  if (t.querySelectorAll(".neattip-wrapper, neat-tip-indicator").forEach((i) => {
    i.remove();
  }), s.classList.remove(
    m.processed,
    m.keepVisible
  ), t.querySelector(`#${xt}`)?.remove(), t.querySelectorAll(Z).forEach((i) => {
    i.classList.remove(m.hidden, m.keepVisible), i.style.removeProperty("display"), i.style.removeProperty("visibility"), i.style.removeProperty("opacity"), i.style.removeProperty("height"), i.style.removeProperty("overflow");
  }), e?.trim()) {
    s.dataset.neattipStoredDescription = e.trim(), nt(s);
    return;
  }
  jt(s), nt(s);
}
function ke(s = A()) {
  s.filter((t) => t.classList.contains(m.processed)).forEach((t) => st(t));
}
function Te(s = A()) {
  s.filter((t) => Dt(t)).forEach((t) => st(t));
}
function Dt(s) {
  if (!s.classList.contains(m.processed))
    return !1;
  const t = Le(s);
  if (s.classList.contains(m.keepVisible))
    return !t && !D(s);
  if (!t || s.description?.trim())
    return !0;
  const r = g(s).querySelector(Z);
  return !r || r.classList.contains(m.hidden) ? !1 : (r.textContent?.trim().length ?? 0) > 0;
}
class Ce {
  constructor(t) {
    this.workspace = t;
  }
  #t;
  #e;
  #i;
  setLayoutDetectedHandler(t) {
    this.#i = t;
  }
  start() {
    !u.settingsLoaded || !u.enabled || this.workspace.isContentEditingContext() && (this.#s(), this.#r(), this.#e?.refresh(), this.#o());
  }
  stop() {
    clearTimeout(this.#t), this.#e?.stop(), this.#e = void 0;
  }
  cancelFallback() {
    clearTimeout(this.#t), this.#t = void 0;
  }
  hideLayoutDescriptions(t, e = !1) {
    at(t, e);
  }
  scanAllLayouts() {
    !u.settingsLoaded || !ct() || A().forEach((t) => this.#n(t, !0));
  }
  #s() {
    A().forEach((t) => this.#n(t, !0));
  }
  #r() {
    this.#e || (this.#e = new _t(() => {
      !u.settingsLoaded || !ct() || A().forEach((t) => this.#n(t));
    }), this.#e.start(document.documentElement));
  }
  #n(t, e = !1) {
    at(t, e), this.#i?.(t);
  }
  #o() {
    clearTimeout(this.#t), this.#t = setTimeout(() => {
      this.workspace.isDocumentContentEdit() || A().forEach((t) => {
        t.classList.contains(m.processed) || (g(t).querySelectorAll("[id='description'], umb-ufm-render, [slot='description']").forEach((e) => {
          e.style.display = "", e.style.visibility = "visible", e.style.opacity = "", e.style.height = "", e.style.overflow = "", e.classList.add(m.keepVisible);
        }), t.classList.add(m.keepVisible), g(t).querySelector(`#${xt}`)?.remove());
      });
    }, f.flashFallbackMs);
  }
}
const Rt = /* @__PURE__ */ new WeakMap();
function Pe(s, t) {
  Rt.set(s, t);
}
function K(s) {
  return Rt.get(s);
}
function At(s, t) {
  const i = g(s).querySelector("umb-ufm-render#description");
  let o = "";
  if (i?.shadowRoot) {
    const r = i.shadowRoot.innerHTML.trim(), n = i.shadowRoot.textContent?.trim();
    r && n && (o = r);
  }
  return o || (o = Ht(t)), It(o);
}
function Me(s) {
  return It(Ht(s));
}
function Ht(s) {
  const t = s.trim();
  if (!t)
    return "";
  const e = t.split(/\n{2,}/);
  return e.length === 1 ? `<p>${$t(e[0]).replace(/\n/g, "<br>")}</p>` : e.map((i) => `<p>${$t(i).replace(/\n/g, "<br>")}</p>`).join("");
}
function $t(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const Y = /(https?:\/\/[^\s<]+|www\.[^\s<]+|mailto:[^\s<]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, Ne = /* @__PURE__ */ new Set(["script", "style", "iframe", "object", "embed", "link", "meta"]), Ot = /^(?:javascript|data|vbscript):/i;
function It(s) {
  const t = document.createElement("template");
  t.innerHTML = s, De(t.content), Re(t.content);
  const e = document.createElement("div");
  return e.appendChild(t.content.cloneNode(!0)), e.innerHTML;
}
function De(s) {
  for (const t of Array.from(s.childNodes))
    qt(t);
}
function qt(s) {
  if (!(s instanceof Element))
    return;
  const t = s.tagName.toLowerCase();
  if (Ne.has(t)) {
    s.remove();
    return;
  }
  for (const e of Array.from(s.attributes)) {
    const i = e.name.toLowerCase();
    if (i.startsWith("on")) {
      s.removeAttribute(e.name);
      continue;
    }
    if (i === "href" || i === "src") {
      const o = e.value.trim();
      Ot.test(o) && s.removeAttribute(e.name);
    }
  }
  t === "a" && (s.classList.add("neattip-link"), Ut(s));
  for (const e of Array.from(s.childNodes))
    qt(e);
}
function Re(s) {
  const t = document.createTreeWalker(s, NodeFilter.SHOW_TEXT), e = [];
  for (; t.nextNode(); ) {
    const i = t.currentNode;
    !(i instanceof Text) || Ie(i) || e.push(i);
  }
  for (const i of e) {
    const o = He(i.data);
    o && i.replaceWith(o);
  }
}
function He(s) {
  Y.lastIndex = 0;
  let t = Y.exec(s);
  if (!t)
    return null;
  const e = document.createDocumentFragment();
  let i = 0;
  for (; t; ) {
    const o = t.index, r = t[0], { token: n, trailing: c } = Ue(r);
    o > i && e.append(document.createTextNode(s.slice(i, o)));
    const a = Oe(n);
    a ? e.append(a) : e.append(document.createTextNode(n)), c && e.append(document.createTextNode(c)), i = o + r.length, t = Y.exec(s);
  }
  return i < s.length && e.append(document.createTextNode(s.slice(i))), e;
}
function Oe(s) {
  const t = qe(s);
  if (!t)
    return null;
  const e = document.createElement("a");
  return e.className = "neattip-link", e.href = t, e.textContent = s, Ut(e), e;
}
function Ie(s) {
  let t = s.parentNode;
  for (; t; ) {
    if (t instanceof HTMLAnchorElement)
      return !0;
    t = t.parentNode;
  }
  return !1;
}
function qe(s) {
  const t = s.trim();
  if (!t)
    return null;
  const e = t.startsWith("www.") ? `https://${t}` : t.includes("@") && !t.startsWith("mailto:") ? `mailto:${t}` : t;
  try {
    const o = new URL(e).protocol.toLowerCase();
    return o !== "http:" && o !== "https:" && o !== "mailto:" ? null : e;
  } catch {
    return null;
  }
}
function Ue(s) {
  let t = s.length;
  for (; t > 0 && /[),.;!?]/.test(s[t - 1] ?? ""); )
    t -= 1;
  return {
    token: s.slice(0, t),
    trailing: s.slice(t)
  };
}
function Ut(s) {
  const t = s.getAttribute("href") ?? "";
  if (!t || Ot.test(t.trim())) {
    s.removeAttribute("href");
    return;
  }
  s.setAttribute("target", "_blank"), s.setAttribute("rel", "noopener noreferrer");
}
class ze {
  constructor(t, e) {
    this.workspace = t, this.tooltipManager = e;
  }
  #t = new Bt();
  process(t) {
    if (!(!u.settingsLoaded || !u.enabled) && this.workspace.shouldProcessElement(t)) {
      if (Vt(t)) {
        if (!Dt(t))
          return;
        st(t);
      }
      try {
        const e = D(t);
        if (e && e.length < u.minLength) {
          P(t), U(t), T(t);
          return;
        }
        if (e ? t.dataset.neattipStoredDescription = e : delete t.dataset.neattipStoredDescription, !Kt(t)) {
          P(t), U(t), T(t);
          return;
        }
        this.#e(t), Yt(t);
        const o = this.#i(e);
        if (!this.#t.placeIndicator(t, o)) {
          P(t), U(t), T(t);
          return;
        }
        Pe(o, t), this.#s(o, t, e), T(t);
      } catch {
        P(t), U(t), T(t);
      }
    }
  }
  #e(t) {
    (t.shadowRoot ?? t).querySelectorAll("label, uui-label, #label").forEach((i) => {
      const o = i.getAttribute("title");
      o && (i.dataset.originalTitle = o, i.removeAttribute("title"));
    });
  }
  #i(t) {
    const e = document.createElement("neat-tip-indicator");
    return e.classList.add("neattip-indicator"), e.setAttribute("role", "button"), e.setAttribute("tabindex", "0"), e.setAttribute(
      "aria-label",
      t ? "View property description" : "Add property description"
    ), e.dataset.neattipMarkdown = t, e.textContent = f.indicatorChar, e;
  }
  #s(t, e, i) {
    const o = () => t.dataset.neattipMarkdown?.trim() || e.dataset.neattipStoredDescription?.trim() || D(e) || i;
    t.addEventListener("click", (r) => {
      r.preventDefault(), r.stopPropagation(), this.tooltipManager.toggle(t, o());
    }), t.addEventListener("mouseenter", () => {
      this.tooltipManager.isToggled() && !this.tooltipManager.isActiveIndicator(t) || (this.tooltipManager.cancelScheduledHide(), this.tooltipManager.show(t, o(), !1));
    }), t.addEventListener("mouseleave", () => {
      this.tooltipManager.scheduleHide();
    }), t.addEventListener("keydown", (r) => {
      r.key !== "Enter" && r.key !== " " || (r.preventDefault(), this.tooltipManager.toggle(t, o()));
    });
  }
}
class Fe {
  constructor(t, e) {
    this.workspace = t, this.processor = e;
  }
  #t;
  #e;
  #i;
  #s = /* @__PURE__ */ new WeakMap();
  #r = /* @__PURE__ */ new Set();
  start() {
    this.#o(), this.#t = new _t(() => this.#n()), this.#t.start(document.documentElement);
  }
  scanNow() {
    this.#t?.refresh(), this.#o();
  }
  processLayout(t) {
    this.#a(t), this.processor.process(t);
  }
  stop() {
    clearTimeout(this.#e), this.#i && cancelAnimationFrame(this.#i), this.#r.forEach((t) => t.disconnect()), this.#r.clear(), this.#s = /* @__PURE__ */ new WeakMap(), this.#t?.stop(), this.#t = void 0;
  }
  #n() {
    clearTimeout(this.#e), this.#i && cancelAnimationFrame(this.#i), this.#i = requestAnimationFrame(() => {
      this.#o();
    }), this.#e = setTimeout(
      () => this.#o(),
      f.observerDebounceMs
    );
  }
  #o() {
    !u.settingsLoaded || !u.enabled || !this.workspace.isDocumentContentEdit() || A().forEach((t) => {
      this.#a(t), this.processor.process(t);
    });
  }
  #a(t) {
    if (this.#s.has(t))
      return;
    const e = new MutationObserver(() => {
      this.processor.process(t);
    });
    e.observe(t, {
      attributes: !0,
      attributeFilter: ["description", "label"]
    }), this.#s.set(t, e), this.#r.add(e);
  }
}
const We = [0, 50, 150, 400, 800, 1500];
class je {
  #t = /* @__PURE__ */ new Set();
  #e;
  #i = "";
  start() {
    this.#i = this.#s(), this.#e = window.setInterval(() => {
      const t = this.#s();
      t !== this.#i && (this.#i = t, this.#r());
    }, 200);
  }
  stop() {
    this.#e && (clearInterval(this.#e), this.#e = void 0);
  }
  subscribe(t) {
    return this.#t.add(t), () => {
      this.#t.delete(t);
    };
  }
  notifyNow() {
    this.#r();
  }
  #s() {
    return `${window.location.pathname}${window.location.search}${window.location.hash}`;
  }
  #r() {
    for (const t of this.#t)
      t();
    for (const t of We)
      window.setTimeout(() => {
        for (const e of this.#t)
          e();
      }, t);
  }
}
const Et = "neattip.description.overrides.v1", Be = /\/document\/edit\/([^/?#]+)/i;
class Ve {
  resolveUpdateTarget(t) {
    const e = this.#e();
    if (!e)
      return;
    const i = St(
      t,
      "umb-property, umb-content-workspace-property"
    ), o = this.#s(t, i), r = this.#r(t, i), n = this.#n(t);
    if (!(!o && !r && !n))
      return {
        documentKey: e,
        propertyAlias: o,
        propertyKey: r,
        propertyLabel: n
      };
  }
  get(t) {
    const e = this.#t(t);
    if (!e)
      return;
    const o = this.#o()[e]?.trim();
    return o || void 0;
  }
  set(t, e) {
    const i = this.#t(t);
    if (!i)
      return !1;
    const o = e.trim();
    if (!o)
      return !1;
    const r = this.#o();
    return r[i] = o, this.#a(r), !0;
  }
  #t(t) {
    const e = this.#e(), i = this.#i(t);
    if (!(!e || !i))
      return `${e}::${i}`;
  }
  #e() {
    return `${window.location.pathname}${window.location.search}${window.location.hash}`.match(Be)?.[1];
  }
  #i(t) {
    const e = St(t, "umb-property, umb-content-workspace-property"), i = this.#s(t, e);
    if (i)
      return i.toLowerCase();
    const o = this.#r(t, e);
    if (o)
      return `key:${o.toLowerCase()}`;
    const n = g(t).querySelector(lt)?.textContent?.trim();
    return n ? `label:${n.toLowerCase()}` : void 0;
  }
  #s(t, e) {
    const i = e?.getAttribute("alias") || e?.getAttribute("property-alias") || e?.getAttribute("data-property-alias") || e?.getAttribute("data-alias") || e?.getAttribute("propertyAlias") || e?.getAttribute("name");
    if (i?.trim())
      return i.trim();
    const o = t.getAttribute("alias") || t.getAttribute("property-alias") || t.getAttribute("data-property-alias") || t.getAttribute("data-alias") || t.getAttribute("propertyAlias") || t.getAttribute("name");
    if (o?.trim())
      return o.trim();
    const n = g(t).querySelector(
      "[property-alias], [data-property-alias], [data-alias], [propertyAlias]"
    );
    return (n?.getAttribute("property-alias") || n?.getAttribute("data-property-alias") || n?.getAttribute("data-alias") || n?.getAttribute("propertyAlias"))?.trim() || void 0;
  }
  #r(t, e) {
    const i = [
      e?.getAttribute("key"),
      e?.getAttribute("data-key"),
      e?.getAttribute("property-key"),
      t.getAttribute("key"),
      t.getAttribute("data-key"),
      t.getAttribute("property-key")
    ];
    for (const o of i) {
      const r = o?.trim();
      if (r && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(r))
        return r;
    }
  }
  #n(t) {
    return g(t).querySelector(lt)?.textContent?.trim() || void 0;
  }
  #o() {
    try {
      const t = localStorage.getItem(Et);
      if (!t)
        return {};
      const e = JSON.parse(t);
      return typeof e == "object" && e ? e : {};
    } catch {
      return {};
    }
  }
  #a(t) {
    try {
      localStorage.setItem(Et, JSON.stringify(t));
    } catch {
    }
  }
}
function St(s, t) {
  let e = s;
  for (; e; ) {
    if (e instanceof Element && e.matches(t))
      return e;
    if (e.parentNode) {
      e = e.parentNode;
      continue;
    }
    const i = e.getRootNode();
    e = i instanceof ShadowRoot ? i.host : null;
  }
  return null;
}
const Ke = new Ve(), Ye = [{ scheme: "bearer", type: "http" }];
async function Ge(s, t) {
  const e = {
    documentKey: s.documentKey,
    description: t.trim()
  };
  s.propertyAlias?.trim() && (e.propertyAlias = s.propertyAlias.trim()), s.propertyKey?.trim() && (e.propertyKey = s.propertyKey.trim()), s.propertyLabel?.trim() && (e.propertyLabel = s.propertyLabel.trim()), await Qt.put({
    url: Gt,
    security: Ye,
    body: e,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
}
class Xe {
  #t = !1;
  #e;
  #i = 0;
  #s = 0;
  #r = 0;
  #n = 0;
  #o;
  #a;
  #l;
  #h;
  get isDragging() {
    return this.#t;
  }
  setup(t, e, i) {
    this.teardown(t, e), this.#h = i, e.addEventListener("pointerdown", this.#p);
  }
  teardown(t, e) {
    e.removeEventListener("pointerdown", this.#p), document.removeEventListener("pointermove", this.#c), document.removeEventListener("pointerup", this.#d), document.removeEventListener("pointercancel", this.#d), this.#l !== void 0 && (cancelAnimationFrame(this.#l), this.#l = void 0), t.classList.remove("neattip-dragging"), this.#o = void 0, this.#a = void 0, this.#e = void 0, this.#t = !1;
  }
  #p = (t) => {
    if (t.pointerType === "mouse" && t.button !== 0)
      return;
    const e = t.currentTarget.closest(".neattip-tooltip");
    if (!e || t.target?.closest("a, button, input, textarea, select"))
      return;
    t.preventDefault(), this.#o = e, this.#e = t.pointerId, this.#t = !0, this.#i = t.clientX, this.#s = t.clientY;
    const i = e.getBoundingClientRect();
    this.#r = i.top, this.#n = i.left, e.classList.add("neattip-dragging"), document.addEventListener("pointermove", this.#c), document.addEventListener("pointerup", this.#d), document.addEventListener("pointercancel", this.#d);
  };
  #c = (t) => {
    if (!this.#t || this.#e !== t.pointerId)
      return;
    const e = this.#o;
    if (!e)
      return;
    const i = t.clientX - this.#i, o = t.clientY - this.#s, r = {
      top: this.#r + o,
      left: this.#n + i
    }, n = Math.max(
      f.viewportMargin,
      window.innerHeight - e.offsetHeight - f.viewportMargin
    ), c = Math.max(
      f.viewportMargin,
      window.innerWidth - e.offsetWidth - f.viewportMargin
    );
    this.#a = {
      top: Math.max(f.viewportMargin, Math.min(r.top, n)),
      left: Math.max(f.viewportMargin, Math.min(r.left, c))
    }, this.#l === void 0 && (this.#l = requestAnimationFrame(() => {
      this.#l = void 0, this.#b();
    }));
  };
  #d = (t) => {
    if (this.#e !== t.pointerId)
      return;
    this.#b(), this.#o?.classList.remove("neattip-dragging"), this.#o = void 0, this.#a = void 0, this.#e = void 0, this.#t = !1, document.removeEventListener("pointermove", this.#c), document.removeEventListener("pointerup", this.#d), document.removeEventListener("pointercancel", this.#d);
  };
  #b() {
    const t = this.#o, e = this.#a;
    !t || !e || (t.style.top = `${e.top}px`, t.style.left = `${e.left}px`, this.#h?.(e));
  }
}
class Je {
  position(t, e, i = f.viewportMargin) {
    const o = e.getBoundingClientRect(), r = t.getBoundingClientRect();
    let n = o.bottom + 10, c = o.left + o.width / 2 - r.width / 2;
    const a = window.innerWidth - r.width - i;
    c = Math.max(i, Math.min(c, a));
    const p = n + r.height > window.innerHeight - i;
    t.classList.toggle("neattip-bottom", p), p && (n = o.top - r.height - 10), n = Math.max(i, n);
    const d = o.left + o.width / 2 - c;
    t.style.setProperty("--arrow-left", `${d}px`), t.style.top = `${n}px`, t.style.left = `${c}px`;
  }
  clampToViewport(t, e, i = 10) {
    const o = e.offsetWidth, r = e.offsetHeight;
    return {
      top: Math.max(i, Math.min(t.top, window.innerHeight - r - i)),
      left: Math.max(i, Math.min(t.left, window.innerWidth - o - i))
    };
  }
}
class Ze {
  #t;
  #e;
  #i;
  #s;
  #r;
  #n;
  #o = !1;
  #a = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  #l;
  #h = new Je();
  #p = new Xe();
  #c;
  constructor(t) {
    this.#c = t;
  }
  start() {
    document.addEventListener("click", this.#E, !0), document.addEventListener("keydown", this.#S), window.addEventListener("scroll", this.#f, !0), document.addEventListener("scroll", this.#f, !0), window.addEventListener("resize", this.#f), window.addEventListener("popstate", this.#g), window.addEventListener("hashchange", this.#g), this.#l = this.#c.subscribe(() => {
      this.#t && (this.#$(
        this.#t,
        this.#t.dataset.neattipCurrentMarkdown ?? ""
      ), this.#y(this.#t), this.#t.classList.contains("neattip-mode-edit") && !this.#c.canPerform("edit") && this.#m());
    });
  }
  stop() {
    this.hide(!0), clearTimeout(this.#r), clearTimeout(this.#n), this.#l?.(), this.#l = void 0, document.removeEventListener("click", this.#E, !0), document.removeEventListener("keydown", this.#S), window.removeEventListener("scroll", this.#f, !0), document.removeEventListener("scroll", this.#f, !0), window.removeEventListener("resize", this.#f), window.removeEventListener("popstate", this.#g), window.removeEventListener("hashchange", this.#g);
    const t = this.#t?.querySelector(".neattip-tooltip-header");
    this.#t && t && this.#p.teardown(this.#t, t), this.#t?.remove(), this.#t = void 0;
  }
  show(t, e, i = !1) {
    clearTimeout(this.#i), clearTimeout(this.#s), i && (this.#o = !0);
    const o = i || this.#a ? 0 : f.tooltipDelay;
    this.#i = setTimeout(() => {
      const r = this.#d();
      r.style.pointerEvents = "none", r.classList.remove("neattip-visible", "neattip-bottom"), r.style.maxWidth = `${f.tooltipMaxWidth}px`;
      const n = r.querySelector(".neattip-tooltip-content"), c = K(t), a = e.trim() || t.dataset.neattipMarkdown?.trim() || c?.dataset.neattipStoredDescription?.trim() || (c ? D(c) : "") || "", p = c ? At(c, a) : Me(a);
      n && (n.innerHTML = p), r.dataset.neattipCurrentMarkdown = a, this.#_(r, a), r.style.display = "block", r.offsetHeight;
      const d = t.dataset.neattipId ?? crypto.randomUUID();
      t.dataset.neattipId = d;
      const l = t.dataset.neattipPosition;
      if (this.#o && l) {
        const v = JSON.parse(l);
        r.style.top = `${v.top}px`, r.style.left = `${v.left}px`;
      } else
        this.#h.position(r, t);
      this.#b(r), r.classList.add("neattip-visible"), r.style.pointerEvents = "auto", this.#e = t, t.classList.toggle("neattip-active", this.#o);
    }, o);
  }
  hide(t = !1) {
    if (clearTimeout(this.#i), clearTimeout(this.#s), clearTimeout(this.#n), this.#o && !t)
      return;
    const e = this.#t;
    if (!e)
      return;
    this.#v(), this.#m();
    const i = e.querySelector(".neattip-tooltip-header");
    i && this.#p.teardown(e, i), e.classList.remove("neattip-visible", "neattip-bottom", "neattip-dragging"), e.style.pointerEvents = "none", e.style.display = "none", this.#e?.classList.remove("neattip-active"), this.#e = void 0, this.#o = !1, document.querySelectorAll("[data-neattip-position]").forEach((o) => {
      delete o.dataset.neattipPosition;
    });
  }
  scheduleHide() {
    clearTimeout(this.#s), this.#s = setTimeout(() => this.hide(!1), 100);
  }
  cancelScheduledHide() {
    clearTimeout(this.#s);
  }
  toggle(t, e) {
    if (this.#o && this.#e === t) {
      this.hide(!0);
      return;
    }
    this.hide(!0), this.show(t, e, !0);
  }
  isActiveIndicator(t) {
    return this.#e === t;
  }
  isToggled() {
    return this.#o;
  }
  #d() {
    if (this.#t)
      return this.#t;
    const t = document.createElement("div");
    return t.className = "neattip-tooltip", t.setAttribute("role", "tooltip"), t.innerHTML = `
      <div class="neattip-tooltip-header" aria-hidden="true"></div>
      <div class="neattip-tooltip-content"></div>
      <div class="neattip-tooltip-editor">
        <textarea class="neattip-editor-input" rows="5" aria-label="Helper text"></textarea>
      </div>
      <div class="neattip-tooltip-actions">
        <span class="neattip-copy-feedback" aria-live="polite"></span>
        <div class="neattip-more">
          <uui-button
            class="neattip-more-button"
            type="button"
            look="secondary"
            color="default"
            compact
            label="More actions"
            title="More actions"
            popovertarget="neattip-more-popover"
          >
            <uui-symbol-more></uui-symbol-more>
          </uui-button>
          <uui-popover-container
            id="neattip-more-popover"
            class="neattip-more-popover"
            placement="bottom-end"
            margin="4"
          >
            <umb-popover-layout class="neattip-more-popover-layout">
            </umb-popover-layout>
          </uui-popover-container>
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
    `, t.addEventListener("click", this.#x), t.addEventListener("click-label", this.#x), this.#y(t), document.body.appendChild(t), this.#t = t, t;
  }
  #b(t) {
    const e = t.querySelector(".neattip-tooltip-header");
    e && (this.#p.setup(t, e, (i) => {
      this.#e?.setAttribute("data-neattip-position", JSON.stringify(i));
    }), t.addEventListener("mouseenter", () => this.cancelScheduledHide()), t.addEventListener("mouseleave", () => {
      !this.#o && !this.#p.isDragging && this.scheduleHide();
    }));
  }
  #E = (t) => {
    const e = t.target;
    e instanceof Element && (e.closest(".neattip-indicator, .neattip-tooltip, .neattip-wrapper") || e.closest("neat-tip-indicator") || e.closest("#neattip-more-popover") || this.hide(!0));
  };
  #S = (t) => {
    if (t.key === "Escape") {
      if (this.#M()) {
        t.preventDefault(), this.#v();
        return;
      }
      if (this.#t?.classList.contains("neattip-mode-edit")) {
        t.preventDefault(), this.#m();
        return;
      }
      this.hide(!0);
    }
  };
  #f = () => {
    this.hide(!0);
  };
  #g = () => {
    this.hide(!0);
  };
  #x = (t) => {
    const e = t.target;
    if (!(e instanceof Element))
      return;
    const i = e.closest("[data-neattip-action]");
    if (!i)
      return;
    t.preventDefault(), t.stopPropagation();
    const o = i.dataset.neattipAction;
    if (!o)
      return;
    const r = o === "save" || o === "add" ? "edit" : o === "copy" || o === "edit" ? o : null;
    if (r && !this.#c.canPerform(r)) {
      this.#v();
      return;
    }
    switch (o) {
      case "copy":
        this.#v(), this.#T();
        break;
      case "edit":
        this.#v(), this.#L();
        break;
      case "add":
        this.#L();
        break;
      case "save":
        this.#C();
        break;
      case "cancel":
        this.#m();
        break;
    }
  };
  #_(t, e) {
    t.dataset.neattipCurrentMarkdown = e, this.#w(), this.#u("Save"), this.#m(), this.#$(t, e), this.#y(t);
  }
  #y(t) {
    const e = t.querySelector(".neattip-more-popover-layout");
    if (!e)
      return;
    e.setAttribute("role", "menu");
    const i = this.#c.getAllowedActions(), o = this.#P(t);
    e.replaceChildren();
    for (const a of i)
      o && a === "edit" || e.appendChild(this.#k(a));
    const r = t.querySelector(".neattip-more");
    r && (r.hidden = o || e.childElementCount === 0);
    const n = t.querySelector(".neattip-empty-action");
    n && n.classList.toggle(
      "neattip-editor-hidden",
      !o || !this.#c.canPerform("edit")
    );
    const c = t.querySelector(".neattip-copy-feedback");
    c && c.classList.toggle("neattip-editor-hidden", o);
  }
  #k(t) {
    const e = document.createElement("uui-menu-item");
    e.dataset.neattipAction = t, e.setAttribute("role", "menuitem"), e.setAttribute("tabindex", "0");
    const i = document.createElement("uui-icon");
    switch (i.setAttribute("slot", "icon"), t) {
      case "copy":
        e.setAttribute("label", "Copy"), i.setAttribute("name", "icon-documents");
        break;
      case "edit":
        e.setAttribute("label", "Edit"), i.setAttribute("name", "icon-edit");
        break;
    }
    return e.appendChild(i), e;
  }
  #T() {
    const t = this.#A();
    t && (navigator.clipboard?.writeText(t), this.#N());
  }
  #L() {
    if (!this.#c.canPerform("edit"))
      return;
    const t = this.#t;
    if (!t)
      return;
    const e = t.querySelector(".neattip-editor-input"), i = t.querySelector(".neattip-more"), o = t.querySelector(".neattip-empty-action"), r = t.querySelector("[data-neattip-action='save']"), n = t.querySelector("[data-neattip-action='cancel']");
    if (!e || !i || !o || !r || !n)
      return;
    const c = this.#A();
    t.dataset.neattipCurrentMarkdown = c, e.value = c, this.#w(), t.classList.add("neattip-mode-edit"), t.style.maxWidth = "420px", i.classList.add("neattip-editor-hidden"), o.classList.add("neattip-editor-hidden"), r.classList.remove("neattip-editor-hidden"), n.classList.remove("neattip-editor-hidden"), this.#u("Save"), e.disabled = !1, requestAnimationFrame(() => {
      e.value = c, e.focus(), e.setSelectionRange(e.value.length, e.value.length);
    });
  }
  #m() {
    const t = this.#t;
    if (!t)
      return;
    const e = t.querySelector(".neattip-more"), i = t.querySelector("[data-neattip-action='save']"), o = t.querySelector("[data-neattip-action='cancel']");
    if (!e || !i || !o)
      return;
    this.#v(), t.classList.remove("neattip-mode-edit"), e.classList.remove("neattip-editor-hidden"), i.classList.add("neattip-editor-hidden"), o.classList.add("neattip-editor-hidden");
    const r = t.querySelector(".neattip-editor-input");
    r && (r.value = this.#A(), r.disabled = !0), t.style.maxWidth = `${f.tooltipMaxWidth}px`, this.#$(t, t.dataset.neattipCurrentMarkdown ?? ""), this.#y(t);
  }
  async #C() {
    if (!this.#c.canPerform("edit")) {
      this.#m();
      return;
    }
    const t = this.#t, e = this.#e;
    if (!t || !e)
      return;
    const i = t.querySelector(".neattip-editor-input"), o = t.querySelector(".neattip-tooltip-content");
    if (!i || !o)
      return;
    const r = i.value.trim(), n = K(e);
    if (!n)
      return;
    const c = Ke.resolveUpdateTarget(n);
    if (!c) {
      this.#u("No target");
      return;
    }
    try {
      this.#u("Saving..."), await Ge(c, r);
    } catch {
      this.#u("Failed");
      return;
    }
    n.dataset.neattipStoredDescription = r, e.dataset.neattipMarkdown = r, t.dataset.neattipCurrentMarkdown = r, o.innerHTML = At(n, r), this.#u("Saved"), this.#D("✓ Saved", 1e3), this.#n = window.setTimeout(() => {
      this.#u("Save"), this.#_(t, r);
    }, 1e3);
  }
  #A() {
    const e = this.#t?.dataset.neattipCurrentMarkdown?.trim();
    if (e)
      return e;
    const i = this.#e;
    if (!i)
      return "";
    const o = K(i);
    return i.dataset.neattipMarkdown?.trim() || o?.dataset.neattipStoredDescription?.trim() || (o ? D(o) : "") || "";
  }
  #P(t) {
    return !t.dataset.neattipCurrentMarkdown?.trim();
  }
  #$(t, e) {
    const i = t.querySelector(".neattip-tooltip-content");
    if (!i)
      return;
    const o = !e.trim();
    if (t.classList.toggle("neattip-empty", o), !o)
      return;
    const r = this.#c.canPerform("edit") ? "No helper text yet." : "No helper text available.";
    i.innerHTML = `<p class="neattip-empty-state-message">${r}</p>`;
  }
  #u(t) {
    const e = this.#t?.querySelector("[data-neattip-action='save']");
    e && (e.setAttribute("label", t), e.setAttribute("title", t));
  }
  #M() {
    return !!this.#t?.querySelector("#neattip-more-popover")?.matches(":popover-open");
  }
  #v() {
    this.#t?.querySelector("#neattip-more-popover")?.hidePopover?.();
  }
  #N() {
    const t = this.#t?.querySelector(".neattip-copy-feedback");
    t && (clearTimeout(this.#r), t.textContent = "✓ Copied", t.classList.add("neattip-copy-feedback-visible"), this.#r = window.setTimeout(() => this.#w(), 1e3));
  }
  #w() {
    clearTimeout(this.#r);
    const t = this.#t?.querySelector(".neattip-copy-feedback");
    t && (t.classList.remove("neattip-copy-feedback-visible"), t.textContent = "");
  }
  #D(t, e) {
    const i = this.#t?.querySelector(".neattip-copy-feedback");
    i && (clearTimeout(this.#r), i.textContent = t, i.classList.add("neattip-copy-feedback-visible"), this.#r = window.setTimeout(() => this.#w(), e));
  }
}
const Qe = /\/document\/edit\//i, ti = /\/section\/content/i, ei = ["/section/settings", "/section/member", "/section/media"];
class ii {
  #t = /* @__PURE__ */ new Set();
  #e;
  #i;
  isContentEditingContext() {
    const t = window.location.pathname;
    return ei.some((e) => t.includes(e)) ? !1 : ti.test(t);
  }
  isDocumentContentEdit() {
    const t = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    return Qe.test(t);
  }
  shouldProcessElement(t) {
    return !this.isDocumentContentEdit() || oi(t) ? !1 : Xt(t) || si(t);
  }
  subscribeNavigation(t) {
    return this.#t.add(t), this.#t.size === 1 && this.#s(), () => {
      this.#t.delete(t), this.#t.size === 0 && this.#r();
    };
  }
  #s() {
    this.#e = history.pushState.bind(history), this.#i = history.replaceState.bind(history), history.pushState = (...t) => {
      this.#e(...t), this.#n();
    }, history.replaceState = (...t) => {
      this.#i(...t), this.#n();
    };
  }
  #r() {
    this.#e && (history.pushState = this.#e), this.#i && (history.replaceState = this.#i), this.#e = void 0, this.#i = void 0;
  }
  #n() {
    queueMicrotask(() => {
      this.#t.forEach((t) => t());
    });
    for (const t of [50, 150, 400, 800])
      window.setTimeout(() => {
        this.#t.forEach((e) => e());
      }, t);
  }
}
function oi(s) {
  let t = s;
  for (; t; ) {
    if (t instanceof Element && t.matches(Jt))
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
function si(s) {
  let t = s;
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
class ri {
  #t;
  #e = new ii();
  #i = new je();
  #s;
  #r = new Ce(this.#e);
  #n;
  #o;
  #a;
  #l;
  #h;
  #p = () => {
    this.#c();
  };
  constructor(t) {
    this.#t = new Zt(t), this.#t.setEditHelperTextAllowedSections(
      u.editHelperTextAllowedSections
    ), this.#s = new Ze(this.#t), this.#n = new ze(this.#e, this.#s), this.#o = new Fe(this.#e, this.#n);
  }
  /** Refresh section aliases from runtime settings (config-driven permissions). */
  syncPermissionsFromRuntime() {
    this.#t.setEditHelperTextAllowedSections(
      u.editHelperTextAllowedSections
    );
  }
  start() {
    this.#r.setLayoutDetectedHandler((t) => {
      this.#o.processLayout(t);
    }), this.#r.start(), this.#s.start(), this.#o.start(), this.#i.start(), this.#a = this.#e.subscribeNavigation(this.#p), this.#l = this.#i.subscribe(this.#p), window.addEventListener("popstate", this.#p), window.addEventListener("hashchange", this.#p), this.#d();
  }
  stop() {
    clearTimeout(this.#h), this.#h = void 0, this.#a?.(), this.#a = void 0, this.#l?.(), this.#l = void 0, window.removeEventListener("popstate", this.#p), window.removeEventListener("hashchange", this.#p), this.#i.stop(), this.#o.stop(), this.#s.stop(), this.#r.stop(), this.#t.destroy();
  }
  rescan() {
    u.enabled && (ke(), this.#r.scanAllLayouts(), this.#o.scanNow());
  }
  #c() {
    clearTimeout(this.#h), this.#h = window.setTimeout(() => {
      this.#h = void 0, this.#d();
    }, 100);
  }
  #d() {
    this.#s.hide(!0), !(!u.enabled || !this.#e.isDocumentContentEdit()) && (Te(), this.#r.start(), this.#o.scanNow());
  }
}
function J() {
  A().forEach((s) => {
    const t = g(s);
    t.querySelectorAll(".neattip-wrapper, neat-tip-indicator").forEach((e) => {
      e.remove();
    }), t.querySelectorAll("label, uui-label, #label").forEach((e) => {
      const i = e.dataset.originalTitle;
      i && (e.setAttribute("title", i), delete e.dataset.originalTitle);
    }), t.querySelectorAll(Z).forEach((e) => {
      e.classList.remove(m.hidden, m.keepVisible), e.style.visibility = "", e.style.display = "";
    }), s.classList.remove(
      m.processed,
      m.keepVisible
    ), t.querySelector("#neattip-flash-style")?.remove(), P(s), delete s.dataset.neattipStoredDescription;
  });
}
const ni = 'umb-property-layout [slot=description].neattip-keep-visible,umb-property-layout #description.neattip-keep-visible,umb-property-layout .property-description.neattip-keep-visible,umb-property-layout umb-ufm-render.neattip-keep-visible{visibility:visible!important;display:block!important}.neattip-hidden{display:none!important}.neattip-wrapper{display:inline-flex;align-items:center;isolation:isolate;margin-left:6px;vertical-align:middle}umb-property-layout neat-tip-indicator,umb-property-layout .neattip-indicator{flex-shrink:0}.neattip-tooltip{position:fixed;z-index:999999;display:none;opacity:0;transform:translateY(2px) scale(.985);transform-origin:center top;max-width:320px;padding:12px 12px 8px;border:1px solid var(--uui-color-border-standalone, #dbdbdb);border-radius:8px;background:var(--uui-color-surface, #fff);color:var(--uui-color-text, #262626);font-size:13px;line-height:1.5;box-shadow:0 8px 20px #0000001a;transition:opacity .15s ease,transform .15s ease;pointer-events:none}.neattip-tooltip.neattip-visible{display:block;opacity:1;transform:translateY(0) scale(1)}.neattip-tooltip:before,.neattip-tooltip:after{content:"";position:absolute;left:var(--arrow-left, 50%);transform:translate(-50%);border:8px solid transparent}.neattip-tooltip:before{top:-16px;border-bottom-color:var(--uui-color-border, #e0e0e0)}.neattip-tooltip:after{top:-15px;border-bottom-color:var(--uui-color-surface, #fff)}.neattip-tooltip.neattip-bottom:before{top:auto;bottom:-16px;border-bottom-color:transparent;border-top-color:var(--uui-color-border, #e0e0e0)}.neattip-tooltip.neattip-bottom:after{top:auto;bottom:-15px;border-bottom-color:transparent;border-top-color:var(--uui-color-surface, #fff)}.neattip-tooltip-header{height:16px;margin:-4px -4px 2px;cursor:grab;border-radius:4px 4px 2px 2px}.neattip-tooltip.neattip-dragging .neattip-tooltip-header{cursor:grabbing}.neattip-tooltip-content strong{font-weight:600}.neattip-tooltip-content{padding:4px 2px;color:inherit;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word}.neattip-tooltip.neattip-empty .neattip-tooltip-content{color:var(--uui-color-text-alt, #6f6f6f)}.neattip-empty-state-message{margin:0;font-size:12px;line-height:1.4}.neattip-tooltip-editor{display:none;margin-top:6px}.neattip-editor-hidden{display:none!important}.neattip-editor-input{display:block;box-sizing:border-box;width:100%;min-height:180px;border:1px solid var(--uui-color-border-emphasis, #bfbfbf);border-radius:var(--uui-border-radius, 3px);background:var(--uui-color-surface, #fff);color:inherit;font:inherit;line-height:1.5;padding:10px;resize:vertical;outline:none}.neattip-editor-input:focus{border-color:var(--uui-color-focus, #3550b8);box-shadow:0 0 0 1px #3550b840}.neattip-tooltip-actions{display:flex;gap:var(--uui-size-space-2, 6px);justify-content:flex-end;align-items:center;margin-top:8px;min-height:28px}.neattip-more{display:inline-flex;--uui-menu-item-flat-structure: 1;align-items:center}.neattip-more-button{--uui-button-height: 28px;--uui-button-border-radius: var(--uui-border-radius, 3px);--uui-button-padding-left-factor: 1;--uui-button-padding-right-factor: 1}.neattip-more-button:hover{--uui-button-background-color: var(--uui-color-surface-emphasis, #f3f3f3)}.neattip-more-button:focus-visible{outline:2px solid var(--uui-color-focus, #3550b8);outline-offset:2px}.neattip-more-popover{min-width:150px;z-index:1000000}.neattip-more-popover-layout{background:var(--uui-color-surface, #fff);border:1px solid var(--uui-color-border-standalone, #d8d8d8);border-radius:var(--uui-border-radius, 3px);box-shadow:var(--uui-shadow-depth-3, 0 8px 16px rgba(0, 0, 0, .1));overflow:hidden;padding:2px}.neattip-more-popover-layout uui-menu-item{--uui-menu-item-padding-left: 8px;--uui-menu-item-padding-right: 8px;--uui-menu-item-padding-top: 6px;--uui-menu-item-padding-bottom: 6px;border-radius:3px}.neattip-more-popover-layout uui-menu-item:focus-visible{outline:2px solid var(--uui-color-focus, #3550b8);outline-offset:-2px}.neattip-tooltip.neattip-mode-edit .neattip-tooltip-content{display:none}.neattip-tooltip.neattip-mode-edit .neattip-tooltip-editor{display:block}.neattip-tooltip.neattip-mode-edit{width:min(420px,calc(100vw - 32px))}.neattip-editor-action,.neattip-empty-action{--uui-button-height: 28px}.neattip-copy-feedback{margin-right:auto;min-height:1em;font-size:12px;line-height:1;color:var(--uui-color-positive, #2f7d32);opacity:0;transform:translateY(2px);transition:opacity .14s ease,transform .14s ease;pointer-events:none}.neattip-copy-feedback-visible{opacity:1;transform:translateY(0)}.neattip-tooltip-content *{color:inherit}.neattip-tooltip-content a,.neattip-tooltip-content .neattip-link{color:var(--uui-color-interactive, #007acc);text-decoration:underline;overflow-wrap:anywhere;word-break:break-word}.neattip-tooltip-content ul,.neattip-tooltip-content ol{margin:.5em 0;padding-left:1.5em}.neattip-tooltip-content p{margin:.5em 0}.neattip-tooltip-content p:first-child{margin-top:0}.neattip-tooltip-content p:last-child{margin-bottom:0}.neattip-tooltip-content code{background:var(--uui-color-background, #f4f4f4);padding:1px 4px;border-radius:3px;font-size:12px}.neattip-tooltip-content pre{background:var(--uui-color-background, #f4f4f4);padding:8px;border-radius:4px;overflow-x:auto;font-size:12px}.umb-block-list__block .neattip-indicator,.umb-block-grid__block .neattip-indicator,.umb-block-list__block neat-tip-indicator,.umb-block-grid__block neat-tip-indicator{width:12px;height:12px;font-size:9px}@media(max-width:768px){.neattip-tooltip{max-width:calc(100vw - 40px)}}@media(max-width:480px){.neattip-tooltip{font-size:12px;padding:10px 12px 8px}}@media(prefers-reduced-motion:reduce){.neattip-tooltip,.neattip-tooltip-content,.neattip-tooltip-editor,.neattip-copy-feedback{transition:none}}@media(prefers-contrast:high){.neattip-tooltip{border-width:2px;box-shadow:none}}@media print{.neattip-wrapper,.neattip-indicator,neat-tip-indicator,.neattip-tooltip{display:none!important}.neattip-hidden{display:block!important}}';
let W, b, E;
function ai() {
  E || (E = document.createElement("style"), E.id = "neattip-styles", E.textContent = ni, document.head.appendChild(E));
}
function ci() {
  E?.remove(), E = void 0;
}
function zt() {
  !u.enabled || !W || (b ? b.syncPermissionsFromRuntime() : (b = new ri(W), b.start()));
}
function rt() {
  b?.stop(), b = void 0;
}
async function li() {
  try {
    await Wt();
  } catch {
    u.settingsLoaded = !0;
  }
  if (u.enabled) {
    zt(), b?.syncPermissionsFromRuntime(), b?.rescan();
    return;
  }
  rt(), J();
}
const Ft = () => {
  if (u.enabled) {
    J(), zt(), b?.syncPermissionsFromRuntime(), b?.rescan();
    return;
  }
  rt(), J();
}, mi = (s) => {
  W = s, ai(), li(), window.addEventListener(Lt, Ft);
}, vi = () => {
  window.removeEventListener(Lt, Ft), rt(), ci(), W = void 0;
};
export {
  mi as onInit,
  vi as onUnload
};
//# sourceMappingURL=entrypoint-DZkeWQ9y.js.map
