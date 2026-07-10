const DOCUMENT_EDIT_PATTERN = /\/document\/edit\/([^/?#]+)/i;
const DOCUMENT_CULTURE_PATTERN = /\/document\/edit\/[^/?#]+\/([a-z]{2}(?:-[a-z]{2})?)\b/i;

export function resolveDocumentKeyFromLocation(
  location = `${window.location.pathname}${window.location.search}${window.location.hash}`,
): string | undefined {
  const match = location.match(DOCUMENT_EDIT_PATTERN);
  return match?.[1]?.trim() || undefined;
}

export function resolveCultureFromLocation(
  location = `${window.location.pathname}${window.location.search}${window.location.hash}`,
): string | undefined {
  const match = location.match(DOCUMENT_CULTURE_PATTERN);
  return match?.[1]?.trim() || undefined;
}
