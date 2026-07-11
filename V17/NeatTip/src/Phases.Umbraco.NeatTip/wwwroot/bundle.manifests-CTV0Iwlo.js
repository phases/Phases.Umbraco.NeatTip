const a = [
  {
    name: "Phases Umbraco Neat Tip Entrypoint",
    alias: "Phases.Umbraco.NeatTip.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-vpqC2zRd.js")
  }
], i = "phases-neattip-settings-changed", p = "NeatTip", T = "2.0.0", t = "phases-neattip-settings", e = "Phases.Workspace.NeatTipSettings", o = "/umbraco/management/api/v1/neattip/settings", c = "/umbraco/management/api/v1/neattip/settings/property-description", m = "/umbraco/management/api/v1/neattip/settings/property-descriptions", s = "Umb.Condition.WorkspaceAlias", n = [
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
    element: () => import("./neattip-settings.workspace-view.element-Du4waMDc.js"),
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
], N = [
  ...a,
  ...n
];
export {
  m as N,
  c as a,
  i as b,
  p as c,
  T as d,
  o as e,
  N as m
};
//# sourceMappingURL=bundle.manifests-CTV0Iwlo.js.map
