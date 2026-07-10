import { hydrateCultureDescriptionsFromStorage } from "./culture-description-codec.js";

const CULTURE_DESCRIPTIONS_DATASET = "neattipCultureDescriptions";
const ORIGINAL_DESCRIPTION_DATASET = "neattipOriginalDescription";
export const INVARIANT_CULTURE_KEY = "__invariant__";

export type CultureDescriptionMap = Record<string, string>;

export interface CultureResolutionContext {
  activeCulture?: string | null;
  fallbackCulture?: string | null;
}

export function cultureKey(culture: string | null | undefined): string {
  const trimmed = culture?.trim();
  return trimmed ? trimmed : INVARIANT_CULTURE_KEY;
}

export function parseCultureDescriptions(layout: HTMLElement): CultureDescriptionMap {
  const raw = layout.dataset[CULTURE_DESCRIPTIONS_DATASET];
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as CultureDescriptionMap;
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

export function writeCultureDescriptions(
  layout: HTMLElement,
  map: CultureDescriptionMap,
): void {
  const entries = Object.entries(map).filter(([, value]) => value.trim());
  if (entries.length === 0) {
    delete layout.dataset[CULTURE_DESCRIPTIONS_DATASET];
    return;
  }

  layout.dataset[CULTURE_DESCRIPTIONS_DATASET] = JSON.stringify(Object.fromEntries(entries));
}

export function getCultureDescription(
  layout: HTMLElement,
  culture: string | null | undefined,
): string | undefined {
  const map = parseCultureDescriptions(layout);
  const key = cultureKey(culture);
  const direct = map[key]?.trim();
  if (direct) {
    return direct;
  }

  if (key === INVARIANT_CULTURE_KEY) {
    return undefined;
  }

  const match = Object.entries(map).find(
    ([entryKey]) => entryKey.toLowerCase() === key.toLowerCase(),
  );
  return match?.[1]?.trim() || undefined;
}

export function setCultureDescription(
  layout: HTMLElement,
  culture: string | null | undefined,
  description: string,
): void {
  const key = cultureKey(culture);
  const map = parseCultureDescriptions(layout);
  const value = description.trim();

  if (!value) {
    delete map[key];
  } else {
    map[key] = value;
  }

  writeCultureDescriptions(layout, map);
}

export function captureOriginalDescription(layout: HTMLElement): void {
  if (layout.dataset[ORIGINAL_DESCRIPTION_DATASET]?.trim()) {
    return;
  }

  if (Object.keys(parseCultureDescriptions(layout)).length > 0) {
    return;
  }

  const host = layout as HTMLElement & { description?: string };
  const candidate =
    host.description?.trim()
    || layout.getAttribute("description")?.trim()
    || layout.dataset.neattipStoredDescription?.trim();

  if (candidate) {
    layout.dataset[ORIGINAL_DESCRIPTION_DATASET] = candidate;
    hydrateCultureDescriptionsFromStorage(layout, candidate);
  }
}

export function getOriginalDescription(layout: HTMLElement): string {
  return layout.dataset[ORIGINAL_DESCRIPTION_DATASET]?.trim() ?? "";
}
