import {
  hideDescriptionTargets,
  isFlashPreventionContext,
} from "./utils/flash-description.util.js";
import { neattipRuntime } from "./config/neattip-runtime.js";
import { collectPropertyLayouts } from "./utils/shadow-dom.util.js";
import { subscribeDomMutations } from "./utils/dom-mutation-hub.js";
import { subscribeRouteChanges } from "./services/route-change.service.js";

let active = false;
let lastLocation = "";
let unsubscribeDomMutations: (() => void) | undefined;
let unsubscribeRouteChanges: (() => void) | undefined;

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

function onDomMutation(): void {
  checkRouteChange();
  handleLayouts();
}

/** Start flash-prevention observers only while NeatTip is enabled. */
export function startFlashPreventionBootstrap(): void {
  if (active || typeof document === "undefined") {
    return;
  }

  active = true;
  lastLocation = getLocation();

  if (isFlashPreventionContext()) {
    handleLayouts(true);
  }

  unsubscribeDomMutations = subscribeDomMutations(onDomMutation);
  unsubscribeRouteChanges = subscribeRouteChanges(checkRouteChange);
}

/** Tear down flash-prevention observers when NeatTip is disabled or unloaded. */
export function stopFlashPreventionBootstrap(): void {
  if (!active) {
    return;
  }

  active = false;
  unsubscribeDomMutations?.();
  unsubscribeDomMutations = undefined;
  unsubscribeRouteChanges?.();
  unsubscribeRouteChanges = undefined;
}
