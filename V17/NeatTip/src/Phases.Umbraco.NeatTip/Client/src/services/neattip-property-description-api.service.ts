import { umbHttpClient } from "@umbraco-cms/backoffice/http-client";
import { NEATTIP_PROPERTY_DESCRIPTION_API_PATH } from "../settings/constants.js";

const bearerSecurity = [{ scheme: "bearer", type: "http" }] as const;

export type PropertyDescriptionUpdateTarget = {
  documentKey: string;
  contentTypeKey?: string;
  propertyAlias?: string;
  propertyKey?: string;
  propertyLabel?: string;
  culture?: string | null;
};

type PropertyDescriptionUpdatePayload = {
  documentKey: string;
  contentTypeKey?: string;
  propertyAlias?: string;
  propertyKey?: string;
  propertyLabel?: string;
  description: string;
  culture?: string;
};

export async function savePropertyDescriptionToApi(
  target: PropertyDescriptionUpdateTarget,
  description: string,
): Promise<{
  description: string;
  cultureDescription?: string;
  propertyDescription?: string;
  contentTypeKey?: string;
  propertyAlias?: string;
  propertyKey?: string;
}> {
  const payload: PropertyDescriptionUpdatePayload = {
    documentKey: target.documentKey,
    description: description.trim(),
  };

  if (target.propertyAlias?.trim()) {
    payload.propertyAlias = target.propertyAlias.trim();
  }

  if (target.contentTypeKey?.trim()) {
    payload.contentTypeKey = target.contentTypeKey.trim();
  }

  if (target.propertyKey?.trim()) {
    payload.propertyKey = target.propertyKey.trim();
  }

  if (target.propertyLabel?.trim()) {
    payload.propertyLabel = target.propertyLabel.trim();
  }

  const culture = target.culture?.trim();
  if (culture) {
    payload.culture = culture;
  }

  const response = await umbHttpClient.put({
    url: NEATTIP_PROPERTY_DESCRIPTION_API_PATH,
    security: bearerSecurity,
    body: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const body = response.data as {
    description?: string;
    cultureDescription?: string;
    propertyDescription?: string;
    contentTypeKey?: string;
    propertyAlias?: string;
    propertyKey?: string;
  } | undefined;
  return {
    description: body?.description ?? description.trim(),
    cultureDescription: body?.cultureDescription,
    propertyDescription: body?.propertyDescription,
    contentTypeKey: body?.contentTypeKey ? String(body.contentTypeKey).trim() : undefined,
    propertyAlias: body?.propertyAlias?.trim(),
    propertyKey: body?.propertyKey ? String(body.propertyKey).trim() : undefined,
  };
}
