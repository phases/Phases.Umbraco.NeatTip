export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Phases Umbraco Neat Tip Entrypoint",
    alias: "Phases.Umbraco.NeatTip.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint.js"),
  },
];
