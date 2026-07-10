import {
  descriptionOverrideService,
  type PropertyIdentity,
} from "./description-override.service.js";
import {
  fetchPropertyDescriptions,
  type PropertyHelperTextDto,
} from "./helper-text-api.service.js";
import { resolveDocumentKeyFromLocation } from "../utils/document-context.util.js";
import {
  type CultureDescriptionMap,
  writeCultureDescriptions,
} from "../utils/culture-description.util.js";
import { isCultureDescriptionStorage } from "../utils/culture-description-codec.js";

const PROPERTY_DESCRIPTION_FALLBACK_DATASET = "neattipPropertyDescriptionFallback";

type DocumentCache = {
  documentContentTypeKey: string;
  contentTypeKeyByName: Map<string, string>;
  documentPropertiesByAlias: Map<string, PropertyHelperTextDto>;
  documentPropertiesByLabel: Map<string, PropertyHelperTextDto>;
  propertiesByAlias: Map<string, PropertyHelperTextDto[]>;
  propertiesByKey: Map<string, PropertyHelperTextDto>;
  propertiesByLabel: Map<string, PropertyHelperTextDto[]>;
  propertiesByContentTypeAndAlias: Map<string, PropertyHelperTextDto>;
};

class HelperTextService {
  #cache: DocumentCache | undefined;
  #loadedDocumentKey: string | undefined;
  #loadingPromise: Promise<void> | undefined;
  #defaultCulture: string | undefined;

  getDefaultCulture(): string | undefined {
    return this.#defaultCulture;
  }

  resolveContentTypeKeyByName(contentTypeName: string | undefined): string | undefined {
    if (!this.#cache || !contentTypeName?.trim()) {
      return undefined;
    }

    return this.#cache.contentTypeKeyByName.get(contentTypeName.trim().toLowerCase());
  }

  async ensureLoaded(documentKey = resolveDocumentKeyFromLocation()): Promise<void> {
    if (!documentKey) {
      return;
    }

    if (this.#loadedDocumentKey === documentKey && this.#cache) {
      return;
    }

    if (this.#loadingPromise) {
      await this.#loadingPromise;
      if (this.#loadedDocumentKey === documentKey && this.#cache) {
        return;
      }
    }

    this.#loadingPromise = this.#load(documentKey).finally(() => {
      this.#loadingPromise = undefined;
    });

    await this.#loadingPromise;
  }

  invalidate(): void {
    this.#cache = undefined;
    this.#loadedDocumentKey = undefined;
    this.#loadingPromise = undefined;
    this.#defaultCulture = undefined;
  }

  applyToLayout(layout: HTMLElement): void {
    const helperText = this.#resolveHelperTextForLayout(layout);
    if (!helperText) {
      return;
    }

    if (Object.keys(helperText.cultureMap).length > 0) {
      writeCultureDescriptions(layout, helperText.cultureMap);
    }

    const fallback = helperText.propertyDescription?.trim();
    if (fallback) {
      layout.dataset[PROPERTY_DESCRIPTION_FALLBACK_DATASET] = fallback;
      const original = layout.dataset.neattipOriginalDescription?.trim();
      const hasCultureMap = Object.keys(helperText.cultureMap).length > 0;
      if ((!original || !isCultureDescriptionStorage(original)) && !hasCultureMap) {
        layout.dataset.neattipOriginalDescription = fallback;
      }
    }
  }

  updateFromSave(
    propertyAlias: string | undefined,
    propertyKey: string | undefined,
    cultureMap: CultureDescriptionMap,
    propertyDescription = "",
    contentTypeKey?: string,
  ): void {
    if (!this.#cache) {
      return;
    }

    const existing = this.#findCachedProperty(
      propertyAlias,
      propertyKey,
      undefined,
      contentTypeKey,
    );
    const next: PropertyHelperTextDto = {
      contentTypeKey: contentTypeKey ?? existing?.contentTypeKey ?? "",
      contentTypeName: existing?.contentTypeName ?? "",
      propertyAlias: propertyAlias ?? existing?.propertyAlias ?? "",
      propertyName: existing?.propertyName ?? "",
      propertyKey: propertyKey ?? existing?.propertyKey ?? "",
      propertyDescription: propertyDescription || existing?.propertyDescription || "",
      cultureMap: { ...(existing?.cultureMap ?? {}), ...cultureMap },
    };

    this.#indexProperty(next);
  }

  async #load(documentKey: string): Promise<void> {
    const response = await fetchPropertyDescriptions(documentKey);
    const documentContentTypeKey = normalizeGuid(response.contentTypeKey).toLowerCase();
    const contentTypeKeyByName = new Map<string, string>();
    const documentPropertiesByAlias = new Map<string, PropertyHelperTextDto>();
    const documentPropertiesByLabel = new Map<string, PropertyHelperTextDto>();
    const propertiesByAlias = new Map<string, PropertyHelperTextDto[]>();
    const propertiesByKey = new Map<string, PropertyHelperTextDto>();
    const propertiesByLabel = new Map<string, PropertyHelperTextDto[]>();
    const propertiesByContentTypeAndAlias = new Map<string, PropertyHelperTextDto>();

    for (const property of response.properties) {
      const normalized = normalizeProperty(property);
      const isDocumentProperty =
        !!documentContentTypeKey
        && normalized.contentTypeKey.toLowerCase() === documentContentTypeKey;

      this.#indexPropertyInMaps(
        normalized,
        propertiesByAlias,
        propertiesByKey,
        propertiesByLabel,
        propertiesByContentTypeAndAlias,
        contentTypeKeyByName,
        isDocumentProperty ? documentPropertiesByAlias : undefined,
        isDocumentProperty ? documentPropertiesByLabel : undefined,
      );
    }

    this.#cache = {
      documentContentTypeKey,
      contentTypeKeyByName,
      documentPropertiesByAlias,
      documentPropertiesByLabel,
      propertiesByAlias,
      propertiesByKey,
      propertiesByLabel,
      propertiesByContentTypeAndAlias,
    };
    this.#loadedDocumentKey = documentKey;
    this.#defaultCulture = response.defaultCulture?.trim() || undefined;
  }

  #resolveHelperTextForLayout(layout: HTMLElement): PropertyHelperTextDto | undefined {
    if (!this.#cache) {
      return undefined;
    }

    const identity = descriptionOverrideService.resolvePropertyIdentity(layout);
    const contentTypeKey =
      identity?.contentTypeKey
      || this.resolveContentTypeKeyByName(identity?.blockContentTypeName);

    return this.#findCachedProperty(
      identity?.propertyAlias,
      identity?.propertyKey,
      identity?.propertyLabel,
      contentTypeKey,
      identity?.isElementPropertyContext === true,
    );
  }

  #findCachedProperty(
    propertyAlias: string | undefined,
    propertyKey: string | undefined,
    propertyLabel: string | undefined,
    contentTypeKey: string | undefined,
    isElementPropertyContext = false,
  ): PropertyHelperTextDto | undefined {
    if (!this.#cache) {
      return undefined;
    }

    const key = normalizeGuid(propertyKey).toLowerCase();
    if (key) {
      const byKey = this.#cache.propertiesByKey.get(key);
      if (byKey) {
        return byKey;
      }
    }

    const layoutContentTypeKey = normalizeGuid(contentTypeKey).toLowerCase();
    const alias = propertyAlias?.trim().toLowerCase();
    const label = propertyLabel?.trim().toLowerCase();

    if (layoutContentTypeKey && alias) {
      const byComposite = this.#cache.propertiesByContentTypeAndAlias.get(
        `${layoutContentTypeKey}:${alias}`,
      );
      if (byComposite) {
        return byComposite;
      }
    }

    if (!layoutContentTypeKey && alias && !isElementPropertyContext) {
      const documentMatch = this.#cache.documentPropertiesByAlias.get(alias);
      if (documentMatch) {
        return documentMatch;
      }
    }

    if (!layoutContentTypeKey && label && !isElementPropertyContext) {
      const documentMatch = this.#cache.documentPropertiesByLabel.get(label);
      if (documentMatch) {
        return documentMatch;
      }
    }

    if (alias) {
      const aliasMatches = this.#cache.propertiesByAlias.get(alias);
      const disambiguated = this.#disambiguateMatches(
        aliasMatches,
        propertyLabel,
        layoutContentTypeKey || undefined,
      );
      if (disambiguated) {
        return disambiguated;
      }
    }

    if (label) {
      const labelMatches = this.#cache.propertiesByLabel.get(label);
      return this.#disambiguateMatches(
        labelMatches,
        propertyLabel,
        layoutContentTypeKey || undefined,
      );
    }

    return undefined;
  }

  #disambiguateMatches(
    matches: PropertyHelperTextDto[] | undefined,
    propertyLabel: string | undefined,
    layoutContentTypeKey: string | undefined,
  ): PropertyHelperTextDto | undefined {
    if (!matches?.length) {
      return undefined;
    }

    if (layoutContentTypeKey) {
      const byLayoutContentType = matches.filter(
        (match) => match.contentTypeKey.toLowerCase() === layoutContentTypeKey,
      );
      if (byLayoutContentType.length === 1) {
        return byLayoutContentType[0];
      }
    }

    if (matches.length === 1) {
      return matches[0];
    }

    const normalizedLabel = propertyLabel?.trim();
    if (!normalizedLabel) {
      return undefined;
    }

    const byContentTypeName = matches.filter(
      (match) => match.contentTypeName?.toLowerCase() === normalizedLabel.toLowerCase(),
    );
    if (byContentTypeName.length === 1) {
      return byContentTypeName[0];
    }

    const byPropertyName = matches.filter(
      (match) => match.propertyName?.toLowerCase() === normalizedLabel.toLowerCase(),
    );
    if (byPropertyName.length === 1) {
      return byPropertyName[0];
    }

    return undefined;
  }

  #indexProperty(property: PropertyHelperTextDto): void {
    if (!this.#cache) {
      return;
    }

    const isDocumentProperty =
      !!this.#cache.documentContentTypeKey
      && property.contentTypeKey.toLowerCase() === this.#cache.documentContentTypeKey;

    this.#indexPropertyInMaps(
      property,
      this.#cache.propertiesByAlias,
      this.#cache.propertiesByKey,
      this.#cache.propertiesByLabel,
      this.#cache.propertiesByContentTypeAndAlias,
      this.#cache.contentTypeKeyByName,
      isDocumentProperty ? this.#cache.documentPropertiesByAlias : undefined,
      isDocumentProperty ? this.#cache.documentPropertiesByLabel : undefined,
    );
  }

  #indexPropertyInMaps(
    property: PropertyHelperTextDto,
    propertiesByAlias: Map<string, PropertyHelperTextDto[]>,
    propertiesByKey: Map<string, PropertyHelperTextDto>,
    propertiesByLabel: Map<string, PropertyHelperTextDto[]>,
    propertiesByContentTypeAndAlias: Map<string, PropertyHelperTextDto>,
    contentTypeKeyByName: Map<string, string>,
    documentPropertiesByAlias?: Map<string, PropertyHelperTextDto>,
    documentPropertiesByLabel?: Map<string, PropertyHelperTextDto>,
  ): void {
    if (property.propertyAlias) {
      const alias = property.propertyAlias.toLowerCase();
      const existing = propertiesByAlias.get(alias) ?? [];
      if (!existing.some((entry) => entry.propertyKey === property.propertyKey)) {
        existing.push(property);
        propertiesByAlias.set(alias, existing);
      }

      documentPropertiesByAlias?.set(alias, property);
    }

    const propertyKey = normalizeGuid(property.propertyKey).toLowerCase();
    if (propertyKey) {
      propertiesByKey.set(propertyKey, property);
    }

    if (property.propertyName) {
      const propertyLabel = property.propertyName.toLowerCase();
      const existing = propertiesByLabel.get(propertyLabel) ?? [];
      if (!existing.some((entry) => entry.propertyKey === property.propertyKey)) {
        existing.push(property);
        propertiesByLabel.set(propertyLabel, existing);
      }

      documentPropertiesByLabel?.set(propertyLabel, property);
    }

    const contentTypeKey = normalizeGuid(property.contentTypeKey).toLowerCase();
    if (contentTypeKey && property.propertyAlias) {
      const compositeKey = `${contentTypeKey}:${property.propertyAlias.toLowerCase()}`;
      propertiesByContentTypeAndAlias.set(compositeKey, property);
    }

    if (property.contentTypeName && contentTypeKey) {
      contentTypeKeyByName.set(property.contentTypeName.toLowerCase(), contentTypeKey);
    }
  }
}

function normalizeProperty(property: PropertyHelperTextDto): PropertyHelperTextDto {
  return {
    contentTypeKey: normalizeGuid(property.contentTypeKey),
    contentTypeName: property.contentTypeName?.trim() ?? "",
    propertyAlias: property.propertyAlias?.trim() ?? "",
    propertyName: property.propertyName?.trim() ?? "",
    propertyKey: normalizeGuid(property.propertyKey),
    propertyDescription: property.propertyDescription?.trim() ?? "",
    cultureMap: property.cultureMap ?? {},
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

export const helperTextService = new HelperTextService();

export function getPropertyDescriptionFallback(layout: HTMLElement): string | undefined {
  const value = layout.dataset[PROPERTY_DESCRIPTION_FALLBACK_DATASET]?.trim();
  return value || undefined;
}

export type { PropertyIdentity };
