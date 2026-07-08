export const NEATTIP_MARKERS = {
  processed: "neattip-processed",
  hidden: "neattip-hidden",
  keepVisible: "neattip-keep-visible",
  wrapper: "neattip-wrapper",
} as const;

export const PROPERTY_LAYOUT_TAG = "umb-property-layout";

export const DESCRIPTION_SELECTORS = [
  "#description",
  '[slot="description"]',
  ".property-description",
  "umb-ufm-render",
].join(", ");

export const LABEL_SELECTORS = [
  "#label",
  "uui-label",
  '[slot="label"]',
  "label",
  ".umb-property-editor__label",
  ".control-label",
].join(", ");

export const BLOCK_TITLE_SELECTORS = [
  ".umb-block-list__content-title",
  ".umb-block-grid__content-title",
].join(", ");

export const DOCUMENT_WORKSPACE_SELECTORS = [
  "umb-document-workspace-editor",
  "umb-document-workspace-split-view",
  "umb-document-workspace-view-info",
  "umb-content-workspace-view-edit",
  "umb-content-workspace-view-edit-tab",
  "umb-content-workspace-property",
  "umb-workspace-split-view",
  "umb-routable-workspace",
  "umb-workspace-editor",
  "umb-property",
].join(", ");

export const EXCLUDED_EDITOR_SELECTORS = [
  "umb-property-type-workspace",
  "umb-document-type-workspace",
  "umb-data-type-workspace",
  "umb-member-type-workspace",
  "umb-media-type-workspace",
].join(", ");

export const OBSERVER_ROOT_SELECTORS = [
  "umb-document-workspace",
  "umb-document-workspace-editor",
  "umb-block-list",
  "umb-block-grid",
  "[data-mark]",
].join(", ");

export const TEXTBOX_ICONS_SELECTOR = ".mini-rollback-icon";
