import { umbHttpClient } from "@umbraco-cms/backoffice/http-client";
import { NEATTIP_PROPERTY_DESCRIPTIONS_API_PATH } from "../settings/constants.js";
import type { CultureDescriptionMap } from "../utils/culture-description.util.js";

const bearerSecurity = [{ scheme: "bearer", type: "http" }] as const;

export type PropertyHelperTextDto = {
  contentTypeKey: string;
  contentTypeName: string;
  propertyAlias: string;
  propertyName: string;
  propertyKey: string;
  propertyDescription: string;
  cultureMap: CultureDescriptionMap;
};

export type PropertyDescriptionsResponse = {
  contentTypeAlias: string;
  contentTypeKey?: string;
  defaultCulture?: string;
  properties: PropertyHelperTextDto[];
};

export async function fetchPropertyDescriptions(
  documentKey: string,
): Promise<PropertyDescriptionsResponse> {
  const response = await umbHttpClient.get({
    url: NEATTIP_PROPERTY_DESCRIPTIONS_API_PATH,
    security: bearerSecurity,
    query: {
      documentKey,
    },
    headers: {
      Accept: "application/json",
    },
  });

  const body = response.data as PropertyDescriptionsResponse | undefined;
  return {
    contentTypeAlias: body?.contentTypeAlias ?? "",
    contentTypeKey: normalizeGuid(body?.contentTypeKey),
    defaultCulture: body?.defaultCulture,
    properties: body?.properties ?? [],
  };
}

function normalizeGuid(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (value != null) {
    return String(value).trim();
  }

  return "";
}
