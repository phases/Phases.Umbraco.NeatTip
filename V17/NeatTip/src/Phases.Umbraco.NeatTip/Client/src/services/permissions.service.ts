import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import {
  UMB_CURRENT_USER_CONTEXT,
  type UmbCurrentUserModel,
} from "@umbraco-cms/backoffice/current-user";

/**
 * Tooltip actions gated by NeatTipPermissionsService.
 * Add new values here when introducing additional tooltip actions.
 */
export type NeatTipTooltipAction = "copy" | "edit";

export interface NeatTipTooltipPermissions {
  /** Always allowed when the permission state is unknown or loaded. */
  canCopy: boolean;
  /** True only when Umbraco authorizes helper-text editing. */
  canEditHelperText: boolean;
}

/**
 * Default section aliases that grant Edit helper text.
 * Mirrors Umbraco Settings access (Document Types live under Settings).
 * Overridable via NeatTip:EditHelperTextAllowedSections — do not hardcode role names.
 */
export const DEFAULT_EDIT_HELPER_TEXT_ALLOWED_SECTIONS = [
  "Umb.Section.Settings",
] as const;

const SAFE_DEFAULT_PERMISSIONS: NeatTipTooltipPermissions = {
  canCopy: true,
  canEditHelperText: false,
};

const CURRENT_USER_OBSERVE_ALIAS = Symbol("neattip-current-user");

/**
 * Encapsulates Umbraco-native permission checks for tooltip actions.
 *
 * Evaluation order for Edit:
 * 1. If the current user cannot be determined → deny Edit (allow Copy).
 * 2. If `isAdmin` (Umbraco flag) → allow Edit.
 * 3. If any configured section alias is in `allowedSections` → allow Edit.
 * 4. Otherwise → deny Edit.
 *
 * Observes `UMB_CURRENT_USER_CONTEXT` so permission changes after login
 * (group updates / current-user reload) notify subscribers without mixing
 * auth logic into tooltip rendering.
 */
export class NeatTipPermissionsService extends UmbControllerBase {
  #permissions: NeatTipTooltipPermissions = { ...SAFE_DEFAULT_PERMISSIONS };
  #allowedSections: string[] = [...DEFAULT_EDIT_HELPER_TEXT_ALLOWED_SECTIONS];
  #listeners = new Set<(permissions: NeatTipTooltipPermissions) => void>();
  #currentUser: UmbCurrentUserModel | undefined;
  #userKnown = false;

  constructor(host: UmbControllerHost) {
    super(host);

    this.consumeContext(UMB_CURRENT_USER_CONTEXT, (context) => {
      this.observe(
        context?.currentUser,
        (user) => {
          this.#currentUser = user;
          this.#userKnown = user !== undefined;
          this.#recalculate();
        },
        CURRENT_USER_OBSERVE_ALIAS,
      );
    });
  }

  /**
   * Replaces the section aliases that grant Edit helper text.
   * Empty/invalid values fall back to the package default.
   */
  setEditHelperTextAllowedSections(sections: string[] | undefined | null): void {
    const normalized = (sections ?? [])
      .map((section) => section?.trim())
      .filter((section): section is string => !!section);

    this.#allowedSections =
      normalized.length > 0
        ? normalized
        : [...DEFAULT_EDIT_HELPER_TEXT_ALLOWED_SECTIONS];

    this.#recalculate();
  }

  getPermissions(): NeatTipTooltipPermissions {
    return { ...this.#permissions };
  }

  /**
   * Returns actions the current user may see in the tooltip.
   * Prefer this over disabling items — unauthorized actions are omitted.
   */
  getAllowedActions(): NeatTipTooltipAction[] {
    const actions: NeatTipTooltipAction[] = [];
    if (this.#permissions.canCopy) {
      actions.push("copy");
    }
    if (this.#permissions.canEditHelperText) {
      actions.push("edit");
    }
    return actions;
  }

  canPerform(action: NeatTipTooltipAction): boolean {
    switch (action) {
      case "copy":
        return this.#permissions.canCopy;
      case "edit":
        return this.#permissions.canEditHelperText;
      default:
        return false;
    }
  }

  subscribe(
    listener: (permissions: NeatTipTooltipPermissions) => void,
  ): () => void {
    this.#listeners.add(listener);
    listener(this.getPermissions());
    return () => {
      this.#listeners.delete(listener);
    };
  }

  override destroy(): void {
    this.#listeners.clear();
    this.#currentUser = undefined;
    this.#userKnown = false;
    this.#permissions = { ...SAFE_DEFAULT_PERMISSIONS };
    super.destroy();
  }

  #recalculate(): void {
    this.#setPermissions(this.#evaluatePermissions());
  }

  #evaluatePermissions(): NeatTipTooltipPermissions {
    if (!this.#userKnown || !this.#currentUser) {
      return { ...SAFE_DEFAULT_PERMISSIONS };
    }

    return {
      canCopy: true,
      canEditHelperText: this.#evaluateCanEdit(this.#currentUser),
    };
  }

  #evaluateCanEdit(user: UmbCurrentUserModel): boolean {
    if (user.isAdmin === true) {
      return true;
    }

    const allowedSections = user.allowedSections ?? [];
    if (!Array.isArray(allowedSections)) {
      return false;
    }

    return this.#allowedSections.some((section) =>
      allowedSections.includes(section),
    );
  }

  #setPermissions(next: NeatTipTooltipPermissions): void {
    const changed =
      next.canCopy !== this.#permissions.canCopy ||
      next.canEditHelperText !== this.#permissions.canEditHelperText;

    this.#permissions = next;

    if (!changed) {
      return;
    }

    for (const listener of this.#listeners) {
      listener(this.getPermissions());
    }
  }
}
