import { umbHttpClient } from "@umbraco-cms/backoffice/http-client";
import {
  applyNeatTipSettings,
  neattipRuntime,
  type NeatTipSettings,
} from "../config/neattip-runtime.js";
import { NEATTIP_CONFIG } from "../config/neattip.config.js";
import { NEATTIP_SETTINGS_API_PATH } from "../settings/constants.js";

const bearerSecurity = [{ scheme: "bearer", type: "http" }] as const;

function syncConfigFromRuntime(): void {
  NEATTIP_CONFIG.minLength = neattipRuntime.minLength;
}

function normalizeSettings(settings: NeatTipSettings): NeatTipSettings {
  const sections = (settings.editHelperTextAllowedSections ?? [])
    .map((section) => section?.trim())
    .filter((section): section is string => !!section);

  return {
    enabled: settings.enabled,
    minLength: Math.max(0, settings.minLength),
    editHelperTextAllowedSections:
      sections.length > 0
        ? sections
        : [...neattipRuntime.editHelperTextAllowedSections],
  };
}

function extractResponseData<T>(result: T | { data: T }): T {
  if (result && typeof result === "object" && "data" in result) {
    return (result as { data: T }).data;
  }

  return result as T;
}

async function getSettingsFromApi(): Promise<NeatTipSettings> {
  const result = await umbHttpClient.get({
    url: NEATTIP_SETTINGS_API_PATH,
    security: bearerSecurity,
  });

  return normalizeSettings(extractResponseData(result as NeatTipSettings | { data: NeatTipSettings }));
}

async function putSettingsToApi(settings: NeatTipSettings): Promise<NeatTipSettings> {
  const result = await umbHttpClient.put({
    url: NEATTIP_SETTINGS_API_PATH,
    security: bearerSecurity,
    body: normalizeSettings(settings),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return normalizeSettings(extractResponseData(result as NeatTipSettings | { data: NeatTipSettings }));
}

export async function loadNeatTipSettings(): Promise<NeatTipSettings> {
  const settings = await getSettingsFromApi();
  applyNeatTipSettings(settings);
  syncConfigFromRuntime();
  return settings;
}

export async function saveNeatTipSettings(
  settings: NeatTipSettings,
): Promise<NeatTipSettings> {
  const saved = await putSettingsToApi(settings);
  applyNeatTipSettings(saved);
  syncConfigFromRuntime();
  return saved;
}
