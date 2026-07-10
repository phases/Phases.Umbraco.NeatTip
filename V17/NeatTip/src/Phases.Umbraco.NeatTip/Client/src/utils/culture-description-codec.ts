import type { CultureDescriptionMap, CultureResolutionContext } from "./culture-description.util.js";
import { cultureKey } from "./culture-description.util.js";

export const CULTURE_DESCRIPTION_PREFIX = "neattip://cultures/";

export function isCultureDescriptionStorage(description: string | undefined | null): boolean {
  return !!description?.startsWith(CULTURE_DESCRIPTION_PREFIX);
}

export function parseCultureDescriptionStorage(
  description: string | undefined | null,
): CultureDescriptionMap {
  if (!isCultureDescriptionStorage(description)) {
    return {};
  }

  try {
    const json = description!.slice(CULTURE_DESCRIPTION_PREFIX.length);
    const parsed = JSON.parse(json) as CultureDescriptionMap;
    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => value?.trim()),
    );
  } catch {
    return {};
  }
}

export function resolveCultureDescriptionStorage(
  description: string | undefined | null,
  cultureContext?: CultureResolutionContext,
): string {
  const trimmed = description?.trim() ?? "";
  if (!trimmed) {
    return "";
  }

  const map = parseCultureDescriptionStorage(trimmed);
  const entries = Object.keys(map);
  if (entries.length === 0) {
    return trimmed;
  }

  const activeCulture = cultureContext?.activeCulture;
  if (activeCulture !== undefined) {
    const activeText = lookupCultureValue(map, activeCulture);
    if (activeText) {
      return activeText;
    }
  }

  const fallbackCulture = cultureContext?.fallbackCulture;
  if (
    fallbackCulture !== undefined
    && cultureKey(fallbackCulture) !== cultureKey(activeCulture)
  ) {
    const fallbackText = lookupCultureValue(map, fallbackCulture);
    if (fallbackText) {
      return fallbackText;
    }
  }

  const first = Object.values(map).find((value) => value?.trim())?.trim();
  return first ?? "";
}

function lookupCultureValue(
  map: CultureDescriptionMap,
  culture: string | null | undefined,
): string {
  const key = cultureKey(culture);
  const direct = map[key]?.trim();
  if (direct) {
    return direct;
  }

  if (key === cultureKey(null)) {
    return "";
  }

  const match = Object.entries(map).find(
    ([entryKey]) => entryKey.toLowerCase() === key.toLowerCase(),
  );
  return match?.[1]?.trim() ?? "";
}

export function hydrateCultureDescriptionsFromStorage(
  layout: HTMLElement,
  storedDescription: string | undefined | null,
): void {
  const map = parseCultureDescriptionStorage(storedDescription);
  if (Object.keys(map).length === 0) {
    return;
  }

  const existing = layout.dataset.neattipCultureDescriptions;
  let merged = map;

  if (existing) {
    try {
      const parsed = JSON.parse(existing) as CultureDescriptionMap;
      merged = { ...map, ...parsed };
    } catch {
      merged = map;
    }
  }

  layout.dataset.neattipCultureDescriptions = JSON.stringify(merged);
}
