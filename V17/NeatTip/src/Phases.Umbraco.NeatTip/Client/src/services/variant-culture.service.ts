import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import {
  UMB_VARIANT_CONTEXT,
  type UmbVariantContext,
} from "@umbraco-cms/backoffice/variant";
import { cultureKey } from "../utils/culture-description.util.js";
import { resolveCultureFromLocation } from "../utils/document-context.util.js";

const DISPLAY_CULTURE_OBSERVE_ALIAS = "neattip-display-culture";
const FALLBACK_CULTURE_OBSERVE_ALIAS = "neattip-fallback-culture";

export type CultureChangeListener = (
  activeCulture: string | null | undefined,
  previousCulture: string | null | undefined,
) => void;

/**
 * Observes Umbraco's workspace variant context for the active editing culture.
 */
export class VariantCultureService extends UmbControllerBase {
  #activeCulture: string | null | undefined;
  #fallbackCulture: string | null | undefined;
  #listeners = new Set<CultureChangeListener>();

  constructor(host: UmbControllerHost) {
    super(host);

    this.consumeContext(UMB_VARIANT_CONTEXT, (variantContext) => {
      this.#observeVariantContext(variantContext);
    });
  }

  getActiveCulture(): string | null | undefined {
    return resolveCultureFromLocation() ?? this.#activeCulture ?? null;
  }

  getFallbackCulture(): string | null | undefined {
    return this.#fallbackCulture;
  }

  getResolutionContext(): {
    activeCulture: string | null | undefined;
    fallbackCulture: string | null | undefined;
  } {
    return {
      activeCulture: this.getActiveCulture(),
      fallbackCulture: this.#fallbackCulture,
    };
  }

  subscribe(listener: CultureChangeListener): () => void {
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  }

  destroy(): void {
    this.#listeners.clear();
    this.removeUmbControllerByAlias(DISPLAY_CULTURE_OBSERVE_ALIAS);
    this.removeUmbControllerByAlias(FALLBACK_CULTURE_OBSERVE_ALIAS);
    super.destroy();
  }

  #observeVariantContext(variantContext: UmbVariantContext | undefined): void {
    if (!variantContext) {
      return;
    }

    this.observe(
      variantContext.displayCulture,
      (culture) => {
        const previous = this.#activeCulture;
        const next = culture ?? null;
        this.#activeCulture = next;

        if (cultureKey(previous) === cultureKey(next)) {
          return;
        }

        this.#listeners.forEach((listener) => listener(next, previous));
      },
      DISPLAY_CULTURE_OBSERVE_ALIAS,
    );

    this.observe(
      variantContext.fallbackCulture,
      (culture) => {
        this.#fallbackCulture = culture ?? null;
      },
      FALLBACK_CULTURE_OBSERVE_ALIAS,
    );
  }
}
