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
  /** True only when the server authorizes helper-text editing. */
  canEditHelperText: boolean;
}

/**
 * Default section aliases returned by settings for documentation/config parity.
 * Authorization is evaluated server-side; the client does not apply this list.
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
 * Encapsulates permission checks for tooltip actions.
 *
 * Edit permission comes from the server-evaluated `canEditHelperText` flag
 * (GET /neattip/settings), which uses the same rules as PUT property-description.
 * The client never infers edit access locally.
 *
 * Observes `UMB_CURRENT_USER_CONTEXT` so callers can refresh server permission
 * when the current user changes.
 */
export class NeatTipPermissionsService extends UmbControllerBase {
  #permissions: NeatTipTooltipPermissions = { ...SAFE_DEFAULT_PERMISSIONS };
  #serverCanEditHelperText: boolean | undefined;
  #listeners = new Set<(permissions: NeatTipTooltipPermissions) => void>();
  #userChangeListeners = new Set<() => void>();
  #currentUser: UmbCurrentUserModel | undefined;
  #userKnown = false;
  #lastUserUnique: string | undefined;

  constructor(host: UmbControllerHost) {
    super(host);

    this.consumeContext(UMB_CURRENT_USER_CONTEXT, (context) => {
      this.observe(
        context?.currentUser,
        (user) => {
          const previousUnique = this.#lastUserUnique;
          this.#currentUser = user;
          this.#userKnown = user !== undefined;
          this.#lastUserUnique = user?.unique;

          if (previousUnique !== this.#lastUserUnique) {
            this.#notifyUserChanged();
          }

          this.#recalculate();
        },
        CURRENT_USER_OBSERVE_ALIAS,
      );
    });
  }

  /**
   * Applies the server-evaluated edit permission flag.
   * Undefined resets to the safe default (deny edit).
   */
  setServerCanEditHelperText(canEdit: boolean | undefined): void {
    this.#serverCanEditHelperText = canEdit;
    this.#recalculate();
  }

  /**
   * Subscribe to current-user identity changes so server permission can be refreshed.
   */
  onUserChanged(listener: () => void): () => void {
    this.#userChangeListeners.add(listener);
    return () => {
      this.#userChangeListeners.delete(listener);
    };
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
    this.#userChangeListeners.clear();
    this.#currentUser = undefined;
    this.#userKnown = false;
    this.#lastUserUnique = undefined;
    this.#serverCanEditHelperText = undefined;
    this.#permissions = { ...SAFE_DEFAULT_PERMISSIONS };
    super.destroy();
  }

  #notifyUserChanged(): void {
    for (const listener of this.#userChangeListeners) {
      listener();
    }
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
      canEditHelperText: this.#serverCanEditHelperText === true,
    };
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
