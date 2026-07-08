import {
  NEATTIP_ENTITY_TYPE,
  NEATTIP_WORKSPACE_ALIAS,
} from "./constants.js";

const WORKSPACE_CONDITION_ALIAS = "Umb.Condition.WorkspaceAlias";

export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "menuItem",
    alias: "Phases.MenuItem.NeatTipSettings",
    name: "NeatTip Settings Menu Item",
    weight: 150,
    meta: {
      label: "NeatTip",
      icon: "icon-info",
      entityType: NEATTIP_ENTITY_TYPE,
      menus: ["Umb.Menu.AdvancedSettings"],
    },
  },
  {
    type: "workspace",
    kind: "default",
    alias: NEATTIP_WORKSPACE_ALIAS,
    name: "NeatTip Settings Workspace",
    meta: {
      entityType: NEATTIP_ENTITY_TYPE,
      headline: "NeatTip",
    },
  },
  {
    type: "workspaceView",
    alias: "Phases.WorkspaceView.NeatTipSettings",
    name: "NeatTip Settings Workspace View",
    element: () => import("./neattip-settings.workspace-view.element.js"),
    weight: 100,
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings",
    },
    conditions: [
      {
        alias: WORKSPACE_CONDITION_ALIAS,
        match: NEATTIP_WORKSPACE_ALIAS,
      },
    ],
  },
];
