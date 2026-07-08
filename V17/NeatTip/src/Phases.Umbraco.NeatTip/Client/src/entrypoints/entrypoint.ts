import type {
  UmbEntryPointOnInit,
  UmbEntryPointOnUnload,
} from "@umbraco-cms/backoffice/extension-api";
import type { UmbElement } from "@umbraco-cms/backoffice/element-api";
import "../components/neat-tip-indicator.element.js";
import { neattipRuntime } from "../config/neattip-runtime.js";
import { NEATTIP_SETTINGS_CHANGED_EVENT } from "../settings/constants.js";
import { NeatTipService } from "../services/neattip.service.js";
import { loadNeatTipSettings } from "../services/neattip-settings-api.service.js";
import { restoreAllNeatTipLayouts } from "../utils/restore-layouts.util.js";
import neattipStyles from "../styles/neattip.css?inline";

let hostElement: UmbElement | undefined;
let neatTipService: NeatTipService | undefined;
let styleElement: HTMLStyleElement | undefined;

function injectStyles(): void {
  if (styleElement) {
    return;
  }

  styleElement = document.createElement("style");
  styleElement.id = "neattip-styles";
  styleElement.textContent = neattipStyles;
  document.head.appendChild(styleElement);
}

function removeStyles(): void {
  styleElement?.remove();
  styleElement = undefined;
}

function startNeatTip(): void {
  if (!neattipRuntime.enabled || !hostElement) {
    return;
  }

  if (!neatTipService) {
    neatTipService = new NeatTipService(hostElement);
    neatTipService.start();
  } else {
    neatTipService.syncPermissionsFromRuntime();
  }
}

function stopNeatTip(): void {
  neatTipService?.stop();
  neatTipService = undefined;
}

async function applyRuntimeSettings(): Promise<void> {
  try {
    await loadNeatTipSettings();
  } catch {
    neattipRuntime.settingsLoaded = true;
  }

  if (neattipRuntime.enabled) {
    startNeatTip();
    neatTipService?.syncPermissionsFromRuntime();
    neatTipService?.rescan();
    return;
  }

  stopNeatTip();
  restoreAllNeatTipLayouts();
}

const onSettingsChanged = (): void => {
  if (neattipRuntime.enabled) {
    restoreAllNeatTipLayouts();
    startNeatTip();
    neatTipService?.syncPermissionsFromRuntime();
    neatTipService?.rescan();
    return;
  }

  stopNeatTip();
  restoreAllNeatTipLayouts();
};

export const onInit: UmbEntryPointOnInit = (host) => {
  hostElement = host;
  injectStyles();
  void applyRuntimeSettings();
  window.addEventListener(NEATTIP_SETTINGS_CHANGED_EVENT, onSettingsChanged);
};

export const onUnload: UmbEntryPointOnUnload = () => {
  window.removeEventListener(NEATTIP_SETTINGS_CHANGED_EVENT, onSettingsChanged);
  stopNeatTip();
  removeStyles();
  hostElement = undefined;
};
