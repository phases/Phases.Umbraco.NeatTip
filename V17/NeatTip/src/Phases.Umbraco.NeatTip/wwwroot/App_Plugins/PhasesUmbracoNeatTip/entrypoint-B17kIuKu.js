import { N as b, n as f, a as Ie, l as ae } from "./neattip-settings-api.service-IaGuUkdg.js";
import { N as He, a as qe, b as ce } from "./bundle.manifests-_iprUSr9.js";
import { umbHttpClient as le } from "@umbraco-cms/backoffice/http-client";
import { UmbControllerBase as Ue } from "@umbraco-cms/backoffice/class-api";
import { UMB_VARIANT_CONTEXT as Ke } from "@umbraco-cms/backoffice/variant";
const Y = globalThis, _t = Y.ShadowRoot && (Y.ShadyCSS === void 0 || Y.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $t = /* @__PURE__ */ Symbol(), Kt = /* @__PURE__ */ new WeakMap();
let pe = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== $t) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (_t && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Kt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Kt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Be = (n) => new pe(typeof n == "string" ? n : n + "", void 0, $t), Fe = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, o, s) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + n[s + 1], n[0]);
  return new pe(e, n, $t);
}, je = (n, t) => {
  if (_t) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = Y.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, n.appendChild(i);
  }
}, Bt = _t ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Be(e);
})(n) : n;
const { is: ze, defineProperty: Ve, getOwnPropertyDescriptor: We, getOwnPropertyNames: Ye, getOwnPropertySymbols: Ge, getPrototypeOf: Je } = Object, st = globalThis, Ft = st.trustedTypes, Xe = Ft ? Ft.emptyScript : "", Ze = st.reactiveElementPolyfillSupport, U = (n, t) => n, mt = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Xe : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, de = (n, t) => !ze(n, t), jt = { attribute: !0, type: String, converter: mt, reflect: !1, useDefault: !1, hasChanged: de };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), st.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let x = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = jt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && Ve(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: s } = We(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: o, set(r) {
      const c = o?.call(this);
      s?.call(this, r), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? jt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const t = Je(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const e = this.properties, i = [...Ye(e), ...Ge(e)];
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
      for (const o of i) e.unshift(Bt(o));
    } else t !== void 0 && e.push(Bt(t));
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
    return je(t, this.constructor.elementStyles), t;
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
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : mt).toAttribute(e, i.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = i.getPropertyOptions(o), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : mt;
      this._$Em = o;
      const c = r.fromAttribute(e, s.type);
      this[o] = c ?? this._$Ej?.get(o) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, s) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? de)(s, e) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: o, wrapped: s }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), s !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, s] of i) {
        const { wrapped: r } = s, c = this[o];
        r !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, s, c);
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
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[U("elementProperties")] = /* @__PURE__ */ new Map(), x[U("finalized")] = /* @__PURE__ */ new Map(), Ze?.({ ReactiveElement: x }), (st.reactiveElementVersions ??= []).push("2.1.2");
const xt = globalThis, zt = (n) => n, G = xt.trustedTypes, Vt = G ? G.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ue = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, he = "?" + S, Qe = `<${he}>`, _ = document, B = () => _.createComment(""), F = (n) => n === null || typeof n != "object" && typeof n != "function", kt = Array.isArray, ti = (n) => kt(n) || typeof n?.[Symbol.iterator] == "function", lt = `[ 	
\f\r]`, I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Wt = /-->/g, Yt = />/g, L = RegExp(`>|${lt}(?:([^\\s"'>=/]+)(${lt}*=${lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Gt = /'/g, Jt = /"/g, fe = /^(?:script|style|textarea|title)$/i, ei = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), ii = ei(1), D = /* @__PURE__ */ Symbol.for("lit-noChange"), v = /* @__PURE__ */ Symbol.for("lit-nothing"), Xt = /* @__PURE__ */ new WeakMap(), C = _.createTreeWalker(_, 129);
function me(n, t) {
  if (!kt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Vt !== void 0 ? Vt.createHTML(t) : t;
}
const ni = (n, t) => {
  const e = n.length - 1, i = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = I;
  for (let c = 0; c < e; c++) {
    const a = n[c];
    let p, d, l = -1, h = 0;
    for (; h < a.length && (r.lastIndex = h, d = r.exec(a), d !== null); ) h = r.lastIndex, r === I ? d[1] === "!--" ? r = Wt : d[1] !== void 0 ? r = Yt : d[2] !== void 0 ? (fe.test(d[2]) && (o = RegExp("</" + d[2], "g")), r = L) : d[3] !== void 0 && (r = L) : r === L ? d[0] === ">" ? (r = o ?? I, l = -1) : d[1] === void 0 ? l = -2 : (l = r.lastIndex - d[2].length, p = d[1], r = d[3] === void 0 ? L : d[3] === '"' ? Jt : Gt) : r === Jt || r === Gt ? r = L : r === Wt || r === Yt ? r = I : (r = L, o = void 0);
    const m = r === L && n[c + 1].startsWith("/>") ? " " : "";
    s += r === I ? a + Qe : l >= 0 ? (i.push(p), a.slice(0, l) + ue + a.slice(l) + S + m) : a + S + (l === -2 ? c : m);
  }
  return [me(n, s + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class j {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const c = t.length - 1, a = this.parts, [p, d] = ni(t, e);
    if (this.el = j.createElement(p, i), C.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (o = C.nextNode()) !== null && a.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const l of o.getAttributeNames()) if (l.endsWith(ue)) {
          const h = d[r++], m = o.getAttribute(l).split(S), $ = /([.?@])?(.*)/.exec(h);
          a.push({ type: 1, index: s, name: $[2], strings: m, ctor: $[1] === "." ? si : $[1] === "?" ? ri : $[1] === "@" ? ai : rt }), o.removeAttribute(l);
        } else l.startsWith(S) && (a.push({ type: 6, index: s }), o.removeAttribute(l));
        if (fe.test(o.tagName)) {
          const l = o.textContent.split(S), h = l.length - 1;
          if (h > 0) {
            o.textContent = G ? G.emptyScript : "";
            for (let m = 0; m < h; m++) o.append(l[m], B()), C.nextNode(), a.push({ type: 2, index: ++s });
            o.append(l[h], B());
          }
        }
      } else if (o.nodeType === 8) if (o.data === he) a.push({ type: 2, index: s });
      else {
        let l = -1;
        for (; (l = o.data.indexOf(S, l + 1)) !== -1; ) a.push({ type: 7, index: s }), l += S.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const i = _.createElement("template");
    return i.innerHTML = t, i;
  }
}
function R(n, t, e = n, i) {
  if (t === D) return t;
  let o = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const s = F(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(n), o._$AT(n, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = o : e._$Cl = o), o !== void 0 && (t = R(n, o._$AS(n, t.values), o, i)), t;
}
class oi {
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
    const { el: { content: e }, parts: i } = this._$AD, o = (t?.creationScope ?? _).importNode(e, !0);
    C.currentNode = o;
    let s = C.nextNode(), r = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let p;
        a.type === 2 ? p = new V(s, s.nextSibling, this, t) : a.type === 1 ? p = new a.ctor(s, a.name, a.strings, this, t) : a.type === 6 && (p = new ci(s, this, t)), this._$AV.push(p), a = i[++c];
      }
      r !== a?.index && (s = C.nextNode(), r++);
    }
    return C.currentNode = _, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class V {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, o) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = R(this, t, e), F(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== D && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ti(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== v && F(this._$AH) ? this._$AA.nextSibling.data = t : this.T(_.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = j.createElement(me(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const s = new oi(o, this), r = s.u(this.options);
      s.p(e), this.T(r), this._$AH = s;
    }
  }
  _$AC(t) {
    let e = Xt.get(t.strings);
    return e === void 0 && Xt.set(t.strings, e = new j(t)), e;
  }
  k(t) {
    kt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const s of t) o === e.length ? e.push(i = new V(this.O(B()), this.O(B()), this, this.options)) : i = e[o], i._$AI(s), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = zt(t).nextSibling;
      zt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class rt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, o, s) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = v;
  }
  _$AI(t, e = this, i, o) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) t = R(this, t, e, 0), r = !F(t) || t !== this._$AH && t !== D, r && (this._$AH = t);
    else {
      const c = t;
      let a, p;
      for (t = s[0], a = 0; a < s.length - 1; a++) p = R(this, c[i + a], e, a), p === D && (p = this._$AH[a]), r ||= !F(p) || p !== this._$AH[a], p === v ? t = v : t !== v && (t += (p ?? "") + s[a + 1]), this._$AH[a] = p;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class si extends rt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
class ri extends rt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== v);
  }
}
class ai extends rt {
  constructor(t, e, i, o, s) {
    super(t, e, i, o, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = R(this, t, e, 0) ?? v) === D) return;
    const i = this._$AH, o = t === v && i !== v || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== v && (i === v || o);
    o && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ci {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    R(this, t);
  }
}
const li = xt.litHtmlPolyfillSupport;
li?.(j, V), (xt.litHtmlVersions ??= []).push("3.3.3");
const pi = (n, t, e) => {
  const i = e?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = e?.renderBefore ?? null;
    i._$litPart$ = o = new V(t.insertBefore(B(), s), s, void 0, e ?? {});
  }
  return o._$AI(n), o;
};
const Pt = globalThis;
class K extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = pi(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return D;
  }
}
K._$litElement$ = !0, K.finalized = !0, Pt.litElementHydrateSupport?.({ LitElement: K });
const di = Pt.litElementPolyfillSupport;
di?.({ LitElement: K });
(Pt.litElementVersions ??= []).push("4.2.2");
const ui = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
var hi = Object.getOwnPropertyDescriptor, fi = (n, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? hi(t, e) : t, s = n.length - 1, r; s >= 0; s--)
    (r = n[s]) && (o = r(o) || o);
  return o;
};
let yt = class extends K {
  render() {
    return ii`
      <uui-icon name="icon-info"></uui-icon>
      <slot></slot>
    `;
  }
};
yt.styles = Fe`
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
        color ${b.fadeSpeed}ms ease,
        opacity ${b.fadeSpeed}ms ease,
        transform ${b.fadeSpeed}ms ease;
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
yt = fi([
  ui("neat-tip-indicator")
], yt);
const u = {
  processed: "neattip-processed",
  hidden: "neattip-hidden",
  keepVisible: "neattip-keep-visible",
  wrapper: "neattip-wrapper"
}, E = [
  "#description",
  '[slot="description"]',
  ".property-description",
  "umb-ufm-render"
].join(", "), z = [
  "#label",
  "uui-label",
  '[slot="label"]',
  "label",
  ".umb-property-editor__label",
  ".control-label"
].join(", "), mi = [
  ".umb-block-list__content-title",
  ".umb-block-grid__content-title"
].join(", "), yi = [
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
].join(", "), vi = [
  "umb-property-type-workspace",
  "umb-document-type-workspace",
  "umb-data-type-workspace",
  "umb-member-type-workspace",
  "umb-media-type-workspace"
].join(", "), Zt = ".mini-rollback-icon", ye = "neattip://cultures/";
function ve(n) {
  return !!n?.startsWith(ye);
}
function Nt(n) {
  if (!ve(n))
    return {};
  try {
    const t = n.slice(ye.length), e = JSON.parse(t);
    return !e || typeof e != "object" ? {} : Object.fromEntries(
      Object.entries(e).filter(([, i]) => i?.trim())
    );
  } catch {
    return {};
  }
}
function bi(n, t) {
  const e = n?.trim() ?? "";
  if (!e)
    return "";
  const i = Nt(e);
  if (Object.keys(i).length === 0)
    return e;
  const s = t?.activeCulture;
  if (s !== void 0) {
    const a = Qt(i, s);
    if (a)
      return a;
  }
  const r = t?.fallbackCulture;
  if (r !== void 0 && g(r) !== g(s)) {
    const a = Qt(i, r);
    if (a)
      return a;
  }
  return Object.values(i).find((a) => a?.trim())?.trim() ?? "";
}
function Qt(n, t) {
  const e = g(t), i = n[e]?.trim();
  return i || (e === g(null) ? "" : Object.entries(n).find(
    ([s]) => s.toLowerCase() === e.toLowerCase()
  )?.[1]?.trim() ?? "");
}
function be(n, t) {
  const e = Nt(t);
  if (Object.keys(e).length === 0)
    return;
  const i = n.dataset.neattipCultureDescriptions;
  let o = e;
  if (i)
    try {
      const s = JSON.parse(i);
      o = { ...e, ...s };
    } catch {
      o = e;
    }
  n.dataset.neattipCultureDescriptions = JSON.stringify(o);
}
const vt = "neattipCultureDescriptions", bt = "neattipOriginalDescription", ge = "__invariant__";
function g(n) {
  const t = n?.trim();
  return t || ge;
}
function O(n) {
  const t = n.dataset[vt];
  if (!t)
    return {};
  try {
    const e = JSON.parse(t);
    return typeof e == "object" && e ? e : {};
  } catch {
    return {};
  }
}
function we(n, t) {
  const e = Object.entries(t).filter(([, i]) => i.trim());
  if (e.length === 0) {
    delete n.dataset[vt];
    return;
  }
  n.dataset[vt] = JSON.stringify(Object.fromEntries(e));
}
function gt(n, t) {
  const e = O(n), i = g(t), o = e[i]?.trim();
  return o || (i === ge ? void 0 : Object.entries(e).find(
    ([r]) => r.toLowerCase() === i.toLowerCase()
  )?.[1]?.trim() || void 0);
}
function Dt(n, t, e) {
  const i = g(t), o = O(n), s = e.trim();
  s ? o[i] = s : delete o[i], we(n, o);
}
function J(n) {
  if (n.dataset[bt]?.trim() || Object.keys(O(n)).length > 0)
    return;
  const e = n.description?.trim() || n.getAttribute("description")?.trim() || n.dataset.neattipStoredDescription?.trim();
  e && (n.dataset[bt] = e, be(n, e));
}
function gi(n) {
  return n.dataset[bt]?.trim() ?? "";
}
const wi = /\/document\/edit\/([^/?#]+)/i, Ai = /\/document\/edit\/[^/?#]+\/([a-z]{2}(?:-[a-z]{2})?)\b/i;
function X(n = `${window.location.pathname}${window.location.search}${window.location.hash}`) {
  return n.match(wi)?.[1]?.trim() || void 0;
}
function Si(n = `${window.location.pathname}${window.location.search}${window.location.hash}`) {
  return n.match(Ai)?.[1]?.trim() || void 0;
}
function w(n = document.body) {
  const t = [], e = /* @__PURE__ */ new Set(), i = (o) => {
    o instanceof HTMLElement && (o.tagName === "UMB-PROPERTY-LAYOUT" && !e.has(o) && (e.add(o), t.push(o)), o.shadowRoot && i(o.shadowRoot)), o.childNodes.forEach(i);
  };
  return i(n), t;
}
function Ei(n) {
  let t = n;
  for (; t; ) {
    if (t instanceof Element && t.matches(yi))
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
function y(n) {
  return n.shadowRoot ?? n;
}
const te = "neattip.description.overrides.v1";
class Li {
  resolveUpdateTarget(t) {
    const e = X();
    if (!e)
      return;
    const i = this.resolvePropertyIdentity(t);
    if (!(!i?.propertyAlias && !i?.propertyKey && !i?.propertyLabel))
      return {
        documentKey: e,
        contentTypeKey: i.contentTypeKey,
        propertyAlias: i.propertyAlias,
        propertyKey: i.propertyKey,
        propertyLabel: i.propertyLabel
      };
  }
  resolvePropertyIdentity(t) {
    const e = W(
      t,
      "umb-property, umb-content-workspace-property"
    ), i = this.#n(t), o = this.#s(t), s = this.#e(t, e), r = this.#o(t, e), c = this.#a(t), a = this.#r(t);
    if (!(!s && !r && !c))
      return {
        contentTypeKey: i,
        blockContentTypeName: o,
        propertyAlias: s,
        propertyKey: r,
        propertyLabel: c,
        isElementPropertyContext: a
      };
  }
  get(t) {
    const e = this.#t(t);
    if (!e)
      return;
    const o = this.#c()[e]?.trim();
    return o || void 0;
  }
  set(t, e) {
    const i = this.#t(t);
    if (!i)
      return !1;
    const o = e.trim();
    if (!o)
      return !1;
    const s = this.#c();
    return s[i] = o, this.#p(s), !0;
  }
  #t(t) {
    const e = X(), i = this.#i(t);
    if (!(!e || !i))
      return `${e}::${i}`;
  }
  #i(t) {
    const e = W(t, "umb-property, umb-content-workspace-property"), i = this.#e(t, e);
    if (i)
      return i.toLowerCase();
    const o = this.#o(t, e);
    if (o)
      return `key:${o.toLowerCase()}`;
    const r = y(t).querySelector(z)?.textContent?.trim();
    return r ? `label:${r.toLowerCase()}` : void 0;
  }
  #e(t, e) {
    const i = ie(t, "alias");
    if (i)
      return i;
    const o = Ti(e, "alias");
    if (o)
      return o;
    const s = t.getAttribute("property-alias") || t.getAttribute("data-property-alias") || t.getAttribute("data-alias") || t.getAttribute("propertyAlias") || t.getAttribute("name");
    if (s?.trim())
      return s.trim();
    const r = e?.getAttribute("alias") || e?.getAttribute("property-alias") || e?.getAttribute("data-property-alias") || e?.getAttribute("data-alias") || e?.getAttribute("propertyAlias") || e?.getAttribute("name");
    if (r?.trim())
      return r.trim();
    const a = y(t).querySelector(
      "[property-alias], [data-property-alias], [data-alias], [propertyAlias]"
    );
    return (a?.getAttribute("property-alias") || a?.getAttribute("data-property-alias") || a?.getAttribute("data-alias") || a?.getAttribute("propertyAlias"))?.trim() || void 0;
  }
  #n(t) {
    let e = t;
    for (; e; ) {
      if (e instanceof Element) {
        const o = e.getAttribute("data-content-element-type-key") || (e instanceof HTMLElement ? e.dataset.contentElementTypeKey : void 0);
        if (o?.trim() && ee(o.trim()))
          return o.trim();
      }
      if (e instanceof Element && e.assignedSlot) {
        e = e.assignedSlot;
        continue;
      }
      if (e.parentNode) {
        e = e.parentNode;
        continue;
      }
      const i = e.getRootNode();
      e = i instanceof ShadowRoot ? i.host : null;
    }
  }
  #s(t) {
    const e = W(
      t,
      "umb-block-workspace-editor, umb-block-workspace-view-edit"
    );
    return e && e.querySelector("#headline")?.textContent?.trim() || void 0;
  }
  #r(t) {
    return !!W(
      t,
      "umb-block-workspace-editor, umb-block-workspace-view-edit, umb-block-workspace-view-edit-property"
    );
  }
  #o(t, e) {
    const i = [
      e?.getAttribute("key"),
      e?.getAttribute("data-key"),
      e?.getAttribute("property-key"),
      t.getAttribute("key"),
      t.getAttribute("data-key"),
      t.getAttribute("property-key")
    ];
    for (const o of i) {
      const s = o?.trim();
      if (s && ee(s))
        return s;
    }
  }
  #a(t) {
    const i = y(t).querySelector(z)?.textContent?.trim();
    return i || ie(t, "label");
  }
  #c() {
    try {
      const t = localStorage.getItem(te);
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
      localStorage.setItem(te, JSON.stringify(t));
    } catch {
    }
  }
}
function W(n, t) {
  let e = n;
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
function ee(n) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(n);
}
function ie(n, t) {
  const i = n[t]?.trim();
  return i || n.getAttribute(t)?.trim() || void 0;
}
function Ti(n, t) {
  if (!n)
    return;
  const e = n, i = typeof e[t] == "string" ? e[t].trim() : "";
  return i || n.getAttribute(t)?.trim() || void 0;
}
const Ae = new Li(), Ci = [{ scheme: "bearer", type: "http" }];
async function _i(n) {
  const e = (await le.get({
    url: He,
    security: Ci,
    query: {
      documentKey: n
    },
    headers: {
      Accept: "application/json"
    }
  })).data;
  return {
    contentTypeAlias: e?.contentTypeAlias ?? "",
    contentTypeKey: $i(e?.contentTypeKey),
    defaultCulture: e?.defaultCulture,
    properties: e?.properties ?? []
  };
}
function $i(n) {
  return typeof n == "string" ? n.trim() : n != null ? String(n).trim() : "";
}
const Se = "neattipPropertyDescriptionFallback";
class xi {
  #t;
  #i;
  #e;
  #n;
  getDefaultCulture() {
    return this.#n;
  }
  resolveContentTypeKeyByName(t) {
    if (!(!this.#t || !t?.trim()))
      return this.#t.contentTypeKeyByName.get(t.trim().toLowerCase());
  }
  async ensureLoaded(t = X()) {
    t && (this.#i === t && this.#t || this.#e && (await this.#e, this.#i === t && this.#t) || (this.#e = this.#s(t).finally(() => {
      this.#e = void 0;
    }), await this.#e));
  }
  invalidate() {
    this.#t = void 0, this.#i = void 0, this.#e = void 0, this.#n = void 0;
  }
  applyToLayout(t) {
    const e = this.#r(t);
    if (!e)
      return;
    Object.keys(e.cultureMap).length > 0 && we(t, e.cultureMap);
    const i = e.propertyDescription?.trim();
    if (i) {
      t.dataset[Se] = i;
      const o = t.dataset.neattipOriginalDescription?.trim(), s = Object.keys(e.cultureMap).length > 0;
      (!o || !ve(o)) && !s && (t.dataset.neattipOriginalDescription = i);
    }
  }
  updateFromSave(t, e, i, o = "", s) {
    if (!this.#t)
      return;
    const r = this.#o(
      t,
      e,
      void 0,
      s
    ), c = {
      contentTypeKey: s ?? r?.contentTypeKey ?? "",
      contentTypeName: r?.contentTypeName ?? "",
      propertyAlias: t ?? r?.propertyAlias ?? "",
      propertyName: r?.propertyName ?? "",
      propertyKey: e ?? r?.propertyKey ?? "",
      propertyDescription: o || r?.propertyDescription || "",
      cultureMap: { ...r?.cultureMap ?? {}, ...i }
    };
    this.#c(c);
  }
  async #s(t) {
    const e = await _i(t), i = T(e.contentTypeKey).toLowerCase(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
    for (const l of e.properties) {
      const h = ki(l), m = !!i && h.contentTypeKey.toLowerCase() === i;
      this.#p(
        h,
        c,
        a,
        p,
        d,
        o,
        m ? s : void 0,
        m ? r : void 0
      );
    }
    this.#t = {
      documentContentTypeKey: i,
      contentTypeKeyByName: o,
      documentPropertiesByAlias: s,
      documentPropertiesByLabel: r,
      propertiesByAlias: c,
      propertiesByKey: a,
      propertiesByLabel: p,
      propertiesByContentTypeAndAlias: d
    }, this.#i = t, this.#n = e.defaultCulture?.trim() || void 0;
  }
  #r(t) {
    if (!this.#t)
      return;
    const e = Ae.resolvePropertyIdentity(t), i = e?.contentTypeKey || this.resolveContentTypeKeyByName(e?.blockContentTypeName);
    return this.#o(
      e?.propertyAlias,
      e?.propertyKey,
      e?.propertyLabel,
      i,
      e?.isElementPropertyContext === !0
    );
  }
  #o(t, e, i, o, s = !1) {
    if (!this.#t)
      return;
    const r = T(e).toLowerCase();
    if (r) {
      const d = this.#t.propertiesByKey.get(r);
      if (d)
        return d;
    }
    const c = T(o).toLowerCase(), a = t?.trim().toLowerCase(), p = i?.trim().toLowerCase();
    if (c && a) {
      const d = this.#t.propertiesByContentTypeAndAlias.get(
        `${c}:${a}`
      );
      if (d)
        return d;
    }
    if (!c && a && !s) {
      const d = this.#t.documentPropertiesByAlias.get(a);
      if (d)
        return d;
    }
    if (!c && p && !s) {
      const d = this.#t.documentPropertiesByLabel.get(p);
      if (d)
        return d;
    }
    if (a) {
      const d = this.#t.propertiesByAlias.get(a), l = this.#a(
        d,
        i,
        c || void 0
      );
      if (l)
        return l;
    }
    if (p) {
      const d = this.#t.propertiesByLabel.get(p);
      return this.#a(
        d,
        i,
        c || void 0
      );
    }
  }
  #a(t, e, i) {
    if (!t?.length)
      return;
    if (i) {
      const c = t.filter(
        (a) => a.contentTypeKey.toLowerCase() === i
      );
      if (c.length === 1)
        return c[0];
    }
    if (t.length === 1)
      return t[0];
    const o = e?.trim();
    if (!o)
      return;
    const s = t.filter(
      (c) => c.contentTypeName?.toLowerCase() === o.toLowerCase()
    );
    if (s.length === 1)
      return s[0];
    const r = t.filter(
      (c) => c.propertyName?.toLowerCase() === o.toLowerCase()
    );
    if (r.length === 1)
      return r[0];
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
  #p(t, e, i, o, s, r, c, a) {
    if (t.propertyAlias) {
      const l = t.propertyAlias.toLowerCase(), h = e.get(l) ?? [];
      h.some((m) => m.propertyKey === t.propertyKey) || (h.push(t), e.set(l, h)), c?.set(l, t);
    }
    const p = T(t.propertyKey).toLowerCase();
    if (p && i.set(p, t), t.propertyName) {
      const l = t.propertyName.toLowerCase(), h = o.get(l) ?? [];
      h.some((m) => m.propertyKey === t.propertyKey) || (h.push(t), o.set(l, h)), a?.set(l, t);
    }
    const d = T(t.contentTypeKey).toLowerCase();
    if (d && t.propertyAlias) {
      const l = `${d}:${t.propertyAlias.toLowerCase()}`;
      s.set(l, t);
    }
    t.contentTypeName && d && r.set(t.contentTypeName.toLowerCase(), d);
  }
}
function ki(n) {
  return {
    contentTypeKey: T(n.contentTypeKey),
    contentTypeName: n.contentTypeName?.trim() ?? "",
    propertyAlias: n.propertyAlias?.trim() ?? "",
    propertyName: n.propertyName?.trim() ?? "",
    propertyKey: T(n.propertyKey),
    propertyDescription: n.propertyDescription?.trim() ?? "",
    cultureMap: n.cultureMap ?? {}
  };
}
function T(n) {
  return typeof n == "string" ? n.trim() : n != null ? String(n).trim() : "";
}
const M = new xi();
function Pi(n) {
  return n.dataset[Se]?.trim() || void 0;
}
class Ni {
  placeIndicator(t, e) {
    const i = y(t);
    if (i.querySelector(".neattip-wrapper, neat-tip-indicator"))
      return !1;
    const o = document.createElement("span");
    return o.className = u.wrapper, o.appendChild(e), this.#r(i), this.#t(i, o) || this.#i(i, o) || this.#e(t, o) || this.#n(t, o) ? !0 : this.#s(i, o);
  }
  #t(t, e) {
    const i = t.querySelector(z);
    if (!i)
      return !1;
    const o = i.querySelector(Zt);
    return o?.parentElement ? (o.insertAdjacentElement("afterend", e), e.style.marginLeft = "8px", !0) : (i.insertAdjacentElement("afterend", e), e.style.marginLeft = "8px", !0);
  }
  #i(t, e) {
    const i = t.querySelector(
      ".umb-property-editor__label, .control-label, [slot='label'], #headerColumn"
    );
    if (!i)
      return !1;
    const o = i.querySelector(Zt);
    if (o?.parentElement)
      return o.insertAdjacentElement("afterend", e), e.style.marginLeft = "8px", !0;
    const s = i.querySelector(z);
    return s ? (s.insertAdjacentElement("afterend", e), e.style.marginLeft = "8px", !0) : (i.appendChild(e), !0);
  }
  #e(t, e) {
    let i = t;
    for (; i; ) {
      if (i instanceof ShadowRoot) {
        i = i.host;
        continue;
      }
      const o = i.closest("umb-block-list, umb-block-grid")?.querySelector(mi);
      if (o)
        return o.appendChild(e), !0;
      const s = i.getRootNode();
      i = s instanceof ShadowRoot ? s.host : null;
    }
    return !1;
  }
  #n(t, e) {
    const o = y(t).querySelector("#headerColumn") ?? t;
    return getComputedStyle(o).position === "static" && (o.style.position = "relative"), e.style.position = "absolute", e.style.top = "0", e.style.right = "0", o.appendChild(e), !0;
  }
  #s(t, e) {
    const i = t.querySelector(E);
    return i ? (i.insertAdjacentElement("afterend", e), !0) : !1;
  }
  #r(t) {
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
function Rt(n) {
  const t = n;
  if (t.description?.trim())
    return t.description.trim();
  const e = n.getAttribute("description");
  if (e?.trim())
    return e.trim();
  const i = y(n), o = i.querySelector("umb-ufm-render#description");
  if (o?.markdown?.trim())
    return o.markdown.trim();
  const s = o?.getAttribute("markdown");
  if (s?.trim())
    return s.trim();
  const r = i.querySelector(E);
  return r ? r.textContent?.trim() ?? "" : "";
}
function at(n, t) {
  const e = t?.activeCulture, i = t?.fallbackCulture ?? M.getDefaultCulture();
  if (e !== void 0) {
    const c = gt(n, e);
    if (c)
      return c;
  }
  if (i !== void 0 && g(i) !== g(e)) {
    const c = gt(n, i);
    if (c)
      return c;
  }
  const o = gi(n);
  if (o) {
    const c = bi(o, t);
    if (c)
      return c;
  }
  const s = Pi(n);
  if (s)
    return s;
  if (!(Object.keys(O(n)).length > 0)) {
    const c = n.dataset.neattipStoredDescription?.trim();
    if (c)
      return c;
  }
  return Rt(n);
}
function N(n, t) {
  const e = O(n), i = Object.keys(e).length > 0, o = at(n, t).trim();
  if (t?.activeCulture !== void 0) {
    const s = gt(n, t.activeCulture);
    if (s)
      return n.dataset.neattipStoredDescription = s, s;
    !i && o && Dt(n, t.activeCulture, o);
  }
  return o ? n.dataset.neattipStoredDescription = o : delete n.dataset.neattipStoredDescription, o;
}
function Di(n) {
  y(n).querySelectorAll(E).forEach((e) => {
    e.classList.add(u.hidden), e.style.visibility = "visible", e.style.display = "none";
  });
}
function q(n) {
  const t = y(n);
  t.querySelector("#neattip-flash-style")?.remove(), t.querySelectorAll(E).forEach((e) => {
    e.classList.remove(u.hidden), e.classList.add(u.keepVisible), e.style.removeProperty("display"), e.style.removeProperty("visibility"), e.style.removeProperty("opacity"), e.style.removeProperty("height"), e.style.removeProperty("overflow");
  }), n.classList.add(u.keepVisible);
}
function Ri(n) {
  return n.label?.trim() || n.getAttribute("label")?.trim() ? !0 : !!y(n).querySelector(z);
}
function Z(n) {
  return n.classList.contains(u.processed);
}
function k(n) {
  n.classList.add(u.processed), y(n).querySelector("#neattip-flash-style")?.remove();
}
const Q = "neattip-flash-style";
function tt() {
  if (!f.enabled)
    return !1;
  const n = window.location.pathname;
  return n.includes("/section/settings") || n.includes("/section/member") || n.includes("/section/media") ? !1 : n.includes("/section/content");
}
function Mt(n) {
  J(n);
  const t = n.dataset.neattipStoredDescription?.trim() || Rt(n);
  if (!t)
    return !1;
  J(n), n.dataset.neattipStoredDescription = t;
  const e = n;
  return !e.description?.trim() && !n.getAttribute("description")?.trim() || (e.description = "", n.removeAttribute("description"), n.requestUpdate?.("description")), !0;
}
function P(n) {
  const t = n.dataset.neattipStoredDescription?.trim();
  if (!t)
    return !1;
  const e = n;
  return e.description = t, n.setAttribute("description", t), n.requestUpdate?.("description"), !0;
}
function Mi(n, t, e = 32) {
  const i = (o) => {
    const s = n.shadowRoot;
    if (s) {
      t(s);
      return;
    }
    o <= 0 || queueMicrotask(() => i(o - 1));
  };
  i(e);
}
function wt(n) {
  Mi(n, (t) => {
    if (t.getElementById(Q))
      return;
    const e = document.createElement("style");
    e.id = Q, e.textContent = `
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
function At(n, t = !1) {
  if (!f.enabled || n.classList.contains(u.keepVisible) || n.classList.contains(u.processed) && y(n).querySelector("neat-tip-indicator, .neattip-wrapper"))
    return;
  n.classList.contains(u.processed) && n.classList.remove(u.processed, u.keepVisible);
  const e = at(n);
  if (!e)
    return;
  if (e.length < f.minLength) {
    P(n), q(n), k(n);
    return;
  }
  Mt(n), wt(n), y(n).querySelectorAll(E).forEach((o) => {
    o.classList.contains(u.processed) || o.classList.contains(u.keepVisible) || (o.style.display = "none", o.style.visibility = "hidden", o.style.opacity = "0", o.style.height = "0", o.style.overflow = "hidden");
  });
}
function Oi(n) {
  const t = y(n);
  return !!(n.querySelector("neat-tip-indicator, .neattip-wrapper") || t.querySelector("neat-tip-indicator, .neattip-wrapper"));
}
function et(n) {
  const t = y(n), e = n.dataset.neattipStoredDescription, i = /* @__PURE__ */ new Set();
  if (n.querySelectorAll(".neattip-wrapper, neat-tip-indicator").forEach((o) => {
    i.add(o);
  }), t.querySelectorAll(".neattip-wrapper, neat-tip-indicator").forEach((o) => {
    i.add(o);
  }), i.forEach((o) => {
    o.remove();
  }), n.classList.remove(
    u.processed,
    u.keepVisible
  ), delete n.dataset.neattipResolvedCulture, t.querySelector(`#${Q}`)?.remove(), t.querySelectorAll(E).forEach((o) => {
    o.classList.remove(u.hidden, u.keepVisible), o.style.removeProperty("display"), o.style.removeProperty("visibility"), o.style.removeProperty("opacity"), o.style.removeProperty("height"), o.style.removeProperty("overflow");
  }), e?.trim()) {
    n.dataset.neattipStoredDescription = e.trim(), wt(n);
    return;
  }
  Mt(n), wt(n);
}
function Ii(n = w()) {
  n.filter((t) => t.classList.contains(u.processed)).forEach((t) => et(t));
}
function Hi(n = w()) {
  n.filter((t) => Ee(t)).forEach((t) => et(t));
}
function Ee(n) {
  if (!n.classList.contains(u.processed))
    return !1;
  const t = Oi(n);
  if (n.classList.contains(u.keepVisible))
    return !t && !at(n);
  if (!t)
    return !0;
  const o = y(n).querySelector(E);
  return !o || o.classList.contains(u.hidden) ? !1 : (o.textContent?.trim().length ?? 0) > 0;
}
class qi {
  #t = /* @__PURE__ */ new Set();
  #i = [];
  #e;
  #n = !1;
  constructor(t) {
    this.#e = t;
  }
  start(t = document.documentElement) {
    this.#r(t), this.#o(t);
  }
  stop() {
    this.#i.forEach((t) => t.disconnect()), this.#i.length = 0, this.#t.clear();
  }
  refresh(t = document.documentElement) {
    this.#o(t);
  }
  #s() {
    this.#n || (this.#n = !0, queueMicrotask(() => {
      this.#n = !1, this.#e();
    }));
  }
  #r(t) {
    if (!("childNodes" in t) || this.#t.has(t))
      return;
    this.#t.add(t);
    const e = new MutationObserver((i) => {
      for (const o of i)
        o.addedNodes.forEach((s) => this.#o(s));
      this.#s();
    });
    e.observe(t, { childList: !0, subtree: !0 }), this.#i.push(e);
  }
  #o(t) {
    t instanceof HTMLElement && t.shadowRoot && (this.#r(t.shadowRoot), this.#o(t.shadowRoot)), "childNodes" in t && t.childNodes.forEach((e) => this.#o(e));
  }
}
class Ui {
  #t = /* @__PURE__ */ new Set();
  #i;
  constructor() {
    this.#i = new qi(() => {
      for (const t of this.#t)
        t();
    });
  }
  subscribe(t) {
    return this.#t.add(t), this.#t.size === 1 && this.#i.start(document.documentElement), () => {
      this.#t.delete(t), this.#t.size === 0 && this.#i.stop();
    };
  }
  refresh(t = document.documentElement) {
    this.#t.size !== 0 && this.#i.refresh(t);
  }
}
let pt;
function Le() {
  return pt || (pt = new Ui()), pt;
}
function Ot(n) {
  return Le().subscribe(n);
}
function Te(n = document.documentElement) {
  Le().refresh(n);
}
class Ki {
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
    !f.settingsLoaded || !f.enabled || this.workspace.isContentEditingContext() && (this.#n(), this.#s(), Te(), this.#o());
  }
  stop() {
    clearTimeout(this.#t), this.#i?.(), this.#i = void 0;
  }
  cancelFallback() {
    clearTimeout(this.#t), this.#t = void 0;
  }
  hideLayoutDescriptions(t, e = !1) {
    At(t, e);
  }
  scanAllLayouts() {
    !f.settingsLoaded || !tt() || w().forEach((t) => this.#r(t, !0));
  }
  #n() {
    w().forEach((t) => this.#r(t, !0));
  }
  #s() {
    this.#i || (this.#i = Ot(() => {
      !f.settingsLoaded || !tt() || w().forEach((t) => this.#r(t));
    }));
  }
  #r(t, e = !1) {
    At(t, e), this.#e?.(t);
  }
  #o() {
    clearTimeout(this.#t), this.#t = setTimeout(() => {
      this.workspace.isDocumentContentEdit() || w().forEach((t) => {
        t.classList.contains(u.processed) || (y(t).querySelectorAll("[id='description'], umb-ufm-render, [slot='description']").forEach((e) => {
          e.style.display = "", e.style.visibility = "visible", e.style.opacity = "", e.style.height = "", e.style.overflow = "", e.classList.add(u.keepVisible);
        }), t.classList.add(u.keepVisible), y(t).querySelector(`#${Q}`)?.remove());
      });
    }, b.flashFallbackMs);
  }
}
const Ce = /* @__PURE__ */ new WeakMap();
function Bi(n, t) {
  Ce.set(n, t);
}
function H(n) {
  return Ce.get(n);
}
function dt(n, t) {
  const i = y(n).querySelector("umb-ufm-render#description");
  let o = "";
  if (i?.shadowRoot) {
    const s = i.shadowRoot.innerHTML.trim(), r = i.shadowRoot.textContent?.trim();
    s && r && (o = s);
  }
  return o || (o = _e(t)), $e(o);
}
function ne(n) {
  return $e(_e(n));
}
function _e(n) {
  const t = n.trim();
  if (!t)
    return "";
  const e = t.split(/\n{2,}/);
  return e.length === 1 ? `<p>${oe(e[0]).replace(/\n/g, "<br>")}</p>` : e.map((i) => `<p>${oe(i).replace(/\n/g, "<br>")}</p>`).join("");
}
function oe(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const ut = /(https?:\/\/[^\s<]+|www\.[^\s<]+|mailto:[^\s<]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, Fi = /* @__PURE__ */ new Set([
  "a",
  "b",
  "blockquote",
  "br",
  "code",
  "del",
  "em",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "i",
  "li",
  "ol",
  "p",
  "pre",
  "s",
  "strong",
  "u",
  "ul"
]), ji = /* @__PURE__ */ new Set([
  "applet",
  "audio",
  "base",
  "canvas",
  "embed",
  "form",
  "frame",
  "frameset",
  "iframe",
  "img",
  "input",
  "link",
  "math",
  "meta",
  "object",
  "picture",
  "script",
  "source",
  "style",
  "svg",
  "template",
  "track",
  "video"
]), zi = /^(?:javascript|data|vbscript|blob|file):/i;
function $e(n) {
  const t = document.createElement("template");
  t.innerHTML = n, Vi(t.content), Gi(t.content);
  const e = document.createElement("div");
  return e.appendChild(t.content.cloneNode(!0)), e.innerHTML;
}
function Vi(n) {
  for (const t of Array.from(n.childNodes))
    It(t);
}
function It(n) {
  if (!(n instanceof Element))
    return;
  const t = n.tagName.toLowerCase();
  if (ji.has(t)) {
    n.remove();
    return;
  }
  if (!Fi.has(t)) {
    Wi(n);
    return;
  }
  Yi(n, t), t === "a" && (n.classList.add("neattip-link"), xe(n));
  for (const e of Array.from(n.childNodes))
    It(e);
}
function Wi(n) {
  const t = n.parentNode;
  if (!t) {
    n.remove();
    return;
  }
  for (; n.firstChild; ) {
    const e = n.firstChild;
    t.insertBefore(e, n), It(e);
  }
  n.remove();
}
function Yi(n, t) {
  for (const e of Array.from(n.attributes)) {
    const i = e.name.toLowerCase();
    if (i.startsWith("on")) {
      n.removeAttribute(e.name);
      continue;
    }
    if (t === "a" && i === "href") {
      it(e.value) && n.removeAttribute(e.name);
      continue;
    }
    n.removeAttribute(e.name);
  }
}
function Gi(n) {
  const t = document.createTreeWalker(n, NodeFilter.SHOW_TEXT), e = [];
  for (; t.nextNode(); ) {
    const i = t.currentNode;
    !(i instanceof Text) || Zi(i) || e.push(i);
  }
  for (const i of e) {
    const o = Ji(i.data);
    o && i.replaceWith(o);
  }
}
function Ji(n) {
  ut.lastIndex = 0;
  let t = ut.exec(n);
  if (!t)
    return null;
  const e = document.createDocumentFragment();
  let i = 0;
  for (; t; ) {
    const o = t.index, s = t[0], { token: r, trailing: c } = tn(s);
    o > i && e.append(document.createTextNode(n.slice(i, o)));
    const a = Xi(r);
    a ? e.append(a) : e.append(document.createTextNode(r)), c && e.append(document.createTextNode(c)), i = o + s.length, t = ut.exec(n);
  }
  return i < n.length && e.append(document.createTextNode(n.slice(i))), e;
}
function Xi(n) {
  const t = Qi(n);
  if (!t)
    return null;
  const e = document.createElement("a");
  return e.className = "neattip-link", e.href = t, e.textContent = n, xe(e), e;
}
function Zi(n) {
  let t = n.parentNode;
  for (; t; ) {
    if (t instanceof HTMLAnchorElement)
      return !0;
    t = t.parentNode;
  }
  return !1;
}
function Qi(n) {
  const t = n.trim();
  if (!t || it(t))
    return null;
  const e = t.startsWith("www.") ? `https://${t}` : t.includes("@") && !t.startsWith("mailto:") ? `mailto:${t}` : t;
  if (it(e))
    return null;
  try {
    const o = new URL(e).protocol.toLowerCase();
    return o !== "http:" && o !== "https:" && o !== "mailto:" ? null : e;
  } catch {
    return null;
  }
}
function tn(n) {
  let t = n.length;
  for (; t > 0 && /[),.;!?]/.test(n[t - 1] ?? ""); )
    t -= 1;
  return {
    token: n.slice(0, t),
    trailing: n.slice(t)
  };
}
function xe(n) {
  const t = n.getAttribute("href") ?? "";
  if (!t || it(t)) {
    n.removeAttribute("href");
    return;
  }
  n.setAttribute("target", "_blank"), n.setAttribute("rel", "noopener noreferrer");
}
function it(n) {
  const t = en(n);
  return !!(!t || zi.test(t) || /javascript\s*:/i.test(t));
}
function en(n) {
  let t = n.trim();
  return t = t.replace(/&#x([0-9a-f]+);/gi, (e, i) => String.fromCharCode(Number.parseInt(i, 16))).replace(/&#(\d+);/g, (e, i) => String.fromCharCode(Number.parseInt(i, 10))).replace(/&Tab;/gi, "").replace(/&NewLine;/gi, ""), t = t.replace(/[\u0000-\u001f\u007f-\u009f\s]+/g, ""), t.toLowerCase();
}
class nn {
  constructor(t, e, i) {
    this.workspace = t, this.tooltipManager = e, this.cultureService = i;
  }
  #t = new Ni();
  process(t) {
    if (!(!f.settingsLoaded || !f.enabled) && this.workspace.shouldProcessElement(t)) {
      if (Z(t)) {
        const e = this.cultureService.getResolutionContext(), i = g(e.activeCulture), o = t.dataset.neattipResolvedCulture?.trim();
        if (o && i && o !== i)
          et(t);
        else if (Ee(t))
          et(t);
        else
          return;
      }
      try {
        M.applyToLayout(t), J(t);
        const e = this.cultureService.getResolutionContext(), i = N(t, e);
        if (i && i.length < f.minLength) {
          P(t), q(t), k(t);
          return;
        }
        if (i ? t.dataset.neattipStoredDescription = i : delete t.dataset.neattipStoredDescription, !Ri(t)) {
          P(t), q(t), k(t);
          return;
        }
        this.#i(t), Di(t);
        const s = this.#e(i);
        if (!this.#t.placeIndicator(t, s)) {
          P(t), q(t), k(t);
          return;
        }
        Bi(s, t), this.#n(s, t), t.dataset.neattipResolvedCulture = g(e.activeCulture), k(t);
      } catch {
        P(t), q(t), k(t);
      }
    }
  }
  #i(t) {
    (t.shadowRoot ?? t).querySelectorAll("label, uui-label, #label").forEach((i) => {
      const o = i.getAttribute("title");
      o && (i.dataset.originalTitle = o, i.removeAttribute("title"));
    });
  }
  #e(t) {
    const e = document.createElement("neat-tip-indicator");
    return e.classList.add("neattip-indicator"), e.setAttribute("role", "button"), e.setAttribute("tabindex", "0"), e.setAttribute(
      "aria-label",
      t ? "View property description" : "Add property description"
    ), e.dataset.neattipMarkdown = t, e.textContent = b.indicatorChar, e;
  }
  refreshLayoutDescription(t) {
    if (!Z(t))
      return "";
    M.applyToLayout(t);
    const e = this.cultureService.getResolutionContext(), i = N(t, e), o = y(t).querySelector("neat-tip-indicator");
    return o && (o.dataset.neattipMarkdown = i, o.setAttribute(
      "aria-label",
      i ? "View property description" : "Add property description"
    )), t.dataset.neattipResolvedCulture = g(e.activeCulture), this.tooltipManager.refreshIfActiveLayout(t), i;
  }
  #n(t, e) {
    let i = !1;
    const o = (a) => {
      if (!(a instanceof Node))
        return !1;
      if (a === t || t.contains(a))
        return !0;
      const p = a.getRootNode();
      return p instanceof ShadowRoot && p.host === t;
    }, s = () => {
      const a = this.cultureService.getResolutionContext(), p = N(e, a).trim();
      return p ? t.dataset.neattipMarkdown = p : delete t.dataset.neattipMarkdown, p;
    };
    t.addEventListener("click", (a) => {
      a.preventDefault(), a.stopPropagation(), this.tooltipManager.toggle(t, s());
    });
    const r = () => {
      i || (i = !0, !this.tooltipManager.isEditing() && (this.tooltipManager.isToggled() && !this.tooltipManager.isActiveIndicator(t) || (this.tooltipManager.cancelScheduledHide(), this.tooltipManager.show(t, s(), !1))));
    }, c = (a) => {
      o(a.relatedTarget) || (i = !1, this.tooltipManager.scheduleHide(a));
    };
    t.addEventListener("pointerenter", r), t.addEventListener("pointerleave", c), t.addEventListener("keydown", (a) => {
      a.key !== "Enter" && a.key !== " " || (a.preventDefault(), this.tooltipManager.toggle(t, s()));
    });
  }
}
class on {
  constructor(t, e, i) {
    this.workspace = t, this.processor = e, this.cultureService = i;
  }
  #t;
  #i;
  #e;
  #n = /* @__PURE__ */ new WeakMap();
  #s = /* @__PURE__ */ new Set();
  start() {
    this.#o(), this.#t = Ot(() => this.#r());
  }
  scanNow() {
    Te(), this.#o();
  }
  processLayout(t) {
    this.#a(t), this.processor.process(t);
  }
  stop() {
    clearTimeout(this.#i), this.#e && cancelAnimationFrame(this.#e), this.#s.forEach((t) => t.disconnect()), this.#s.clear(), this.#n = /* @__PURE__ */ new WeakMap(), this.#t?.(), this.#t = void 0;
  }
  #r() {
    clearTimeout(this.#i), this.#e && cancelAnimationFrame(this.#e), this.#e = requestAnimationFrame(() => {
      this.#o();
    }), this.#i = setTimeout(
      () => {
        this.#o();
      },
      b.observerDebounceMs
    );
  }
  async #o() {
    if (!f.settingsLoaded || !f.enabled || !this.workspace.isDocumentContentEdit())
      return;
    const t = X();
    if (t)
      try {
        await M.ensureLoaded(t);
      } catch {
      }
    w().forEach((e) => {
      this.#a(e), this.processor.process(e);
    });
  }
  #a(t) {
    if (this.#n.has(t))
      return;
    const e = new MutationObserver(() => {
      if (!Z(t)) {
        this.processor.process(t);
        return;
      }
      this.#c(t);
    });
    e.observe(t, {
      attributes: !0,
      attributeFilter: ["description", "label"]
    }), this.#n.set(t, e), this.#s.add(e);
  }
  refreshAllLayoutDescriptions() {
    !f.enabled || !this.workspace.isDocumentContentEdit() || w().filter((t) => Z(t)).forEach((t) => this.processor.refreshLayoutDescription(t));
  }
  #c(t) {
    const e = Rt(t).trim();
    if (!e)
      return;
    if (Object.keys(O(t)).length > 0) {
      this.processor.refreshLayoutDescription(t);
      return;
    }
    J(t);
    const i = this.cultureService.getResolutionContext();
    Dt(t, i.activeCulture, e), this.processor.refreshLayoutDescription(t), (t.description?.trim() || t.getAttribute("description")?.trim()) && Mt(t);
  }
}
const sn = 200, rn = [0, 50, 150, 400, 800, 1500], an = [50, 150, 400, 800];
class cn {
  #t = /* @__PURE__ */ new Set();
  #i;
  #e = "";
  #n;
  #s;
  #r = () => {
    this.#f();
  };
  subscribe(t) {
    return this.#t.add(t), this.#t.size === 1 && this.#o(), () => {
      this.#t.delete(t), this.#t.size === 0 && this.#a();
    };
  }
  notifyNow() {
    this.#u();
  }
  #o() {
    this.#e = this.#d(), this.#c(), window.addEventListener("popstate", this.#r), window.addEventListener("hashchange", this.#r), this.#i = window.setInterval(() => {
      const t = this.#d();
      t !== this.#e && (this.#e = t, this.#u());
    }, sn);
  }
  #a() {
    this.#i && (clearInterval(this.#i), this.#i = void 0), window.removeEventListener("popstate", this.#r), window.removeEventListener("hashchange", this.#r), this.#p();
  }
  #c() {
    this.#n || (this.#n = history.pushState.bind(history), this.#s = history.replaceState.bind(history), history.pushState = (...t) => {
      this.#n(...t), this.#l();
    }, history.replaceState = (...t) => {
      this.#s(...t), this.#l();
    });
  }
  #p() {
    this.#n && (history.pushState = this.#n), this.#s && (history.replaceState = this.#s), this.#n = void 0, this.#s = void 0;
  }
  #f() {
    const t = this.#d();
    t !== this.#e && (this.#e = t), this.#u();
  }
  #l() {
    const t = this.#d();
    t !== this.#e && (this.#e = t), queueMicrotask(() => {
      this.#m();
    });
    for (const e of an)
      window.setTimeout(() => {
        this.#m();
      }, e);
  }
  #u() {
    this.#m();
    for (const t of rn)
      window.setTimeout(() => {
        this.#m();
      }, t);
  }
  #m() {
    for (const t of this.#t)
      t();
  }
  #d() {
    return `${window.location.pathname}${window.location.search}${window.location.hash}`;
  }
}
let ht;
function ct(n) {
  return ht || (ht = new cn()), ht.subscribe(n);
}
const ln = [{ scheme: "bearer", type: "http" }];
async function pn(n, t) {
  const e = {
    documentKey: n.documentKey,
    description: t.trim()
  };
  n.propertyAlias?.trim() && (e.propertyAlias = n.propertyAlias.trim()), n.contentTypeKey?.trim() && (e.contentTypeKey = n.contentTypeKey.trim()), n.propertyKey?.trim() && (e.propertyKey = n.propertyKey.trim()), n.propertyLabel?.trim() && (e.propertyLabel = n.propertyLabel.trim());
  const i = n.culture?.trim();
  i && (e.culture = i);
  const s = (await le.put({
    url: qe,
    security: ln,
    body: e,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })).data;
  return {
    description: s?.description ?? t.trim(),
    cultureDescription: s?.cultureDescription,
    propertyDescription: s?.propertyDescription,
    contentTypeKey: s?.contentTypeKey ? String(s.contentTypeKey).trim() : void 0,
    propertyAlias: s?.propertyAlias?.trim(),
    propertyKey: s?.propertyKey ? String(s.propertyKey).trim() : void 0
  };
}
class ke {
  position(t, e, i = {}) {
    const o = i.viewportMargin ?? b.viewportMargin, s = this.#t(i.host);
    this.applyHostPositionMode(t, i.host), this.#i(t, e, o, s);
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
    const o = t.getBoundingClientRect();
    return {
      top: o.top,
      left: o.left
    };
  }
  resolveBounds(t) {
    const e = this.#t(t);
    return {
      width: e.width,
      height: e.height
    };
  }
  clampToViewport(t, e, i = 10, o) {
    const s = e.offsetWidth, r = e.offsetHeight, c = this.#t(o);
    return {
      top: Math.max(
        c.scrollTop + i,
        Math.min(t.top, c.scrollTop + c.height - r - i)
      ),
      left: Math.max(
        c.scrollLeft + i,
        Math.min(t.left, c.scrollLeft + c.width - s - i)
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
  #i(t, e, i, o) {
    const s = e.getBoundingClientRect(), r = t.getBoundingClientRect();
    let c = s.bottom - o.originTop + o.scrollTop + 10, a = s.left - o.originLeft + o.scrollLeft + s.width / 2 - r.width / 2;
    const p = o.scrollLeft + o.width - r.width - i;
    a = Math.max(
      o.scrollLeft + i,
      Math.min(a, p)
    );
    const d = o.scrollTop + o.height - i, l = c + r.height > d;
    t.classList.toggle("neattip-bottom", l), l && (c = s.top - o.originTop + o.scrollTop - r.height - 10), c = Math.max(o.scrollTop + i, c);
    const h = s.left - o.originLeft + o.scrollLeft + s.width / 2 - a;
    t.style.setProperty("--arrow-left", `${h}px`), t.style.top = `${c}px`, t.style.left = `${a}px`;
  }
}
class dn {
  #t = !1;
  #i;
  #e = 0;
  #n = 0;
  #s = 0;
  #r = 0;
  #o;
  #a;
  #c;
  #p;
  #f;
  #l;
  #u = new ke();
  get isDragging() {
    return this.#t;
  }
  setup(t, e, i, o) {
    this.teardown(t, e), this.#f = i, this.#a = o, e.addEventListener("pointerdown", this.#m);
  }
  teardown(t, e) {
    if (e.removeEventListener("pointerdown", this.#m), document.removeEventListener("pointermove", this.#d), document.removeEventListener("pointerup", this.#y), document.removeEventListener("pointercancel", this.#y), this.#p !== void 0 && (cancelAnimationFrame(this.#p), this.#p = void 0), this.#l && this.#i !== void 0)
      try {
        this.#l.releasePointerCapture(this.#i);
      } catch {
      }
    t.classList.remove("neattip-dragging"), this.#l = void 0, this.#c = void 0, this.#i = void 0, this.#t = !1, this.#a = void 0;
  }
  #m = (t) => {
    if (t.pointerType === "mouse" && t.button !== 0)
      return;
    const e = t.currentTarget.closest(".neattip-tooltip");
    if (!e || t.target?.closest("a, button, input, textarea, select"))
      return;
    t.preventDefault(), t.stopPropagation();
    const i = t.currentTarget;
    this.#l = i, i.setPointerCapture(t.pointerId), this.#o = e, this.#i = t.pointerId, this.#t = !0, this.#e = t.clientX, this.#n = t.clientY;
    const o = this.#u.readTooltipPosition(e, this.#a);
    this.#s = o.top, this.#r = o.left, e.classList.add("neattip-dragging"), document.addEventListener("pointermove", this.#d), document.addEventListener("pointerup", this.#y), document.addEventListener("pointercancel", this.#y);
  };
  #d = (t) => {
    if (!this.#t || this.#i !== t.pointerId)
      return;
    const e = this.#o;
    if (!e)
      return;
    const i = t.clientX - this.#e, o = t.clientY - this.#n, s = {
      top: this.#s + o,
      left: this.#r + i
    };
    this.#c = this.#u.clampToViewport(
      s,
      e,
      b.viewportMargin,
      this.#a
    ), this.#p === void 0 && (this.#p = requestAnimationFrame(() => {
      this.#p = void 0, this.#h();
    }));
  };
  #y = (t) => {
    if (this.#i !== t.pointerId)
      return;
    if (this.#h(), this.#o?.classList.remove("neattip-dragging"), this.#l)
      try {
        this.#l.releasePointerCapture(t.pointerId);
      } catch {
      }
    this.#l = void 0, this.#o = void 0, this.#c = void 0, this.#i = void 0, this.#t = !1, document.removeEventListener("pointermove", this.#d), document.removeEventListener("pointerup", this.#y), document.removeEventListener("pointercancel", this.#y);
  };
  #h() {
    const t = this.#o, e = this.#c;
    !t || !e || (t.style.top = `${e.top}px`, t.style.left = `${e.left}px`, this.#f?.(e));
  }
}
class un {
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
const hn = 'umb-property-layout [slot=description].neattip-keep-visible,umb-property-layout #description.neattip-keep-visible,umb-property-layout .property-description.neattip-keep-visible,umb-property-layout umb-ufm-render.neattip-keep-visible{visibility:visible!important;display:block!important}.neattip-hidden{display:none!important}.neattip-wrapper{display:inline-flex;align-items:center;isolation:isolate;margin-left:8px;vertical-align:middle;line-height:1}umb-property-layout neat-tip-indicator,umb-property-layout .neattip-indicator{flex-shrink:0;align-self:center}.neattip-tooltip{position:fixed;z-index:999999;display:none;opacity:0;transform:translateY(2px) scale(.985);transform-origin:center top;box-sizing:border-box;width:max-content;min-width:200px;max-width:320px;padding:10px 12px 0;border:1px solid var(--uui-color-border-standalone, #dbdbdb);border-radius:8px;background:var(--uui-color-surface, #fff);color:var(--uui-color-text, #262626);font-size:13px;line-height:1.5;box-shadow:0 8px 20px #0000001a;transition:opacity .15s ease,transform .15s ease;pointer-events:none}.neattip-tooltip.neattip-visible{display:block;opacity:1;transform:translateY(0) scale(1)}.neattip-tooltip:before,.neattip-tooltip:after{content:"";position:absolute;left:var(--arrow-left, 50%);transform:translate(-50%);border:8px solid transparent}.neattip-tooltip:before{top:-16px;border-bottom-color:var(--uui-color-border, #e0e0e0)}.neattip-tooltip:after{top:-15px;border-bottom-color:var(--uui-color-surface, #fff)}.neattip-tooltip.neattip-bottom:before{top:auto;bottom:-16px;border-bottom-color:transparent;border-top-color:var(--uui-color-border, #e0e0e0)}.neattip-tooltip.neattip-bottom:after{top:auto;bottom:-15px;border-bottom-color:transparent;border-top-color:var(--uui-color-surface, #fff)}.neattip-tooltip-header{height:16px;margin:-2px -4px 0;cursor:grab;border-radius:4px 4px 2px 2px;flex-shrink:0}.neattip-tooltip-body{min-width:0;padding-bottom:2px}.neattip-tooltip.neattip-dragging .neattip-tooltip-header{cursor:grabbing}.neattip-tooltip-content strong{font-weight:600}.neattip-tooltip-content{padding:4px 0 6px;color:inherit;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word}.neattip-tooltip.neattip-empty .neattip-tooltip-content{color:var(--uui-color-text-alt, #6f6f6f)}.neattip-empty-state-message{margin:0;font-size:12px;line-height:1.4}.neattip-tooltip-editor{display:none;margin-top:4px;padding-bottom:6px}.neattip-editor-hidden,.neattip-actions-hidden{display:none!important}.neattip-editor-input{display:block;box-sizing:border-box;width:100%;min-height:180px;border:1px solid var(--uui-color-border-emphasis, #bfbfbf);border-radius:var(--uui-border-radius, 3px);background:var(--uui-color-surface, #fff);color:inherit;font:inherit;line-height:1.5;padding:10px;resize:vertical;outline:none}.neattip-editor-input:focus{border-color:var(--uui-color-focus, #3550b8);box-shadow:0 0 0 1px #3550b840}.neattip-tooltip-actions{display:flex;gap:var(--uui-size-space-1, 4px);justify-content:flex-end;align-items:center;margin:8px -12px 0;padding:8px 12px 10px;border-top:1px solid var(--uui-color-border, #ebebeb);flex-shrink:0}.neattip-inline-actions{display:inline-flex;gap:2px;align-items:center;margin-left:auto}.neattip-action-button{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;padding:0;border:0;border-radius:var(--uui-border-radius, 3px);background:transparent;color:var(--uui-color-text-alt, #6f6f6f);cursor:pointer}.neattip-action-button:hover{background:var(--uui-color-surface-emphasis, #f3f3f3);color:var(--uui-color-interactive-emphasis, #174f8c)}.neattip-action-button:focus-visible{outline:2px solid var(--uui-color-focus, #3550b8);outline-offset:2px}.neattip-action-icon{display:inline-flex;width:16px;height:16px;pointer-events:none}.neattip-action-icon svg{display:block;width:100%;height:100%}.neattip-tooltip.neattip-mode-edit .neattip-tooltip-content{display:none}.neattip-tooltip.neattip-mode-edit .neattip-tooltip-editor{display:block}.neattip-tooltip.neattip-mode-edit{width:min(420px,calc(100vw - 32px))}.neattip-editor-action,.neattip-empty-action{--uui-button-height: 28px}.neattip-copy-feedback{margin-right:auto;min-height:1em;font-size:12px;line-height:1;color:var(--uui-color-positive, #2f7d32);opacity:0;transform:translateY(2px);transition:opacity .14s ease,transform .14s ease;pointer-events:none}.neattip-copy-feedback-visible{opacity:1;transform:translateY(0)}.neattip-tooltip-content *{color:inherit}.neattip-tooltip-content a,.neattip-tooltip-content .neattip-link{color:var(--uui-color-interactive, #007acc);text-decoration:underline;overflow-wrap:anywhere;word-break:break-word}.neattip-tooltip-content ul,.neattip-tooltip-content ol{margin:.5em 0;padding-left:1.5em}.neattip-tooltip-content p{margin:.5em 0}.neattip-tooltip-content p:first-child{margin-top:0}.neattip-tooltip-content p:last-child{margin-bottom:0}.neattip-tooltip-content code{background:var(--uui-color-background, #f4f4f4);padding:1px 4px;border-radius:3px;font-size:12px}.neattip-tooltip-content pre{background:var(--uui-color-background, #f4f4f4);padding:8px;border-radius:4px;overflow-x:auto;font-size:12px}.umb-block-list__block .neattip-indicator,.umb-block-grid__block .neattip-indicator,.umb-block-list__block neat-tip-indicator,.umb-block-grid__block neat-tip-indicator{width:14px;height:14px}@media(max-width:768px){.neattip-tooltip{min-width:min(200px,calc(100vw - 40px));max-width:calc(100vw - 40px)}}@media(max-width:480px){.neattip-tooltip{font-size:12px;padding:8px 10px 0}.neattip-tooltip-actions{margin-left:-10px;margin-right:-10px;padding-left:10px;padding-right:10px}}@media(prefers-reduced-motion:reduce){.neattip-tooltip,.neattip-tooltip-content,.neattip-tooltip-editor,.neattip-copy-feedback{transition:none}}@media(prefers-contrast:high){.neattip-tooltip{border-width:2px;box-shadow:none}}@media print{.neattip-wrapper,.neattip-indicator,neat-tip-indicator,.neattip-tooltip{display:none!important}.neattip-hidden{display:block!important}}', St = "neattip-styles", ft = /* @__PURE__ */ new WeakSet();
function Pe(n) {
  if (ft.has(n))
    return;
  const t = yn(n);
  if (t.querySelector(`#${St}`)) {
    ft.add(n);
    return;
  }
  const e = document.createElement("style");
  e.id = St, e.textContent = hn, t.appendChild(e), ft.add(n);
}
function fn() {
  Pe(document.body);
}
function mn() {
  document.head.querySelector(`#${St}`)?.remove();
}
function yn(n) {
  return n === document.body ? document.head : n;
}
const vn = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"/><path d="M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706zM5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1"/></svg>', bn = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"/></svg>';
class gn {
  #t;
  #i = document.body;
  #e;
  #n;
  #s;
  #r;
  #o;
  #a = !1;
  #c = !1;
  #p = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  #f;
  #l;
  #u;
  #m = new ke();
  #d = new dn();
  #y = new un();
  #h;
  #w;
  constructor(t, e) {
    this.#h = t, this.#w = e;
  }
  start() {
    document.addEventListener("pointerdown", this.#R, !1), document.addEventListener("click", this.#M, !1), document.addEventListener("keydown", this.#O), window.addEventListener("scroll", this.#A, !0), document.addEventListener("scroll", this.#A, !0), window.addEventListener("resize", this.#A), this.#l = ct(this.#V), this.#f = this.#h.subscribe(() => {
      this.#t && (this.#C(
        this.#t,
        this.#t.dataset.neattipCurrentMarkdown ?? ""
      ), this.#S(this.#t), this.#t.classList.contains("neattip-mode-edit") && !this.#h.canPerform("edit") && this.#b());
    });
  }
  stop() {
    this.hide(!0), clearTimeout(this.#r), clearTimeout(this.#o), this.#f?.(), this.#f = void 0, this.#l?.(), this.#l = void 0, this.#u !== void 0 && (cancelAnimationFrame(this.#u), this.#u = void 0), document.removeEventListener("pointerdown", this.#R, !1), document.removeEventListener("click", this.#M, !1), document.removeEventListener("keydown", this.#O), window.removeEventListener("scroll", this.#A, !0), document.removeEventListener("scroll", this.#A, !0), window.removeEventListener("resize", this.#A);
    const t = this.#t?.querySelector(".neattip-tooltip-header");
    this.#t && t && this.#d.teardown(this.#t, t), this.#t?.remove(), this.#t = void 0;
  }
  show(t, e, i = !1) {
    if (clearTimeout(this.#n), clearTimeout(this.#s), this.#v()) {
      this.#e === t && this.cancelScheduledHide();
      return;
    }
    i && (this.#a = !0);
    const o = i || this.#p ? 0 : b.tooltipDelay;
    this.#n = setTimeout(() => {
      if (!t.isConnected)
        return;
      const s = this.#P();
      this.#N(t), s.style.pointerEvents = "none", s.classList.remove("neattip-visible", "neattip-bottom"), s.style.maxWidth = `${b.tooltipMaxWidth}px`, s.style.minWidth = `${b.tooltipMinWidth}px`;
      const r = s.querySelector(".neattip-tooltip-content"), c = H(t), a = this.#w.getResolutionContext(), p = e.trim() || t.dataset.neattipMarkdown?.trim() || (c ? N(c, a) : "") || "", d = c ? dt(c, p) : ne(p);
      r && (r.innerHTML = d), s.dataset.neattipCurrentMarkdown = p, this.#H(s, p), s.style.display = "block", s.offsetHeight;
      const l = t.dataset.neattipId ?? crypto.randomUUID();
      t.dataset.neattipId = l;
      const h = t.dataset.neattipPosition;
      if (this.#a && h) {
        const m = JSON.parse(h);
        s.style.top = `${m.top}px`, s.style.left = `${m.left}px`;
      } else
        this.#m.position(s, t, {
          host: this.#E()
        });
      this.#B(s), s.classList.add("neattip-visible"), s.style.pointerEvents = "auto", this.#e = t, t.classList.toggle("neattip-active", this.#a);
    }, o);
  }
  hide(t = !1) {
    if (clearTimeout(this.#n), clearTimeout(this.#s), clearTimeout(this.#o), (this.#a || this.#v()) && !t)
      return;
    const e = this.#t;
    if (!e)
      return;
    this.#b();
    const i = e.querySelector(".neattip-tooltip-header");
    i && this.#d.teardown(e, i), e.classList.remove("neattip-visible", "neattip-bottom", "neattip-dragging"), e.style.pointerEvents = "none", e.style.display = "none", e.parentElement !== document.body && document.body.appendChild(e), this.#i = document.body, this.#e?.classList.remove("neattip-active"), this.#e = void 0, this.#a = !1, document.querySelectorAll("[data-neattip-position]").forEach((o) => {
      delete o.dataset.neattipPosition;
    });
  }
  scheduleHide(t) {
    this.#a || this.#v() || t instanceof MouseEvent && this.#j(t) || (clearTimeout(this.#s), this.#s = setTimeout(() => {
      this.#z() || this.hide(!1);
    }, b.tooltipHideDelay));
  }
  cancelScheduledHide() {
    clearTimeout(this.#s);
  }
  toggle(t, e) {
    if (!this.#v()) {
      if (this.#a && this.#e === t) {
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
    return this.#a;
  }
  isEditing() {
    return this.#v();
  }
  onCultureChange() {
    const t = this.#t;
    if (t) {
      if (t.classList.contains("neattip-mode-edit")) {
        const e = t.querySelector(".neattip-editor-input"), i = t.dataset.neattipEditBaseline?.trim() ?? "", s = !((e?.value.trim() ?? "") !== i) && this.#h.canPerform("edit");
        this.#b(), s && this.#x();
        return;
      }
      this.#e && this.#k();
    }
  }
  #k() {
    const t = this.#t, e = this.#e;
    if (!t || !e)
      return;
    const i = H(e), o = this.#w.getResolutionContext(), s = i ? N(i, o) : this.#T();
    e.dataset.neattipMarkdown = s;
    const r = t.querySelector(".neattip-tooltip-content"), c = i ? dt(i, s) : ne(s);
    r && (r.innerHTML = c), t.dataset.neattipCurrentMarkdown = s, this.#C(t, s), this.#S(t);
  }
  refreshIfActiveLayout(t) {
    const e = this.#e;
    !e || H(e) !== t || this.#t?.classList.contains("neattip-mode-edit") || this.#k();
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
            <span class="neattip-action-icon">${vn}</span>
          </button>
          <button
            class="neattip-action-button"
            type="button"
            aria-label="Edit"
            title="Edit"
            data-neattip-action="edit"
          >
            <span class="neattip-action-icon">${bn}</span>
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
    `, t.addEventListener("click", this.#I), t.addEventListener("click-label", this.#I), this.#K(t), this.#F(t), this.#S(t), document.body.appendChild(t), this.#t = t, t;
  }
  #N(t) {
    const e = this.#P(), i = this.#y.resolve(t);
    this.#i = i, Pe(i), e.parentElement !== i && i.appendChild(e), this.#m.applyHostPositionMode(e, this.#E());
  }
  #E() {
    return this.#y.isBodyHost(this.#i) ? void 0 : this.#i;
  }
  #q() {
    this.#u === void 0 && (this.#u = requestAnimationFrame(() => {
      this.#u = void 0, this.#U();
    }));
  }
  #U() {
    const t = this.#t, e = this.#e;
    if (!t?.classList.contains("neattip-visible") || !e?.isConnected || this.#d.isDragging)
      return;
    this.#N(e);
    const i = e.dataset.neattipPosition;
    if (this.#a && i) {
      const o = JSON.parse(i);
      t.style.top = `${o.top}px`, t.style.left = `${o.left}px`;
      return;
    }
    this.#m.position(t, e, {
      host: this.#E()
    });
  }
  #K(t) {
    const e = (i) => {
      i.stopPropagation();
    };
    t.addEventListener("pointerdown", e), t.addEventListener("mousedown", e);
  }
  #B(t) {
    const e = t.querySelector(".neattip-tooltip-header");
    e && this.#d.setup(
      t,
      e,
      (i) => {
        this.#e?.setAttribute("data-neattip-position", JSON.stringify(i));
      },
      this.#E()
    );
  }
  #F(t) {
    if (this.#c)
      return;
    this.#c = !0;
    const e = () => {
      this.cancelScheduledHide(), this.#$();
    }, i = (o) => {
      !this.#a && !this.#v() && !this.#d.isDragging && this.scheduleHide(o);
    };
    t.addEventListener("pointerenter", e), t.addEventListener("mouseenter", e), t.addEventListener("pointerleave", i), t.addEventListener("mouseleave", i);
  }
  #j(t) {
    if (this.#L(t.relatedTarget))
      return !0;
    if (!this.#t?.classList.contains("neattip-visible"))
      return !1;
    const e = document.elementFromPoint(t.clientX, t.clientY);
    return this.#L(e);
  }
  #L(t) {
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
      if (this.#L(i))
        return !0;
    return this.#L(t.target);
  }
  #$() {
    this.#a = !0, this.cancelScheduledHide(), this.#e?.classList.add("neattip-active");
  }
  #z() {
    const t = this.#t;
    return !!(t?.classList.contains("neattip-visible") && t.matches(":hover") || this.#e?.matches(":hover"));
  }
  #R = (t) => {
    this.#t?.classList.contains("neattip-visible") && (this.#D(t) || this.#v() || this.hide(!0));
  };
  #M = (t) => {
    this.#D(t) || this.#v() || this.hide(!0);
  };
  #O = (t) => {
    if (t.key === "Escape") {
      if (this.#t?.classList.contains("neattip-mode-edit")) {
        t.preventDefault(), this.#b();
        return;
      }
      this.hide(!0);
    }
  };
  #A = () => {
    this.#t?.classList.contains("neattip-visible") && (this.#d.isDragging || this.#q());
  };
  #V = () => {
    this.#v() || this.hide(!0);
  };
  #I = (t) => {
    const e = this.#W(t);
    if (!e)
      return;
    this.cancelScheduledHide(), this.#$(), t.preventDefault(), t.stopPropagation();
    const i = e.dataset.neattipAction;
    if (!i)
      return;
    const o = i === "save" || i === "add" ? "edit" : i === "copy" || i === "edit" ? i : null;
    if (!(o && !this.#h.canPerform(o)))
      switch (i) {
        case "copy":
          this.#Y();
          break;
        case "edit":
          this.#x();
          break;
        case "add":
          this.#x();
          break;
        case "save":
          this.#G();
          break;
        case "cancel":
          this.#b();
          break;
      }
  };
  #W(t) {
    const e = typeof t.composedPath == "function" ? t.composedPath() : [];
    for (const o of e) {
      if (!(o instanceof Element) || !(o instanceof HTMLElement))
        continue;
      if (o.hasAttribute("data-neattip-action"))
        return o;
      const s = o.closest("[data-neattip-action]");
      if (s)
        return s;
    }
    const i = t.target;
    if (i instanceof HTMLElement)
      return i.closest("[data-neattip-action]") ?? void 0;
  }
  #H(t, e) {
    t.dataset.neattipCurrentMarkdown = e, this.#_(), this.#g("Save"), this.#b(), this.#C(t, e), this.#S(t);
  }
  #S(t) {
    const e = this.#h.getAllowedActions(), i = this.#J(t), o = t.querySelector("[data-neattip-action='copy']"), s = t.querySelector("[data-neattip-action='edit']"), r = t.querySelector(".neattip-inline-actions"), c = t.querySelector(".neattip-empty-action"), a = t.querySelector(".neattip-tooltip-actions"), p = t.querySelector(".neattip-copy-feedback"), d = !i && e.includes("copy"), l = !i && e.includes("edit"), h = d || l, m = i && this.#h.canPerform("edit"), $ = h || m;
    o?.classList.toggle("neattip-editor-hidden", !d), s?.classList.toggle("neattip-editor-hidden", !l), r?.classList.toggle("neattip-editor-hidden", !h), c?.classList.toggle("neattip-editor-hidden", !m), p?.classList.toggle("neattip-editor-hidden", i), a?.classList.toggle("neattip-actions-hidden", !$);
  }
  #Y() {
    const t = this.#T();
    t && (navigator.clipboard?.writeText(t), this.#X());
  }
  #x() {
    if (!this.#h.canPerform("edit"))
      return;
    const t = this.#t;
    if (!t)
      return;
    const e = t.querySelector(".neattip-editor-input"), i = t.querySelector(".neattip-inline-actions"), o = t.querySelector(".neattip-empty-action"), s = t.querySelector("[data-neattip-action='save']"), r = t.querySelector("[data-neattip-action='cancel']");
    if (!e || !i || !o || !s || !r)
      return;
    const c = this.#T();
    t.dataset.neattipCurrentMarkdown = c, t.dataset.neattipEditBaseline = c, e.value = c, this.#_(), this.cancelScheduledHide(), this.#$(), t.classList.add("neattip-mode-edit"), t.style.maxWidth = "420px", this.#e?.classList.add("neattip-active"), t.querySelector(".neattip-tooltip-actions")?.classList.remove("neattip-actions-hidden"), i.classList.add("neattip-editor-hidden"), o.classList.add("neattip-editor-hidden"), s.classList.remove("neattip-editor-hidden"), r.classList.remove("neattip-editor-hidden"), this.#g("Save"), e.disabled = !1, requestAnimationFrame(() => {
      e.value = c, e.focus(), e.setSelectionRange(e.value.length, e.value.length);
    });
  }
  #b() {
    const t = this.#t;
    if (!t)
      return;
    const e = t.querySelector(".neattip-inline-actions"), i = t.querySelector("[data-neattip-action='save']"), o = t.querySelector("[data-neattip-action='cancel']");
    if (!e || !i || !o)
      return;
    const s = this.#a;
    t.classList.remove("neattip-mode-edit"), delete t.dataset.neattipEditBaseline, e.classList.remove("neattip-editor-hidden"), i.classList.add("neattip-editor-hidden"), o.classList.add("neattip-editor-hidden");
    const r = t.querySelector(".neattip-editor-input");
    r && (r.value = this.#T(), r.disabled = !0), t.style.maxWidth = `${b.tooltipMaxWidth}px`, t.style.minWidth = `${b.tooltipMinWidth}px`, this.#C(t, t.dataset.neattipCurrentMarkdown ?? ""), this.#S(t), s || this.#e?.classList.remove("neattip-active");
  }
  #v() {
    return this.#t?.classList.contains("neattip-mode-edit") ?? !1;
  }
  async #G() {
    if (!this.#h.canPerform("edit")) {
      this.#b();
      return;
    }
    const t = this.#t, e = this.#e;
    if (!t || !e)
      return;
    const i = t.querySelector(".neattip-editor-input"), o = t.querySelector(".neattip-tooltip-content");
    if (!i || !o)
      return;
    const s = i.value.trim(), r = H(e);
    if (!r)
      return;
    const c = Ae.resolveUpdateTarget(r);
    if (!c) {
      this.#g("No target");
      return;
    }
    try {
      this.#g("Saving...");
      const a = await pn(
        {
          ...c,
          culture: this.#w.getActiveCulture() ?? void 0
        },
        s
      );
      be(r, a.description);
      const p = a.propertyDescription?.trim();
      p ? (r.dataset.neattipPropertyDescriptionFallback = p, r.dataset.neattipOriginalDescription = p) : (delete r.dataset.neattipPropertyDescriptionFallback, delete r.dataset.neattipOriginalDescription);
      const d = Nt(a.description);
      M.updateFromSave(
        a.propertyAlias ?? c.propertyAlias,
        a.propertyKey ?? c.propertyKey,
        d,
        p ?? "",
        a.contentTypeKey ?? c.contentTypeKey
      );
      const l = a.cultureDescription?.trim() || s;
      r.dataset.neattipStoredDescription = l, Dt(r, this.#w.getActiveCulture(), l), e.dataset.neattipMarkdown = l, t.dataset.neattipCurrentMarkdown = l, o.innerHTML = dt(r, l), this.#g("Saved"), this.#Z("✓ Saved", 1e3), this.#o = window.setTimeout(() => {
        this.#g("Save"), this.#H(t, l);
      }, 1e3);
    } catch {
      this.#g("Failed");
      return;
    }
  }
  #T() {
    const e = this.#t?.dataset.neattipCurrentMarkdown?.trim();
    if (e)
      return e;
    const i = this.#e;
    if (!i)
      return "";
    const o = H(i), s = this.#w.getResolutionContext();
    return i.dataset.neattipMarkdown?.trim() || (o ? N(o, s) : "") || (o ? at(o, s) : "") || "";
  }
  #J(t) {
    return !t.dataset.neattipCurrentMarkdown?.trim();
  }
  #C(t, e) {
    const i = t.querySelector(".neattip-tooltip-content");
    if (!i)
      return;
    const o = !e.trim();
    if (t.classList.toggle("neattip-empty", o), !o)
      return;
    const s = this.#h.canPerform("edit") ? "No helper text yet." : "No helper text available.";
    i.innerHTML = `<p class="neattip-empty-state-message">${s}</p>`;
  }
  #g(t) {
    const e = this.#t?.querySelector("[data-neattip-action='save']");
    e && (e.setAttribute("label", t), e.setAttribute("title", t));
  }
  #X() {
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
const se = "neattip-display-culture", re = "neattip-fallback-culture";
class wn extends Ue {
  #t;
  #i;
  #e = /* @__PURE__ */ new Set();
  constructor(t) {
    super(t), this.consumeContext(Ke, (e) => {
      this.#n(e);
    });
  }
  getActiveCulture() {
    return Si() ?? this.#t ?? null;
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
    this.#e.clear(), this.removeUmbControllerByAlias(se), this.removeUmbControllerByAlias(re), super.destroy();
  }
  #n(t) {
    t && (this.observe(
      t.displayCulture,
      (e) => {
        const i = this.#t, o = e ?? null;
        this.#t = o, g(i) !== g(o) && this.#e.forEach((s) => s(o, i));
      },
      se
    ), this.observe(
      t.fallbackCulture,
      (e) => {
        this.#i = e ?? null;
      },
      re
    ));
  }
}
const An = /\/document\/edit\//i, Sn = /\/section\/content/i, En = ["/section/settings", "/section/member", "/section/media"];
class Ln {
  subscribeNavigation(t) {
    return ct(t);
  }
  isContentEditingContext() {
    const t = window.location.pathname;
    return En.some((e) => t.includes(e)) ? !1 : Sn.test(t);
  }
  isDocumentContentEdit() {
    const t = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    return An.test(t);
  }
  shouldProcessElement(t) {
    return !this.isDocumentContentEdit() || Tn(t) ? !1 : Ei(t) || Cn(t);
  }
}
function Tn(n) {
  let t = n;
  for (; t; ) {
    if (t instanceof Element && t.matches(vi))
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
function Cn(n) {
  let t = n;
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
class _n {
  #t;
  #i;
  #e = new Ln();
  #n;
  #s = new Ki(this.#e);
  #r;
  #o;
  #a;
  #c;
  #p;
  #f;
  #l;
  #u = () => {
    this.#d();
  };
  constructor(t) {
    this.#t = new Ie(t), this.#i = new wn(t), this.#p = this.#t.onUserChanged(() => {
      this.#m();
    }), this.syncPermissionsFromRuntime(), this.#n = new gn(this.#t, this.#i), this.#r = new nn(
      this.#e,
      this.#n,
      this.#i
    ), this.#o = new on(
      this.#e,
      this.#r,
      this.#i
    );
  }
  /** Refresh server-evaluated edit permission from runtime settings. */
  syncPermissionsFromRuntime() {
    this.#t.setServerCanEditHelperText(f.canEditHelperText);
  }
  async #m() {
    return this.#f ? this.#f : (this.#f = ae().then(() => {
      this.syncPermissionsFromRuntime();
    }).catch(() => {
      this.#t.setServerCanEditHelperText(void 0);
    }).finally(() => {
      this.#f = void 0;
    }), this.#f);
  }
  start() {
    this.#s.setLayoutDetectedHandler((t) => {
      this.#o.processLayout(t);
    }), this.#s.start(), this.#n.start(), this.#o.start(), this.#a = ct(this.#u), this.#c = this.#i.subscribe(() => {
      this.#h();
    }), this.#y();
  }
  stop() {
    clearTimeout(this.#l), this.#l = void 0, this.#a?.(), this.#a = void 0, this.#c?.(), this.#c = void 0, this.#p?.(), this.#p = void 0, this.#o.stop(), this.#n.stop(), this.#s.stop(), this.#t.destroy(), this.#i.destroy();
  }
  rescan() {
    f.enabled && (Ii(), this.#s.scanAllLayouts(), this.#o.scanNow());
  }
  #d() {
    clearTimeout(this.#l), this.#l = window.setTimeout(() => {
      this.#l = void 0, this.#y();
    }, 100);
  }
  #y() {
    this.#n.hide(!0), M.invalidate(), !(!f.enabled || !this.#e.isDocumentContentEdit()) && (Hi(), this.#s.start(), this.#o.scanNow());
  }
  #h() {
    if (!f.enabled || !this.#e.isDocumentContentEdit())
      return;
    const t = () => {
      this.#o.refreshAllLayoutDescriptions(), this.#o.scanNow(), this.#n.onCultureChange();
    };
    requestAnimationFrame(t);
    for (const e of [100, 300, 800])
      window.setTimeout(t, e);
  }
}
function Et() {
  w().forEach((n) => {
    const t = y(n);
    t.querySelectorAll(".neattip-wrapper, neat-tip-indicator").forEach((e) => {
      e.remove();
    }), t.querySelectorAll("label, uui-label, #label").forEach((e) => {
      const i = e.dataset.originalTitle;
      i && (e.setAttribute("title", i), delete e.dataset.originalTitle);
    }), t.querySelectorAll(E).forEach((e) => {
      e.classList.remove(u.hidden, u.keepVisible), e.style.visibility = "", e.style.display = "";
    }), n.classList.remove(
      u.processed,
      u.keepVisible
    ), t.querySelector("#neattip-flash-style")?.remove(), P(n), delete n.dataset.neattipStoredDescription;
  });
}
let nt = !1, Lt = "", Tt, Ct;
function Ne() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}
function Ht(n = !1) {
  !f.settingsLoaded || !f.enabled || tt() && w().forEach((t) => At(t, n));
}
function De() {
  const n = Ne();
  n !== Lt && (Lt = n, Ht(!0));
}
function $n() {
  De(), Ht();
}
function Re() {
  nt || typeof document > "u" || (nt = !0, Lt = Ne(), tt() && Ht(!0), Tt = Ot($n), Ct = ct(De));
}
function qt() {
  nt && (nt = !1, Tt?.(), Tt = void 0, Ct?.(), Ct = void 0);
}
let ot, A;
function xn() {
  fn();
}
function kn() {
  mn();
}
function Me() {
  !f.enabled || !ot || (A ? A.syncPermissionsFromRuntime() : (A = new _n(ot), A.start()));
}
function Ut() {
  A?.stop(), A = void 0;
}
async function Pn() {
  try {
    await ae();
  } catch {
    f.settingsLoaded = !0;
  }
  if (f.enabled) {
    Re(), Me(), A?.syncPermissionsFromRuntime(), A?.rescan();
    return;
  }
  qt(), Ut(), Et();
}
const Oe = () => {
  if (f.enabled) {
    Re(), Et(), Me(), A?.syncPermissionsFromRuntime(), A?.rescan();
    return;
  }
  qt(), Ut(), Et();
}, qn = (n) => {
  ot = n, xn(), Pn(), window.addEventListener(ce, Oe);
}, Un = () => {
  window.removeEventListener(ce, Oe), qt(), Ut(), kn(), ot = void 0;
};
export {
  qn as onInit,
  Un as onUnload
};
//# sourceMappingURL=entrypoint-B17kIuKu.js.map
