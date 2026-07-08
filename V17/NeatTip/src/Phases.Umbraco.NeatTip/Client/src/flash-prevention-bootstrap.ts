import {
  hideDescriptionTargets,
  isFlashPreventionContext,
} from "./utils/flash-description.util.js";
import { neattipRuntime } from "./config/neattip-runtime.js";
import { collectPropertyLayouts } from "./utils/shadow-dom.util.js";
import { ShadowMutationObserver } from "./utils/shadow-observer.util.js";

let installed = false;
let shadowObserver: ShadowMutationObserver | undefined;
let lastLocation = "";

function getLocation(): string {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function handleLayouts(force = false): void {
  if (!neattipRuntime.settingsLoaded || !neattipRuntime.enabled) {
    return;
  }

  if (!isFlashPreventionContext()) {
    return;
  }

  collectPropertyLayouts().forEach((layout) => hideDescriptionTargets(layout, force));
}

function checkRouteChange(): void {
  const current = getLocation();
  if (current === lastLocation) {
    return;
  }

  lastLocation = current;
  handleLayouts(true);
}

function install(): void {
  if (installed || typeof document === "undefined") {
    return;
  }

  installed = true;
  lastLocation = getLocation();

  if (isFlashPreventionContext()) {
    handleLayouts(true);
  }

  shadowObserver = new ShadowMutationObserver(() => {
    checkRouteChange();
    handleLayouts();
  });

  shadowObserver.start(document.documentElement);
  window.setInterval(checkRouteChange, 200);
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
}
