import { NEATTIP_SETTINGS_CHANGED_EVENT } from "../settings/constants.js";
import { DEFAULT_EDIT_HELPER_TEXT_ALLOWED_SECTIONS } from "../services/permissions.service.js";

export interface NeatTipSettings {
  enabled: boolean;
  minLength: number;
  editHelperTextAllowedSections?: string[];
}

export const neattipRuntime = {
  enabled: true,
  minLength: 0,
  settingsLoaded: false,
  editHelperTextAllowedSections: [
    ...DEFAULT_EDIT_HELPER_TEXT_ALLOWED_SECTIONS,
  ] as string[],
};

export function applyNeatTipSettings(settings: NeatTipSettings): void {
  neattipRuntime.enabled = settings.enabled;
  neattipRuntime.minLength = Math.max(0, settings.minLength);
  neattipRuntime.editHelperTextAllowedSections =
    normalizeEditSections(settings.editHelperTextAllowedSections);
  neattipRuntime.settingsLoaded = true;
}

function normalizeEditSections(sections: string[] | undefined): string[] {
  const normalized = (sections ?? [])
    .map((section) => section?.trim())
    .filter((section): section is string => !!section);

  return normalized.length > 0
    ? normalized
    : [...DEFAULT_EDIT_HELPER_TEXT_ALLOWED_SECTIONS];
}

export function dispatchNeatTipSettingsChanged(): void {
  window.dispatchEvent(new CustomEvent(NEATTIP_SETTINGS_CHANGED_EVENT));
}
