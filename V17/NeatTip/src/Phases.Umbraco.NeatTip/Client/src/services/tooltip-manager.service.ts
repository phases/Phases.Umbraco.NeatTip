import { NEATTIP_CONFIG } from "../config/neattip.config.js";
import {
  resolvePropertyDescription,
  syncResolvedDescription,
} from "./label-placement.service.js";
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
import { TooltipHostResolver } from "./tooltip-host-resolver.service.js";
import { ensureNeatTipStylesForHost } from "../utils/neattip-style-host.util.js";
import type { VariantCultureService } from "./variant-culture.service.js";
import { setCultureDescription } from "../utils/culture-description.util.js";
import {
  hydrateCultureDescriptionsFromStorage,
  parseCultureDescriptionStorage,
} from "../utils/culture-description-codec.js";
import { helperTextService } from "./helper-text.service.js";
import { subscribeRouteChanges } from "./route-change.service.js";
import {
  NEATTIP_COPY_ICON_SVG,
  NEATTIP_EDIT_ICON_SVG,
} from "../constants/tooltip-action-icons.js";

export class TooltipManagerService {
  #tooltip: HTMLElement | undefined;
  #tooltipHost: HTMLElement = document.body;
  #activeIndicator: HTMLElement | undefined;
  #showTimeout: ReturnType<typeof setTimeout> | undefined;
  #hideTimeout: ReturnType<typeof setTimeout> | undefined;
  #copyFeedbackTimeout: ReturnType<typeof setTimeout> | undefined;
  #saveFeedbackTimeout: ReturnType<typeof setTimeout> | undefined;
  #isTooltipToggled = false;
  #hoverListenersAttached = false;
  #isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  #unsubscribePermissions: (() => void) | undefined;
  #unsubscribeRouteChanges: (() => void) | undefined;
  #repositionFrameId: number | undefined;

  readonly #positionService = new TooltipPositionService();
  readonly #dragService = new TooltipDragService();
  readonly #hostResolver = new TooltipHostResolver();
  readonly #permissions: NeatTipPermissionsService;
  readonly #cultureService: VariantCultureService;

  constructor(permissions: NeatTipPermissionsService, cultureService: VariantCultureService) {
    this.#permissions = permissions;
    this.#cultureService = cultureService;
  }

  start(): void {
    document.addEventListener("pointerdown", this.#onDocumentPointerDown, false);
    document.addEventListener("click", this.#onDocumentClick, false);
    document.addEventListener("keydown", this.#onDocumentKeyDown);
    window.addEventListener("scroll", this.#onScrollOrResize, true);
    document.addEventListener("scroll", this.#onScrollOrResize, true);
    window.addEventListener("resize", this.#onScrollOrResize);
    this.#unsubscribeRouteChanges = subscribeRouteChanges(this.#onNavigation);
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
    this.#unsubscribeRouteChanges?.();
    this.#unsubscribeRouteChanges = undefined;
    if (this.#repositionFrameId !== undefined) {
      cancelAnimationFrame(this.#repositionFrameId);
      this.#repositionFrameId = undefined;
    }
    document.removeEventListener("pointerdown", this.#onDocumentPointerDown, false);
    document.removeEventListener("click", this.#onDocumentClick, false);
    document.removeEventListener("keydown", this.#onDocumentKeyDown);
    window.removeEventListener("scroll", this.#onScrollOrResize, true);
    document.removeEventListener("scroll", this.#onScrollOrResize, true);
    window.removeEventListener("resize", this.#onScrollOrResize);
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

    if (this.#isEditing()) {
      if (this.#activeIndicator === indicator) {
        this.cancelScheduledHide();
      }
      return;
    }

    if (isClick) {
      this.#isTooltipToggled = true;
    }

    const delay = isClick || this.#isTouchDevice ? 0 : NEATTIP_CONFIG.tooltipDelay;

    this.#showTimeout = setTimeout(() => {
      if (!indicator.isConnected) {
        return;
      }

      const tooltip = this.#ensureTooltip();
      this.#mountTooltipForIndicator(indicator);
      tooltip.style.pointerEvents = "none";
      tooltip.classList.remove("neattip-visible", "neattip-bottom");
      tooltip.style.maxWidth = `${NEATTIP_CONFIG.tooltipMaxWidth}px`;
      tooltip.style.minWidth = `${NEATTIP_CONFIG.tooltipMinWidth}px`;

      const contentHost = tooltip.querySelector<HTMLElement>(".neattip-tooltip-content");
      const layout = getLayoutForIndicator(indicator);
      const cultureContext = this.#cultureService.getResolutionContext();
      const resolvedMarkdown =
        markdown.trim()
        || indicator.dataset.neattipMarkdown?.trim()
        || (layout ? syncResolvedDescription(layout, cultureContext) : "")
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
        this.#positionService.position(tooltip, indicator, {
          host: this.#positionHost(),
        });
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

    if ((this.#isTooltipToggled || this.#isEditing()) && !force) {
      return;
    }

    const tooltip = this.#tooltip;
    if (!tooltip) {
      return;
    }

    this.#exitEditMode();
    const handle = tooltip.querySelector<HTMLElement>(".neattip-tooltip-header");
    if (handle) {
      this.#dragService.teardown(tooltip, handle);
    }

    tooltip.classList.remove("neattip-visible", "neattip-bottom", "neattip-dragging");
    tooltip.style.pointerEvents = "none";
    tooltip.style.display = "none";

    if (tooltip.parentElement !== document.body) {
      document.body.appendChild(tooltip);
    }
    this.#tooltipHost = document.body;

    this.#activeIndicator?.classList.remove("neattip-active");
    this.#activeIndicator = undefined;
    this.#isTooltipToggled = false;

    document.querySelectorAll<HTMLElement>("[data-neattip-position]").forEach((element) => {
      delete element.dataset.neattipPosition;
    });
  }

  scheduleHide(leaveEvent?: Event): void {
    if (this.#isTooltipToggled || this.#isEditing()) {
      return;
    }

    if (leaveEvent instanceof MouseEvent && this.#isMovingWithinHoverRegion(leaveEvent)) {
      return;
    }

    clearTimeout(this.#hideTimeout);
    this.#hideTimeout = setTimeout(() => {
      if (this.#isPointerOverHoverRegion()) {
        return;
      }

      this.hide(false);
    }, NEATTIP_CONFIG.tooltipHideDelay);
  }

  cancelScheduledHide(): void {
    clearTimeout(this.#hideTimeout);
  }

  toggle(indicator: HTMLElement, markdown: string): void {
    if (this.#isEditing()) {
      return;
    }

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

  isEditing(): boolean {
    return this.#isEditing();
  }

  onCultureChange(): void {
    const tooltip = this.#tooltip;
    if (!tooltip) {
      return;
    }

    if (tooltip.classList.contains("neattip-mode-edit")) {
      const input = tooltip.querySelector<HTMLTextAreaElement>(".neattip-editor-input");
      const baseline = tooltip.dataset.neattipEditBaseline?.trim() ?? "";
      const isDirty = (input?.value.trim() ?? "") !== baseline;
      const shouldReenterEdit = !isDirty && this.#permissions.canPerform("edit");

      this.#exitEditMode();

      if (shouldReenterEdit) {
        this.#enterEditMode();
      }

      return;
    }

    if (!this.#activeIndicator) {
      return;
    }

    this.#refreshVisibleTooltipContent();
  }

  #refreshVisibleTooltipContent(): void {
    const tooltip = this.#tooltip;
    const indicator = this.#activeIndicator;
    if (!tooltip || !indicator) {
      return;
    }

    const layout = getLayoutForIndicator(indicator);
    const cultureContext = this.#cultureService.getResolutionContext();
    const resolvedMarkdown = layout
      ? syncResolvedDescription(layout, cultureContext)
      : this.#resolveActiveMarkdown();

    indicator.dataset.neattipMarkdown = resolvedMarkdown;

    const contentHost = tooltip.querySelector<HTMLElement>(".neattip-tooltip-content");
    const html = layout
      ? getRenderedDescriptionHtml(layout, resolvedMarkdown)
      : renderMarkdownAsHtml(resolvedMarkdown);

    if (contentHost) {
      contentHost.innerHTML = html;
    }

    tooltip.dataset.neattipCurrentMarkdown = resolvedMarkdown;
    this.#renderEmptyState(tooltip, resolvedMarkdown);
    this.#renderAllowedActions(tooltip);
  }

  refreshIfActiveLayout(layout: HTMLElement): void {
    const indicator = this.#activeIndicator;
    if (!indicator) {
      return;
    }

    const activeLayout = getLayoutForIndicator(indicator);
    if (activeLayout !== layout) {
      return;
    }

    if (this.#tooltip?.classList.contains("neattip-mode-edit")) {
      return;
    }

    this.#refreshVisibleTooltipContent();
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
      <div class="neattip-tooltip-body">
        <div class="neattip-tooltip-content"></div>
        <div class="neattip-tooltip-editor">
          <textarea class="neattip-editor-input" rows="5" aria-label="Helper text"></textarea>
        </div>
      </div>
      <div class="neattip-tooltip-actions">
        <span class="neattip-copy-feedback" aria-live="polite"></span>
        <div class="neattip-inline-actions" role="toolbar" aria-label="Helper text actions">
          <button
            class="neattip-action-button"
            type="button"
            aria-label="Copy"
            title="Copy"
            data-neattip-action="copy"
          >
            <span class="neattip-action-icon">${NEATTIP_COPY_ICON_SVG}</span>
          </button>
          <button
            class="neattip-action-button"
            type="button"
            aria-label="Edit"
            title="Edit"
            data-neattip-action="edit"
          >
            <span class="neattip-action-icon">${NEATTIP_EDIT_ICON_SVG}</span>
          </button>
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
    this.#isolateTooltipEvents(tooltip);
    this.#ensureHoverListeners(tooltip);
    this.#renderAllowedActions(tooltip);
    document.body.appendChild(tooltip);
    this.#tooltip = tooltip;
    return tooltip;
  }

  #mountTooltipForIndicator(indicator: HTMLElement): void {
    const tooltip = this.#ensureTooltip();
    const host = this.#hostResolver.resolve(indicator);
    this.#tooltipHost = host;

    ensureNeatTipStylesForHost(host);

    if (tooltip.parentElement !== host) {
      host.appendChild(tooltip);
    }

    this.#positionService.applyHostPositionMode(tooltip, this.#positionHost());
  }

  #positionHost(): HTMLElement | undefined {
    return this.#hostResolver.isBodyHost(this.#tooltipHost) ? undefined : this.#tooltipHost;
  }

  #scheduleReposition(): void {
    if (this.#repositionFrameId !== undefined) {
      return;
    }

    this.#repositionFrameId = requestAnimationFrame(() => {
      this.#repositionFrameId = undefined;
      this.#repositionActiveTooltip();
    });
  }

  #repositionActiveTooltip(): void {
    const tooltip = this.#tooltip;
    const indicator = this.#activeIndicator;

    if (!tooltip?.classList.contains("neattip-visible") || !indicator?.isConnected) {
      return;
    }

    if (this.#dragService.isDragging) {
      return;
    }

    this.#mountTooltipForIndicator(indicator);

    const storedPosition = indicator.dataset.neattipPosition;
    if (this.#isTooltipToggled && storedPosition) {
      const position = JSON.parse(storedPosition) as TooltipPosition;
      tooltip.style.top = `${position.top}px`;
      tooltip.style.left = `${position.left}px`;
      return;
    }

    this.#positionService.position(tooltip, indicator, {
      host: this.#positionHost(),
    });
  }

  #isolateTooltipEvents(tooltip: HTMLElement): void {
    const stopPropagation = (event: Event): void => {
      event.stopPropagation();
    };

    tooltip.addEventListener("pointerdown", stopPropagation);
    tooltip.addEventListener("mousedown", stopPropagation);
  }

  #setupDrag(tooltip: HTMLElement): void {
    const handle = tooltip.querySelector<HTMLElement>(".neattip-tooltip-header");
    if (!handle) {
      return;
    }

    this.#dragService.setup(
      tooltip,
      handle,
      (position) => {
        this.#activeIndicator?.setAttribute("data-neattip-position", JSON.stringify(position));
      },
      this.#positionHost(),
    );
  }

  #ensureHoverListeners(tooltip: HTMLElement): void {
    if (this.#hoverListenersAttached) {
      return;
    }

    this.#hoverListenersAttached = true;

    const onHoverEnter = () => {
      this.cancelScheduledHide();
      this.#pinTooltipForInteraction();
    };
    const onHoverLeave = (event: Event) => {
      if (!this.#isTooltipToggled && !this.#isEditing() && !this.#dragService.isDragging) {
        this.scheduleHide(event);
      }
    };

    tooltip.addEventListener("pointerenter", onHoverEnter);
    tooltip.addEventListener("mouseenter", onHoverEnter);
    tooltip.addEventListener("pointerleave", onHoverLeave);
    tooltip.addEventListener("mouseleave", onHoverLeave);
  }

  #isMovingWithinHoverRegion(event: MouseEvent): boolean {
    if (this.#nodeInteractsWithNeatTip(event.relatedTarget)) {
      return true;
    }

    if (!this.#tooltip?.classList.contains("neattip-visible")) {
      return false;
    }

    const underPointer = document.elementFromPoint(event.clientX, event.clientY);
    return this.#nodeInteractsWithNeatTip(underPointer);
  }

  #nodeInteractsWithNeatTip(node: EventTarget | null): boolean {
    if (!(node instanceof Node)) {
      return false;
    }

    let current: Node | null = node;
    while (current) {
      if (current === this.#tooltip) {
        return true;
      }

      if (current === this.#activeIndicator) {
        return true;
      }

      if (current instanceof Element) {
        if (current.classList.contains("neattip-tooltip")) {
          return true;
        }

        if (
          current.classList.contains("neattip-wrapper")
          || current.classList.contains("neattip-indicator")
        ) {
          return true;
        }

        if (current.tagName.toLowerCase() === "neat-tip-indicator") {
          return true;
        }
      }

      if (current.parentNode) {
        current = current.parentNode;
        continue;
      }

      const root = current.getRootNode();
      current = root instanceof ShadowRoot ? root.host : null;
    }

    return false;
  }

  #eventInteractsWithNeatTip(event: Event): boolean {
    const path = typeof event.composedPath === "function" ? event.composedPath() : [];
    for (const node of path) {
      if (this.#nodeInteractsWithNeatTip(node)) {
        return true;
      }
    }

    return this.#nodeInteractsWithNeatTip(event.target);
  }

  #pinTooltipForInteraction(): void {
    this.#isTooltipToggled = true;
    this.cancelScheduledHide();
    this.#activeIndicator?.classList.add("neattip-active");
  }

  #isPointerOverHoverRegion(): boolean {
    const tooltip = this.#tooltip;
    if (tooltip?.classList.contains("neattip-visible") && tooltip.matches(":hover")) {
      return true;
    }

    if (this.#activeIndicator?.matches(":hover")) {
      return true;
    }

    return false;
  }

  readonly #onDocumentPointerDown = (event: PointerEvent): void => {
    if (!this.#tooltip?.classList.contains("neattip-visible")) {
      return;
    }

    if (this.#eventInteractsWithNeatTip(event)) {
      return;
    }

    if (this.#isEditing()) {
      return;
    }

    this.hide(true);
  };

  readonly #onDocumentClick = (event: MouseEvent): void => {
    if (this.#eventInteractsWithNeatTip(event)) {
      return;
    }

    if (this.#isEditing()) {
      return;
    }

    this.hide(true);
  };

  readonly #onDocumentKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== "Escape") {
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
    if (!this.#tooltip?.classList.contains("neattip-visible")) {
      return;
    }

    if (this.#dragService.isDragging) {
      return;
    }

    this.#scheduleReposition();
  };

  readonly #onNavigation = (): void => {
    if (this.#isEditing()) {
      return;
    }

    this.hide(true);
  };

  readonly #onTooltipActionClick = (event: Event): void => {
    const actionButton = this.#resolveActionButton(event);
    if (!actionButton) {
      return;
    }

    this.cancelScheduledHide();
    this.#pinTooltipForInteraction();
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
      return;
    }

    switch (action) {
      case "copy":
        this.#copyActiveDescription();
        break;
      case "edit":
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

  #resolveActionButton(event: Event): HTMLElement | undefined {
    const path = typeof event.composedPath === "function" ? event.composedPath() : [];
    for (const node of path) {
      if (!(node instanceof Element)) {
        continue;
      }

      if (!(node instanceof HTMLElement)) {
        continue;
      }

      if (node.hasAttribute("data-neattip-action")) {
        return node;
      }

      const ancestor = node.closest<HTMLElement>("[data-neattip-action]");
      if (ancestor) {
        return ancestor;
      }
    }

    const target = event.target;
    if (target instanceof HTMLElement) {
      return target.closest<HTMLElement>("[data-neattip-action]") ?? undefined;
    }

    return undefined;
  }

  #syncTooltipActions(tooltip: HTMLElement, markdown: string): void {
    tooltip.dataset.neattipCurrentMarkdown = markdown;
    this.#clearCopyFeedback();
    this.#setSaveButtonState("Save");
    this.#exitEditMode();
    this.#renderEmptyState(tooltip, markdown);
    this.#renderAllowedActions(tooltip);
  }

  #renderAllowedActions(tooltip: HTMLElement): void {
    const allowed = this.#permissions.getAllowedActions();
    const isEmpty = this.#isCurrentMarkdownEmpty(tooltip);

    const copyButton = tooltip.querySelector<HTMLElement>("[data-neattip-action='copy']");
    const editButton = tooltip.querySelector<HTMLElement>("[data-neattip-action='edit']");
    const inlineActions = tooltip.querySelector<HTMLElement>(".neattip-inline-actions");
    const addAction = tooltip.querySelector<HTMLElement>(".neattip-empty-action");
    const actionsFooter = tooltip.querySelector<HTMLElement>(".neattip-tooltip-actions");
    const copyFeedback = tooltip.querySelector<HTMLElement>(".neattip-copy-feedback");

    const showCopy = !isEmpty && allowed.includes("copy");
    const showEdit = !isEmpty && allowed.includes("edit");
    const showInline = showCopy || showEdit;
    const showAdd = isEmpty && this.#permissions.canPerform("edit");
    const showFooter = showInline || showAdd;

    copyButton?.classList.toggle("neattip-editor-hidden", !showCopy);
    editButton?.classList.toggle("neattip-editor-hidden", !showEdit);
    inlineActions?.classList.toggle("neattip-editor-hidden", !showInline);

    addAction?.classList.toggle("neattip-editor-hidden", !showAdd);

    copyFeedback?.classList.toggle("neattip-editor-hidden", isEmpty);
    actionsFooter?.classList.toggle("neattip-actions-hidden", !showFooter);
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
    const inlineActions = tooltip.querySelector<HTMLElement>(".neattip-inline-actions");
    const addAction = tooltip.querySelector<HTMLElement>(".neattip-empty-action");
    const saveButton = tooltip.querySelector<HTMLElement>("[data-neattip-action='save']");
    const cancelButton = tooltip.querySelector<HTMLElement>("[data-neattip-action='cancel']");
    if (!input || !inlineActions || !addAction || !saveButton || !cancelButton) {
      return;
    }

    const markdown = this.#resolveActiveMarkdown();
    tooltip.dataset.neattipCurrentMarkdown = markdown;
    tooltip.dataset.neattipEditBaseline = markdown;
    input.value = markdown;

    this.#clearCopyFeedback();
    this.cancelScheduledHide();
    this.#pinTooltipForInteraction();
    tooltip.classList.add("neattip-mode-edit");
    tooltip.style.maxWidth = "420px";
    this.#activeIndicator?.classList.add("neattip-active");
    tooltip.querySelector<HTMLElement>(".neattip-tooltip-actions")
      ?.classList.remove("neattip-actions-hidden");
    inlineActions.classList.add("neattip-editor-hidden");
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

    const inlineActions = tooltip.querySelector<HTMLElement>(".neattip-inline-actions");
    const saveButton = tooltip.querySelector<HTMLElement>("[data-neattip-action='save']");
    const cancelButton = tooltip.querySelector<HTMLElement>("[data-neattip-action='cancel']");
    if (!inlineActions || !saveButton || !cancelButton) {
      return;
    }

    const wasToggled = this.#isTooltipToggled;
    tooltip.classList.remove("neattip-mode-edit");
    delete tooltip.dataset.neattipEditBaseline;
    inlineActions.classList.remove("neattip-editor-hidden");
    saveButton.classList.add("neattip-editor-hidden");
    cancelButton.classList.add("neattip-editor-hidden");

    const input = tooltip.querySelector<HTMLTextAreaElement>(".neattip-editor-input");
    if (input) {
      input.value = this.#resolveActiveMarkdown();
      input.disabled = true;
    }

    tooltip.style.maxWidth = `${NEATTIP_CONFIG.tooltipMaxWidth}px`;
    tooltip.style.minWidth = `${NEATTIP_CONFIG.tooltipMinWidth}px`;
    this.#renderEmptyState(tooltip, tooltip.dataset.neattipCurrentMarkdown ?? "");
    this.#renderAllowedActions(tooltip);

    if (!wasToggled) {
      this.#activeIndicator?.classList.remove("neattip-active");
    }
  }

  #isEditing(): boolean {
    return this.#tooltip?.classList.contains("neattip-mode-edit") ?? false;
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
      const result = await savePropertyDescriptionToApi(
        {
          ...updateTarget,
          culture: this.#cultureService.getActiveCulture() ?? undefined,
        },
        value,
      );

      hydrateCultureDescriptionsFromStorage(layout, result.description);

      const syncedPropertyDescription = result.propertyDescription?.trim();
      if (syncedPropertyDescription) {
        layout.dataset.neattipPropertyDescriptionFallback = syncedPropertyDescription;
        layout.dataset.neattipOriginalDescription = syncedPropertyDescription;
      } else {
        delete layout.dataset.neattipPropertyDescriptionFallback;
        delete layout.dataset.neattipOriginalDescription;
      }

      const savedCultureMap = parseCultureDescriptionStorage(result.description);
      helperTextService.updateFromSave(
        result.propertyAlias ?? updateTarget.propertyAlias,
        result.propertyKey ?? updateTarget.propertyKey,
        savedCultureMap,
        syncedPropertyDescription ?? "",
        result.contentTypeKey ?? updateTarget.contentTypeKey,
      );

      const displayValue = result.cultureDescription?.trim() || value;
      layout.dataset.neattipStoredDescription = displayValue;
      setCultureDescription(layout, this.#cultureService.getActiveCulture(), displayValue);
      indicator.dataset.neattipMarkdown = displayValue;
      tooltip.dataset.neattipCurrentMarkdown = displayValue;

      contentHost.innerHTML = getRenderedDescriptionHtml(layout, displayValue);
      this.#setSaveButtonState("Saved");
      this.#showInlineFeedback("✓ Saved", 1000);
      this.#saveFeedbackTimeout = window.setTimeout(() => {
        this.#setSaveButtonState("Save");
        this.#syncTooltipActions(tooltip, displayValue);
      }, 1000);
    } catch {
      this.#setSaveButtonState("Failed");
      return;
    }
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
    const cultureContext = this.#cultureService.getResolutionContext();
    return (
      indicator.dataset.neattipMarkdown?.trim()
      || (layout ? syncResolvedDescription(layout, cultureContext) : "")
      || (layout ? resolvePropertyDescription(layout, cultureContext) : "")
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

  #showCopyFeedback(): void {
    const feedback = this.#tooltip?.querySelector<HTMLElement>(".neattip-copy-feedback");
    if (!feedback) {
      return;
    }

    clearTimeout(this.#copyFeedbackTimeout);
    feedback.classList.remove("neattip-editor-hidden");
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
    feedback.classList.remove("neattip-editor-hidden");
    feedback.textContent = message;
    feedback.classList.add("neattip-copy-feedback-visible");
    this.#copyFeedbackTimeout = window.setTimeout(() => this.#clearCopyFeedback(), durationMs);
  }
}
