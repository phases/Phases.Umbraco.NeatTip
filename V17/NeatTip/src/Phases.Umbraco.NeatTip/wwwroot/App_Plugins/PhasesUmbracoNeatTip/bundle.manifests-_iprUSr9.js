const a = [
  {
    name: "Phases Umbraco Neat Tip Entrypoint",
    alias: "Phases.Umbraco.NeatTip.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-B17kIuKu.js")
  }
], i = "phases-neattip-settings-changed", t = "phases-neattip-settings", e = "Phases.Workspace.NeatTipSettings", p = "/umbraco/management/api/v1/neattip/settings", o = "/umbraco/management/api/v1/neattip/settings/property-description", T = "/umbraco/management/api/v1/neattip/settings/property-descriptions", s = "Umb.Condition.WorkspaceAlias", n = [
  {
    type: "menuItem",
    alias: "Phases.MenuItem.NeatTipSettings",
    name: "NeatTip Settings Menu Item",
    weight: 150,
    meta: {
      label: "NeatTip",
      icon: "icon-info",
      entityType: t,
      menus: ["Umb.Menu.AdvancedSettings"]
    }
  },
  {
    type: "workspace",
    kind: "default",
    alias: e,
    name: "NeatTip Settings Workspace",
    meta: {
      entityType: t,
      headline: "NeatTip"
    }
  },
  {
    type: "workspaceView",
    alias: "Phases.WorkspaceView.NeatTipSettings",
    name: "NeatTip Settings Workspace View",
    element: () => import("./neattip-settings.workspace-view.element-C0mgvdFy.js"),
    weight: 100,
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings"
    },
    conditions: [
      {
        alias: s,
        match: e
      }
    ]
  }
], c = [
  ...a,
  ...n
];
export {
  T as N,
  o as a,
  i as b,
  p as c,
  c as m
};
//# sourceMappingURL=bundle.manifests-_iprUSr9.js.map
