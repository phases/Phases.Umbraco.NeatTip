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
import {
  ensureNeatTipDocumentStyles,
  removeNeatTipDocumentStyles,
} from "../utils/neattip-style-host.util.js";
import {
  startFlashPreventionBootstrap,
  stopFlashPreventionBootstrap,
} from "../flash-prevention-bootstrap.js";
import {
  markNeatTipPackageLoaded,
  setNeatTipTooltipServiceActive,
} from "../settings/neattip-diagnostics.js";

let hostElement: UmbElement | undefined;
let neatTipService: NeatTipService | undefined;

function injectStyles(): void {
  ensureNeatTipDocumentStyles();
}

function removeStyles(): void {
  removeNeatTipDocumentStyles();
}

function startNeatTip(): void {
  if (!neattipRuntime.enabled || !hostElement) {
    setNeatTipTooltipServiceActive(false);
    return;
  }

  if (!neatTipService) {
    neatTipService = new NeatTipService(hostElement);
    neatTipService.start();
  } else {
    neatTipService.syncPermissionsFromRuntime();
  }

  setNeatTipTooltipServiceActive(true);
}

function stopNeatTip(): void {
  neatTipService?.stop();
  neatTipService = undefined;
  setNeatTipTooltipServiceActive(false);
}

async function applyRuntimeSettings(): Promise<void> {
  try {
    await loadNeatTipSettings();
  } catch {
    neattipRuntime.settingsLoaded = true;
  }

  if (neattipRuntime.enabled) {
    startFlashPreventionBootstrap();
    startNeatTip();
    neatTipService?.syncPermissionsFromRuntime();
    neatTipService?.rescan();
    return;
  }

  stopFlashPreventionBootstrap();
  stopNeatTip();
  restoreAllNeatTipLayouts();
}

const onSettingsChanged = (): void => {
  if (neattipRuntime.enabled) {
    startFlashPreventionBootstrap();
    restoreAllNeatTipLayouts();
    startNeatTip();
    neatTipService?.syncPermissionsFromRuntime();
    neatTipService?.rescan();
    return;
  }

  stopFlashPreventionBootstrap();
  stopNeatTip();
  restoreAllNeatTipLayouts();
};

export const onInit: UmbEntryPointOnInit = (host) => {
  hostElement = host;
  markNeatTipPackageLoaded();
  injectStyles();
  void applyRuntimeSettings();
  window.addEventListener(NEATTIP_SETTINGS_CHANGED_EVENT, onSettingsChanged);
};

export const onUnload: UmbEntryPointOnUnload = () => {
  window.removeEventListener(NEATTIP_SETTINGS_CHANGED_EVENT, onSettingsChanged);
  stopFlashPreventionBootstrap();
  stopNeatTip();
  removeStyles();
  hostElement = undefined;
};
