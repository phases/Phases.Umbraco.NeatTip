import { neattipRuntime } from "../config/neattip-runtime.js";

export type NeatTipDiagnosticHealth = "healthy" | "warning" | "inactive";

export interface NeatTipDiagnosticItem {
  label: string;
  health: NeatTipDiagnosticHealth;
  message: string;
}

let packageLoaded = false;
let tooltipServiceActive = false;

export function markNeatTipPackageLoaded(): void {
  packageLoaded = true;
}

export function setNeatTipTooltipServiceActive(active: boolean): void {
  tooltipServiceActive = active;
}

export function getNeatTipDiagnostics(options?: {
  settingsLoadFailed?: boolean;
}): NeatTipDiagnosticItem[] {
  const settingsLoaded = neattipRuntime.settingsLoaded && !options?.settingsLoadFailed;
  const permissionsReady =
    settingsLoaded && neattipRuntime.canEditHelperText !== undefined;

  const tooltipHealth: NeatTipDiagnosticHealth = !neattipRuntime.enabled
    ? "inactive"
    : tooltipServiceActive
      ? "healthy"
      : "warning";

  const tooltipMessage = !neattipRuntime.enabled
    ? "Disabled"
    : tooltipServiceActive
      ? "Active"
      : "Unavailable";

  return [
    {
      label: "Package",
      health: packageLoaded ? "healthy" : "warning",
      message: packageLoaded ? "Loaded" : "Not loaded",
    },
    {
      label: "Settings",
      health: settingsLoaded ? "healthy" : "warning",
      message: settingsLoaded ? "Loaded" : "Not loaded",
    },
    {
      label: "Tooltip Service",
      health: tooltipHealth,
      message: tooltipMessage,
    },
    {
      label: "Localization",
      health: packageLoaded ? "healthy" : "warning",
      message: packageLoaded ? "Available" : "Unavailable",
    },
    {
      label: "Permission Service",
      health: permissionsReady ? "healthy" : "warning",
      message: permissionsReady ? "Ready" : "Unavailable",
    },
    {
      label: "Helper Text Storage",
      health: settingsLoaded ? "healthy" : "warning",
      message: settingsLoaded ? "Available" : "Unavailable",
    },
  ];
}
