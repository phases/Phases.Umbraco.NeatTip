import { NEATTIP_CONFIG } from "../config/neattip.config.js";
import { resolvePropertyDescription } from "./label-placement.service.js";
import { descriptionOverrideService } from "./description-override.service.js";
import { savePropertyDescriptionToApi } from "./neattip-property-description-api.service.js";
import {
  NeatTipPermissionsService,
  type NeatTipTooltipAction,
} from "./permissions.service.js";
import { TooltipDragService } from "./tooltip-drag.service.js";
import {
  getLayoutForIndicator,
  getRenderedDescriptionHtml,
  renderMarkdownAsHtml,
} from "./tooltip-content.service.js";
import { TooltipPositionService, type TooltipPosition } from "./tooltip-position.service.js";

export class TooltipManagerService {
  #tooltip: HTMLElement | undefined;
  #activeIndicator: HTMLElement | undefined;
  #showTimeout: ReturnType<typeof setTimeout> | undefined;
  #hideTimeout: ReturnType<typeof setTimeout> | undefined;
  #copyFeedbackTimeout: ReturnType<typeof setTimeout> | undefined;
  #saveFeedbackTimeout: ReturnType<typeof setTimeout> | undefined;
  #isTooltipToggled = false;
  #isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  #unsubscribePermissions: (() => void) | undefined;

  readonly #positionService = new TooltipPositionService();
  readonly #dragService = new TooltipDragService();
  readonly #permissions: NeatTipPermissionsService;

  constructor(permissions: NeatTipPermissionsService) {
    this.#permissions = permissions;
  }

  start(): void {
    document.addEventListener("click", this.#onDocumentClick, true);
    document.addEventListener("keydown", this.#onDocumentKeyDown);
    window.addEventListener("scroll", this.#onScrollOrResize, true);
    document.addEventListener("scroll", this.#onScrollOrResize, true);
    window.addEventListener("resize", this.#onScrollOrResize);
    window.addEventListener("popstate", this.#onNavigation);
    window.addEventListener("hashchange", this.#onNavigation);
    this.#unsubscribePermissions = this.#permissions.subscribe(() => {
      if (this.#tooltip) {
        this.#renderEmptyState(
          this.#tooltip,
          this.#tooltip.dataset.neattipCurrentMarkdown ?? "",
        );
        this.#renderAllowedActions(this.#tooltip);
        if (
          this.#tooltip.classList.contains("neattip-mode-edit") &&
          !this.#permissions.canPerform("edit")
        ) {
          this.#exitEditMode();
        }
      }
    });
  }

  stop(): void {
    this.hide(true);
    clearTimeout(this.#copyFeedbackTimeout);
    clearTimeout(this.#saveFeedbackTimeout);
    this.#unsubscribePermissions?.();
    this.#unsubscribePermissions = undefined;
    document.removeEventListener("click", this.#onDocumentClick, true);
    document.removeEventListener("keydown", this.#onDocumentKeyDown);
    window.removeEventListener("scroll", this.#onScrollOrResize, true);
    document.removeEventListener("scroll", this.#onScrollOrResize, true);
    window.removeEventListener("resize", this.#onScrollOrResize);
    window.removeEventListener("popstate", this.#onNavigation);
    window.removeEventListener("hashchange", this.#onNavigation);
    const handle = this.#tooltip?.querySelector<HTMLElement>(".neattip-tooltip-header");
    if (this.#tooltip && handle) {
      this.#dragService.teardown(this.#tooltip, handle);
    }
    this.#tooltip?.remove();
    this.#tooltip = undefined;
  }

  show(indicator: HTMLElement, markdown: string, isClick = false): void {
    clearTimeout(this.#showTimeout);
    clearTimeout(this.#hideTimeout);

    if (isClick) {
      this.#isTooltipToggled = true;
    }

    const delay = isClick || this.#isTouchDevice ? 0 : NEATTIP_CONFIG.tooltipDelay;

    this.#showTimeout = setTimeout(() => {
      const tooltip = this.#ensureTooltip();
      tooltip.style.pointerEvents = "none";
      tooltip.classList.remove("neattip-visible", "neattip-bottom");
      tooltip.style.maxWidth = `${NEATTIP_CONFIG.tooltipMaxWidth}px`;

      const contentHost = tooltip.querySelector<HTMLElement>(".neattip-tooltip-content");
      const layout = getLayoutForIndicator(indicator);
      const resolvedMarkdown =
        markdown.trim()
        || indicator.dataset.neattipMarkdown?.trim()
        || layout?.dataset.neattipStoredDescription?.trim()
        || (layout ? resolvePropertyDescription(layout) : "")
        || "";
      const html = layout
        ? getRenderedDescriptionHtml(layout, resolvedMarkdown)
        : renderMarkdownAsHtml(resolvedMarkdown);

      if (contentHost) {
        contentHost.innerHTML = html;
      }

      tooltip.dataset.neattipCurrentMarkdown = resolvedMarkdown;
      this.#syncTooltipActions(tooltip, resolvedMarkdown);

      tooltip.style.display = "block";
      void tooltip.offsetHeight;

      const indicatorId = indicator.dataset.neattipId ?? crypto.randomUUID();
      indicator.dataset.neattipId = indicatorId;

      const storedPosition = indicator.dataset.neattipPosition;
      if (this.#isTooltipToggled && storedPosition) {
        const position = JSON.parse(storedPosition) as TooltipPosition;
        tooltip.style.top = `${position.top}px`;
        tooltip.style.left = `${position.left}px`;
      } else {
        this.#positionService.position(tooltip, indicator);
      }

      this.#setupDrag(tooltip);
      tooltip.classList.add("neattip-visible");
      tooltip.style.pointerEvents = "auto";

      this.#activeIndicator = indicator;
      indicator.classList.toggle("neattip-active", this.#isTooltipToggled);
    }, delay);
  }

  hide(force = false): void {
    clearTimeout(this.#showTimeout);
    clearTimeout(this.#hideTimeout);
    clearTimeout(this.#saveFeedbackTimeout);

    if (this.#isTooltipToggled && !force) {
      return;
    }

    const tooltip = this.#tooltip;
    if (!tooltip) {
      return;
    }

    this.#closeMoreMenu();
    this.#exitEditMode();
    const handle = tooltip.querySelector<HTMLElement>(".neattip-tooltip-header");
    if (handle) {
      this.#dragService.teardown(tooltip, handle);
    }

    tooltip.classList.remove("neattip-visible", "neattip-bottom", "neattip-dragging");
    tooltip.style.pointerEvents = "none";
    tooltip.style.display = "none";

    this.#activeIndicator?.classList.remove("neattip-active");
    this.#activeIndicator = undefined;
    this.#isTooltipToggled = false;

    document.querySelectorAll<HTMLElement>("[data-neattip-position]").forEach((element) => {
      delete element.dataset.neattipPosition;
    });
  }

  scheduleHide(): void {
    clearTimeout(this.#hideTimeout);
    this.#hideTimeout = setTimeout(() => this.hide(false), 100);
  }

  cancelScheduledHide(): void {
    clearTimeout(this.#hideTimeout);
  }

  toggle(indicator: HTMLElement, markdown: string): void {
    if (this.#isTooltipToggled && this.#activeIndicator === indicator) {
      this.hide(true);
      return;
    }

    this.hide(true);
    this.show(indicator, markdown, true);
  }

  isActiveIndicator(indicator: HTMLElement): boolean {
    return this.#activeIndicator === indicator;
  }

  isToggled(): boolean {
    return this.#isTooltipToggled;
  }

  #ensureTooltip(): HTMLElement {
    if (this.#tooltip) {
      return this.#tooltip;
    }

    const tooltip = document.createElement("div");
    tooltip.className = "neattip-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.innerHTML = `
      <div class="neattip-tooltip-header" aria-hidden="true"></div>
      <div class="neattip-tooltip-content"></div>
      <div class="neattip-tooltip-editor">
        <textarea class="neattip-editor-input" rows="5" aria-label="Helper text"></textarea>
      </div>
      <div class="neattip-tooltip-actions">
        <span class="neattip-copy-feedback" aria-live="polite"></span>
        <div class="neattip-more">
          <uui-button
            class="neattip-more-button"
            type="button"
            look="secondary"
            color="default"
            compact
            label="More actions"
            title="More actions"
            popovertarget="neattip-more-popover"
          >
            <uui-symbol-more></uui-symbol-more>
          </uui-button>
          <uui-popover-container
            id="neattip-more-popover"
            class="neattip-more-popover"
            placement="bottom-end"
            margin="4"
          >
            <umb-popover-layout class="neattip-more-popover-layout">
            </umb-popover-layout>
          </uui-popover-container>
        </div>
        <uui-button
          class="neattip-empty-action neattip-editor-hidden"
          type="button"
          look="primary"
          color="default"
          label="Add helper text"
          title="Add helper text"
          data-neattip-action="add"
        ></uui-button>
        <uui-button
          class="neattip-editor-action neattip-editor-hidden"
          type="button"
          look="primary"
          color="positive"
          label="Save"
          title="Save"
          data-neattip-action="save"
        ></uui-button>
        <uui-button
          class="neattip-editor-action neattip-editor-hidden"
          type="button"
          look="secondary"
          color="default"
          label="Cancel"
          title="Cancel"
          data-neattip-action="cancel"
        ></uui-button>
      </div>
    `;
    tooltip.addEventListener("click", this.#onTooltipActionClick);
    tooltip.addEventListener("click-label", this.#onTooltipActionClick);
    this.#renderAllowedActions(tooltip);
    document.body.appendChild(tooltip);
    this.#tooltip = tooltip;
    return tooltip;
  }

  #setupDrag(tooltip: HTMLElement): void {
    const handle = tooltip.querySelector<HTMLElement>(".neattip-tooltip-header");
    if (!handle) {
      return;
    }

    this.#dragService.setup(tooltip, handle, (position) => {
      this.#activeIndicator?.setAttribute("data-neattip-position", JSON.stringify(position));
    });

    tooltip.addEventListener("mouseenter", () => this.cancelScheduledHide());
    tooltip.addEventListener("mouseleave", () => {
      if (!this.#isTooltipToggled && !this.#dragService.isDragging) {
        this.scheduleHide();
      }
    });
  }

  readonly #onDocumentClick = (event: MouseEvent): void => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    if (
      target.closest(".neattip-indicator, .neattip-tooltip, .neattip-wrapper") ||
      target.closest("neat-tip-indicator") ||
      target.closest("#neattip-more-popover")
    ) {
      return;
    }

    this.hide(true);
  };

  readonly #onDocumentKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== "Escape") {
      return;
    }

    if (this.#isMoreMenuOpen()) {
      event.preventDefault();
      this.#closeMoreMenu();
      return;
    }

    if (this.#tooltip?.classList.contains("neattip-mode-edit")) {
      event.preventDefault();
      this.#exitEditMode();
      return;
    }

    this.hide(true);
  };

  readonly #onScrollOrResize = (): void => {
    this.hide(true);
  };

  readonly #onNavigation = (): void => {
    this.hide(true);
  };

  readonly #onTooltipActionClick = (event: Event): void => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const actionButton = target.closest<HTMLElement>("[data-neattip-action]");
    if (!actionButton) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const action = actionButton.dataset.neattipAction;
    if (!action) {
      return;
    }

    const permissionAction: NeatTipTooltipAction | null =
      action === "save" || action === "add"
        ? "edit"
        : action === "copy" || action === "edit"
          ? action
          : null;
    if (permissionAction && !this.#permissions.canPerform(permissionAction)) {
      this.#closeMoreMenu();
      return;
    }

    switch (action) {
      case "copy":
        this.#closeMoreMenu();
        this.#copyActiveDescription();
        break;
      case "edit":
        this.#closeMoreMenu();
        this.#enterEditMode();
        break;
      case "add":
        this.#enterEditMode();
        break;
      case "save":
        void this.#saveEditedDescription();
        break;
      case "cancel":
        this.#exitEditMode();
        break;
      default:
        break;
    }
  };

  #syncTooltipActions(tooltip: HTMLElement, markdown: string): void {
    tooltip.dataset.neattipCurrentMarkdown = markdown;
    this.#clearCopyFeedback();
    this.#setSaveButtonState("Save");
    this.#exitEditMode();
    this.#renderEmptyState(tooltip, markdown);
    this.#renderAllowedActions(tooltip);
  }

  #renderAllowedActions(tooltip: HTMLElement): void {
    const layout = tooltip.querySelector(".neattip-more-popover-layout");
    if (!layout) {
      return;
    }

    layout.setAttribute("role", "menu");
    const allowed = this.#permissions.getAllowedActions();
    const isEmpty = this.#isCurrentMarkdownEmpty(tooltip);
    layout.replaceChildren();

    for (const action of allowed) {
      if (isEmpty && action === "edit") {
        continue;
      }
      layout.appendChild(this.#createMoreMenuItem(action));
    }

    const more = tooltip.querySelector<HTMLElement>(".neattip-more");
    if (more) {
      more.hidden = isEmpty || layout.childElementCount === 0;
    }

    const addAction = tooltip.querySelector<HTMLElement>(".neattip-empty-action");
    if (addAction) {
      addAction.classList.toggle(
        "neattip-editor-hidden",
        !isEmpty || !this.#permissions.canPerform("edit"),
      );
    }

    const copyFeedback = tooltip.querySelector<HTMLElement>(".neattip-copy-feedback");
    if (copyFeedback) {
      copyFeedback.classList.toggle("neattip-editor-hidden", isEmpty);
    }
  }

  #createMoreMenuItem(action: NeatTipTooltipAction): HTMLElement {
    const item = document.createElement("uui-menu-item");
    item.dataset.neattipAction = action;
    item.setAttribute("role", "menuitem");
    item.setAttribute("tabindex", "0");

    const icon = document.createElement("uui-icon");
    icon.setAttribute("slot", "icon");

    switch (action) {
      case "copy":
        item.setAttribute("label", "Copy");
        icon.setAttribute("name", "icon-documents");
        break;
      case "edit":
        item.setAttribute("label", "Edit");
        icon.setAttribute("name", "icon-edit");
        break;
      default:
        break;
    }

    item.appendChild(icon);
    return item;
  }

  #copyActiveDescription(): void {
    const content = this.#resolveActiveMarkdown();
    if (!content) {
      return;
    }

    void navigator.clipboard?.writeText(content);
    this.#showCopyFeedback();
  }

  #enterEditMode(): void {
    if (!this.#permissions.canPerform("edit")) {
      return;
    }

    const tooltip = this.#tooltip;
    if (!tooltip) {
      return;
    }

    const input = tooltip.querySelector<HTMLTextAreaElement>(".neattip-editor-input");
    const more = tooltip.querySelector<HTMLElement>(".neattip-more");
    const addAction = tooltip.querySelector<HTMLElement>(".neattip-empty-action");
    const saveButton = tooltip.querySelector<HTMLElement>("[data-neattip-action='save']");
    const cancelButton = tooltip.querySelector<HTMLElement>("[data-neattip-action='cancel']");
    if (!input || !more || !addAction || !saveButton || !cancelButton) {
      return;
    }

    const markdown = this.#resolveActiveMarkdown();
    tooltip.dataset.neattipCurrentMarkdown = markdown;
    input.value = markdown;

    this.#clearCopyFeedback();
    tooltip.classList.add("neattip-mode-edit");
    tooltip.style.maxWidth = "420px";
    more.classList.add("neattip-editor-hidden");
    addAction.classList.add("neattip-editor-hidden");
    saveButton.classList.remove("neattip-editor-hidden");
    cancelButton.classList.remove("neattip-editor-hidden");
    this.#setSaveButtonState("Save");
    input.disabled = false;

    // Ensure value is applied after the editor becomes visible (avoids empty display).
    requestAnimationFrame(() => {
      input.value = markdown;
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    });
  }

  #exitEditMode(): void {
    const tooltip = this.#tooltip;
    if (!tooltip) {
      return;
    }

    const more = tooltip.querySelector<HTMLElement>(".neattip-more");
    const saveButton = tooltip.querySelector<HTMLElement>("[data-neattip-action='save']");
    const cancelButton = tooltip.querySelector<HTMLElement>("[data-neattip-action='cancel']");
    if (!more || !saveButton || !cancelButton) {
      return;
    }

    this.#closeMoreMenu();
    tooltip.classList.remove("neattip-mode-edit");
    more.classList.remove("neattip-editor-hidden");
    saveButton.classList.add("neattip-editor-hidden");
    cancelButton.classList.add("neattip-editor-hidden");

    const input = tooltip.querySelector<HTMLTextAreaElement>(".neattip-editor-input");
    if (input) {
      input.value = this.#resolveActiveMarkdown();
      input.disabled = true;
    }

    tooltip.style.maxWidth = `${NEATTIP_CONFIG.tooltipMaxWidth}px`;
    this.#renderEmptyState(tooltip, tooltip.dataset.neattipCurrentMarkdown ?? "");
    this.#renderAllowedActions(tooltip);
  }

  async #saveEditedDescription(): Promise<void> {
    if (!this.#permissions.canPerform("edit")) {
      this.#exitEditMode();
      return;
    }

    const tooltip = this.#tooltip;
    const indicator = this.#activeIndicator;
    if (!tooltip || !indicator) {
      return;
    }

    const input = tooltip.querySelector<HTMLTextAreaElement>(".neattip-editor-input");
    const contentHost = tooltip.querySelector<HTMLElement>(".neattip-tooltip-content");
    if (!input || !contentHost) {
      return;
    }

    // Allow empty values so editors can clear helper text completely,
    // matching Umbraco content-type description behavior.
    const value = input.value.trim();

    const layout = getLayoutForIndicator(indicator);
    if (!layout) {
      return;
    }

    const updateTarget = descriptionOverrideService.resolveUpdateTarget(layout);
    if (!updateTarget) {
      this.#setSaveButtonState("No target");
      return;
    }

    try {
      this.#setSaveButtonState("Saving...");
      await savePropertyDescriptionToApi(updateTarget, value);
    } catch {
      this.#setSaveButtonState("Failed");
      return;
    }

    layout.dataset.neattipStoredDescription = value;
    indicator.dataset.neattipMarkdown = value;
    tooltip.dataset.neattipCurrentMarkdown = value;

    contentHost.innerHTML = getRenderedDescriptionHtml(layout, value);
    this.#setSaveButtonState("Saved");
    this.#showInlineFeedback("✓ Saved", 1000);
    this.#saveFeedbackTimeout = window.setTimeout(() => {
      this.#setSaveButtonState("Save");
      this.#syncTooltipActions(tooltip, value);
    }, 1000);
  }

  #resolveActiveMarkdown(): string {
    const tooltip = this.#tooltip;
    const cached = tooltip?.dataset.neattipCurrentMarkdown?.trim();
    if (cached) {
      return cached;
    }

    const indicator = this.#activeIndicator;
    if (!indicator) {
      return "";
    }

    const layout = getLayoutForIndicator(indicator);
    return (
      indicator.dataset.neattipMarkdown?.trim()
      || layout?.dataset.neattipStoredDescription?.trim()
      || (layout ? resolvePropertyDescription(layout) : "")
      || ""
    );
  }

  #isCurrentMarkdownEmpty(tooltip: HTMLElement): boolean {
    return !tooltip.dataset.neattipCurrentMarkdown?.trim();
  }

  #renderEmptyState(tooltip: HTMLElement, markdown: string): void {
    const contentHost = tooltip.querySelector<HTMLElement>(".neattip-tooltip-content");
    if (!contentHost) {
      return;
    }

    const isEmpty = !markdown.trim();
    tooltip.classList.toggle("neattip-empty", isEmpty);
    if (!isEmpty) {
      return;
    }

    const message = this.#permissions.canPerform("edit")
      ? "No helper text yet."
      : "No helper text available.";
    contentHost.innerHTML = `<p class="neattip-empty-state-message">${message}</p>`;
  }

  #setSaveButtonState(label: string): void {
    const button = this.#tooltip?.querySelector<HTMLElement>("[data-neattip-action='save']");
    if (!button) {
      return;
    }

    button.setAttribute("label", label);
    button.setAttribute("title", label);
  }

  #isMoreMenuOpen(): boolean {
    const popover = this.#tooltip?.querySelector("#neattip-more-popover");
    return !!popover?.matches(":popover-open");
  }

  #closeMoreMenu(): void {
    const popover = this.#tooltip?.querySelector("#neattip-more-popover") as
      | (HTMLElement & { hidePopover?: () => void })
      | null
      | undefined;
    popover?.hidePopover?.();
  }

  #showCopyFeedback(): void {
    const feedback = this.#tooltip?.querySelector<HTMLElement>(".neattip-copy-feedback");
    if (!feedback) {
      return;
    }

    clearTimeout(this.#copyFeedbackTimeout);
    feedback.textContent = "✓ Copied";
    feedback.classList.add("neattip-copy-feedback-visible");
    this.#copyFeedbackTimeout = window.setTimeout(() => this.#clearCopyFeedback(), 1000);
  }

  #clearCopyFeedback(): void {
    clearTimeout(this.#copyFeedbackTimeout);
    const feedback = this.#tooltip?.querySelector<HTMLElement>(".neattip-copy-feedback");
    if (!feedback) {
      return;
    }

    feedback.classList.remove("neattip-copy-feedback-visible");
    feedback.textContent = "";
  }

  #showInlineFeedback(message: string, durationMs: number): void {
    const feedback = this.#tooltip?.querySelector<HTMLElement>(".neattip-copy-feedback");
    if (!feedback) {
      return;
    }

    clearTimeout(this.#copyFeedbackTimeout);
    feedback.textContent = message;
    feedback.classList.add("neattip-copy-feedback-visible");
    this.#copyFeedbackTimeout = window.setTimeout(() => this.#clearCopyFeedback(), durationMs);
  }
}
