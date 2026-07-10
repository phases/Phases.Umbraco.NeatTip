import { queryLayoutRoot } from "../utils/shadow-dom.util.js";

const indicatorLayouts = new WeakMap<HTMLElement, HTMLElement>();

export function linkIndicatorToLayout(indicator: HTMLElement, layout: HTMLElement): void {
  indicatorLayouts.set(indicator, layout);
}

export function getLayoutForIndicator(indicator: HTMLElement): HTMLElement | undefined {
  return indicatorLayouts.get(indicator);
}

export function getRenderedDescriptionHtml(layout: HTMLElement, markdown: string): string {
  const root = queryLayoutRoot(layout);
  const ufm = root.querySelector("umb-ufm-render#description");

  let html = "";
  if (ufm?.shadowRoot) {
    const rendered = ufm.shadowRoot.innerHTML.trim();
    const text = ufm.shadowRoot.textContent?.trim();
    if (rendered && text) {
      html = rendered;
    }
  }

  if (!html) {
    html = plainTextToHtml(markdown);
  }

  return sanitizeAndLinkifyHtml(html);
}

export function renderMarkdownAsHtml(markdown: string): string {
  return sanitizeAndLinkifyHtml(plainTextToHtml(markdown));
}

function plainTextToHtml(markdown: string): string {
  const trimmed = markdown.trim();
  if (!trimmed) {
    return "";
  }

  const paragraphs = trimmed.split(/\n{2,}/);
  if (paragraphs.length === 1) {
    return `<p>${escapeHtml(paragraphs[0]).replace(/\n/g, "<br>")}</p>`;
  }

  return paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const LINK_PATTERN = /(https?:\/\/[^\s<]+|www\.[^\s<]+|mailto:[^\s<]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

/** Tags permitted in tooltip HTML (markdown / UFM output). */
const ALLOWED_TAGS = new Set([
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
  "ul",
]);

/** Dangerous tags whose content must be discarded entirely. */
const DROP_CONTENT_TAGS = new Set([
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
  "video",
]);

const BLOCKED_URL_PROTOCOL = /^(?:javascript|data|vbscript|blob|file):/i;

function sanitizeAndLinkifyHtml(html: string): string {
  const template = document.createElement("template");
  template.innerHTML = html;
  sanitizeFragment(template.content);
  linkifyFragment(template.content);

  const container = document.createElement("div");
  container.appendChild(template.content.cloneNode(true));
  return container.innerHTML;
}

function sanitizeFragment(fragment: DocumentFragment): void {
  for (const child of Array.from(fragment.childNodes)) {
    sanitizeNode(child);
  }
}

function sanitizeNode(node: Node): void {
  if (!(node instanceof Element)) {
    return;
  }

  const tagName = node.tagName.toLowerCase();

  if (DROP_CONTENT_TAGS.has(tagName)) {
    node.remove();
    return;
  }

  if (!ALLOWED_TAGS.has(tagName)) {
    unwrapElement(node);
    return;
  }

  stripDisallowedAttributes(node, tagName);

  if (tagName === "a") {
    node.classList.add("neattip-link");
    secureAnchor(node as HTMLAnchorElement);
  }

  for (const child of Array.from(node.childNodes)) {
    sanitizeNode(child);
  }
}

function unwrapElement(element: Element): void {
  const parent = element.parentNode;
  if (!parent) {
    element.remove();
    return;
  }

  while (element.firstChild) {
    const child = element.firstChild;
    parent.insertBefore(child, element);
    sanitizeNode(child);
  }

  element.remove();
}

function stripDisallowedAttributes(element: Element, tagName: string): void {
  for (const attribute of Array.from(element.attributes)) {
    const name = attribute.name.toLowerCase();

    if (name.startsWith("on")) {
      element.removeAttribute(attribute.name);
      continue;
    }

    if (tagName === "a" && name === "href") {
      if (isUnsafeUrl(attribute.value)) {
        element.removeAttribute(attribute.name);
      }
      continue;
    }

    element.removeAttribute(attribute.name);
  }
}

function linkifyFragment(fragment: DocumentFragment): void {
  const walker = document.createTreeWalker(fragment, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];

  while (walker.nextNode()) {
    const current = walker.currentNode;
    if (!(current instanceof Text) || isInsideAnchor(current)) {
      continue;
    }
    textNodes.push(current);
  }

  for (const textNode of textNodes) {
    const replacement = createLinkifiedFragment(textNode.data);
    if (!replacement) {
      continue;
    }
    textNode.replaceWith(replacement);
  }
}

function createLinkifiedFragment(text: string): DocumentFragment | null {
  LINK_PATTERN.lastIndex = 0;
  let match = LINK_PATTERN.exec(text);
  if (!match) {
    return null;
  }

  const fragment = document.createDocumentFragment();
  let cursor = 0;

  while (match) {
    const start = match.index;
    const rawToken = match[0];
    const { token, trailing } = trimTrailingPunctuation(rawToken);

    if (start > cursor) {
      fragment.append(document.createTextNode(text.slice(cursor, start)));
    }

    const anchor = createLinkAnchor(token);
    if (anchor) {
      fragment.append(anchor);
    } else {
      fragment.append(document.createTextNode(token));
    }

    if (trailing) {
      fragment.append(document.createTextNode(trailing));
    }

    cursor = start + rawToken.length;
    match = LINK_PATTERN.exec(text);
  }

  if (cursor < text.length) {
    fragment.append(document.createTextNode(text.slice(cursor)));
  }

  return fragment;
}

function createLinkAnchor(rawToken: string): HTMLAnchorElement | null {
  const href = toSafeHref(rawToken);
  if (!href) {
    return null;
  }

  const anchor = document.createElement("a");
  anchor.className = "neattip-link";
  anchor.href = href;
  anchor.textContent = rawToken;
  secureAnchor(anchor);
  return anchor;
}

function isInsideAnchor(node: Text): boolean {
  let parent: Node | null = node.parentNode;
  while (parent) {
    if (parent instanceof HTMLAnchorElement) {
      return true;
    }
    parent = parent.parentNode;
  }
  return false;
}

function toSafeHref(rawToken: string): string | null {
  const token = rawToken.trim();
  if (!token || isUnsafeUrl(token)) {
    return null;
  }

  const normalized = token.startsWith("www.")
    ? `https://${token}`
    : token.includes("@") && !token.startsWith("mailto:")
      ? `mailto:${token}`
      : token;

  if (isUnsafeUrl(normalized)) {
    return null;
  }

  try {
    const parsed = new URL(normalized);
    const protocol = parsed.protocol.toLowerCase();
    if (protocol !== "http:" && protocol !== "https:" && protocol !== "mailto:") {
      return null;
    }
    return normalized;
  } catch {
    return null;
  }
}

function trimTrailingPunctuation(value: string): { token: string; trailing: string } {
  let end = value.length;
  while (end > 0 && /[),.;!?]/.test(value[end - 1] ?? "")) {
    end -= 1;
  }

  return {
    token: value.slice(0, end),
    trailing: value.slice(end),
  };
}

function secureAnchor(anchor: HTMLAnchorElement): void {
  const href = anchor.getAttribute("href") ?? "";
  if (!href || isUnsafeUrl(href)) {
    anchor.removeAttribute("href");
    return;
  }

  anchor.setAttribute("target", "_blank");
  anchor.setAttribute("rel", "noopener noreferrer");
}

function isUnsafeUrl(value: string): boolean {
  const normalized = normalizeUrlForInspection(value);
  if (!normalized) {
    return true;
  }

  if (BLOCKED_URL_PROTOCOL.test(normalized)) {
    return true;
  }

  // Catch encoded or obfuscated javascript: schemes.
  if (/javascript\s*:/i.test(normalized)) {
    return true;
  }

  return false;
}

function normalizeUrlForInspection(value: string): string {
  let result = value.trim();

  // Decode common HTML character references used to bypass protocol checks.
  result = result
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number.parseInt(num, 10)))
    .replace(/&Tab;/gi, "")
    .replace(/&NewLine;/gi, "");

  // Remove control characters and whitespace that can hide dangerous schemes.
  result = result.replace(/[\u0000-\u001f\u007f-\u009f\s]+/g, "");

  return result.toLowerCase();
}
