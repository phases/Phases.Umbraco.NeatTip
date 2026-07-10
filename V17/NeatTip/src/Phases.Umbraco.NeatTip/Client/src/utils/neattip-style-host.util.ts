import neattipStyles from "../styles/neattip.css?inline";

export const NEATTIP_STYLE_ELEMENT_ID = "neattip-styles";

const styledHosts = new WeakSet<HTMLElement>();

export function ensureNeatTipStylesForHost(host: HTMLElement): void {
  if (styledHosts.has(host)) {
    return;
  }

  const mountTarget = resolveStyleMountTarget(host);
  if (mountTarget.querySelector(`#${NEATTIP_STYLE_ELEMENT_ID}`)) {
    styledHosts.add(host);
    return;
  }

  const style = document.createElement("style");
  style.id = NEATTIP_STYLE_ELEMENT_ID;
  style.textContent = neattipStyles;
  mountTarget.appendChild(style);
  styledHosts.add(host);
}

export function ensureNeatTipDocumentStyles(): void {
  ensureNeatTipStylesForHost(document.body);
}

export function removeNeatTipDocumentStyles(): void {
  document.head.querySelector(`#${NEATTIP_STYLE_ELEMENT_ID}`)?.remove();
}

function resolveStyleMountTarget(host: HTMLElement): ParentNode {
  if (host === document.body) {
    return document.head;
  }

  return host;
}
