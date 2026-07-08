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
const BLOCKED_TAGS = new Set(["script", "style", "iframe", "object", "embed", "link", "meta"]);
const BLOCKED_URL_PROTOCOL = /^(?:javascript|data|vbscript):/i;

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
  if (BLOCKED_TAGS.has(tagName)) {
    node.remove();
    return;
  }

  for (const attribute of Array.from(node.attributes)) {
    const name = attribute.name.toLowerCase();
    if (name.startsWith("on")) {
      node.removeAttribute(attribute.name);
      continue;
    }

    if (name === "href" || name === "src") {
      const value = attribute.value.trim();
      if (BLOCKED_URL_PROTOCOL.test(value)) {
        node.removeAttribute(attribute.name);
      }
    }
  }

  if (tagName === "a") {
    node.classList.add("neattip-link");
    secureAnchor(node as HTMLAnchorElement);
  }

  for (const child of Array.from(node.childNodes)) {
    sanitizeNode(child);
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
  if (!token) {
    return null;
  }

  const normalized = token.startsWith("www.")
    ? `https://${token}`
    : token.includes("@") && !token.startsWith("mailto:")
      ? `mailto:${token}`
      : token;

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
  if (!href || BLOCKED_URL_PROTOCOL.test(href.trim())) {
    anchor.removeAttribute("href");
    return;
  }

  anchor.setAttribute("target", "_blank");
  anchor.setAttribute("rel", "noopener noreferrer");
}
