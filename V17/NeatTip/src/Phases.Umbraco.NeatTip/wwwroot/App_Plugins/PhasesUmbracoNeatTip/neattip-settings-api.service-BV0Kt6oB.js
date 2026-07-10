import { umbHttpClient as a } from "@umbraco-cms/backoffice/http-client";
import { I as o, J as r, n as s } from "./bundle.manifests-C2kQPsY2.js";
const u = {
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
}, c = [{ scheme: "bearer", type: "http" }];
function p() {
  u.minLength = s.minLength;
}
function i(t) {
  const e = (t.editHelperTextAllowedSections ?? []).map((n) => n?.trim()).filter((n) => !!n);
  return {
    enabled: t.enabled,
    minLength: Math.max(0, t.minLength),
    editHelperTextAllowedSections: e.length > 0 ? e : [...s.editHelperTextAllowedSections]
  };
}
function l(t) {
  return t && typeof t == "object" && "data" in t ? t.data : t;
}
async function d() {
  const t = await a.get({
    url: r,
    security: c
  });
  return i(l(t));
}
async function m(t) {
  const e = await a.put({
    url: r,
    security: c,
    body: i(t),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  return i(l(e));
}
async function y() {
  const t = await d();
  return o(t), p(), t;
}
async function T(t) {
  const e = await m(t);
  return o(e), p(), e;
}
export {
  u as N,
  y as l,
  T as s
};
//# sourceMappingURL=neattip-settings-api.service-BV0Kt6oB.js.map
