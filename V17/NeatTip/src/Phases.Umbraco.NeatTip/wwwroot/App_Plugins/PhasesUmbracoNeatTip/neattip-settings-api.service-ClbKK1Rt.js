import { umbHttpClient as a } from "@umbraco-cms/backoffice/http-client";
import { u as o, v as r, n as s } from "./bundle.manifests-Bi5hYMYD.js";
const u = {
  minLength: 0,
  tooltipDelay: 200,
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
async function m() {
  const t = await a.get({
    url: r,
    security: c
  });
  return i(l(t));
}
async function d(t) {
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
async function T() {
  const t = await m();
  return o(t), p(), t;
}
async function y(t) {
  const e = await d(t);
  return o(e), p(), e;
}
export {
  u as N,
  T as l,
  y as s
};
//# sourceMappingURL=neattip-settings-api.service-ClbKK1Rt.js.map
