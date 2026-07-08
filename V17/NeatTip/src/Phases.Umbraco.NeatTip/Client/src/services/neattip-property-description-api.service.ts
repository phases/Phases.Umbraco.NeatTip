import { umbHttpClient } from "@umbraco-cms/backoffice/http-client";
import { NEATTIP_PROPERTY_DESCRIPTION_API_PATH } from "../settings/constants.js";

const bearerSecurity = [{ scheme: "bearer", type: "http" }] as const;

export type PropertyDescriptionUpdateTarget = {
  documentKey: string;
  propertyAlias?: string;
  propertyKey?: string;
  propertyLabel?: string;
};

type PropertyDescriptionUpdatePayload = {
  documentKey: string;
  propertyAlias?: string;
  propertyKey?: string;
  propertyLabel?: string;
  description: string;
};

export async function savePropertyDescriptionToApi(
  target: PropertyDescriptionUpdateTarget,
  description: string,
): Promise<void> {
  const payload: PropertyDescriptionUpdatePayload = {
    documentKey: target.documentKey,
    description: description.trim(),
  };

  if (target.propertyAlias?.trim()) {
    payload.propertyAlias = target.propertyAlias.trim();
  }

  if (target.propertyKey?.trim()) {
    payload.propertyKey = target.propertyKey.trim();
  }

  if (target.propertyLabel?.trim()) {
    payload.propertyLabel = target.propertyLabel.trim();
  }

  await umbHttpClient.put({
    url: NEATTIP_PROPERTY_DESCRIPTION_API_PATH,
    security: bearerSecurity,
    body: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
