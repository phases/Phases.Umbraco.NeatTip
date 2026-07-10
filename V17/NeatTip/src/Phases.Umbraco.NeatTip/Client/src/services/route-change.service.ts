const ROUTE_POLL_INTERVAL_MS = 200;
const ROUTE_NOTIFY_DELAYS_MS = [0, 50, 150, 400, 800, 1500];
const HISTORY_NOTIFY_DELAYS_MS = [50, 150, 400, 800];

class RouteChangeService {
  #listeners = new Set<() => void>();
  #intervalId: ReturnType<typeof setInterval> | undefined;
  #lastLocation = "";
  #originalPushState: History["pushState"] | undefined;
  #originalReplaceState: History["replaceState"] | undefined;
  readonly #onPopStateOrHashChange = (): void => {
    this.#handleLocationChange();
  };

  subscribe(listener: () => void): () => void {
    this.#listeners.add(listener);

    if (this.#listeners.size === 1) {
      this.#start();
    }

    return () => {
      this.#listeners.delete(listener);

      if (this.#listeners.size === 0) {
        this.#stop();
      }
    };
  }

  notifyNow(): void {
    this.#notifyListeners();
  }

  #start(): void {
    this.#lastLocation = this.#getLocation();
    this.#patchHistory();
    window.addEventListener("popstate", this.#onPopStateOrHashChange);
    window.addEventListener("hashchange", this.#onPopStateOrHashChange);

    this.#intervalId = window.setInterval(() => {
      const current = this.#getLocation();
      if (current === this.#lastLocation) {
        return;
      }

      this.#lastLocation = current;
      this.#notifyListeners();
    }, ROUTE_POLL_INTERVAL_MS);
  }

  #stop(): void {
    if (this.#intervalId) {
      clearInterval(this.#intervalId);
      this.#intervalId = undefined;
    }

    window.removeEventListener("popstate", this.#onPopStateOrHashChange);
    window.removeEventListener("hashchange", this.#onPopStateOrHashChange);
    this.#restoreHistory();
  }

  #patchHistory(): void {
    if (this.#originalPushState) {
      return;
    }

    this.#originalPushState = history.pushState.bind(history);
    this.#originalReplaceState = history.replaceState.bind(history);

    history.pushState = (...args) => {
      this.#originalPushState!(...args);
      this.#notifyHistoryNavigation();
    };

    history.replaceState = (...args) => {
      this.#originalReplaceState!(...args);
      this.#notifyHistoryNavigation();
    };
  }

  #restoreHistory(): void {
    if (this.#originalPushState) {
      history.pushState = this.#originalPushState;
    }

    if (this.#originalReplaceState) {
      history.replaceState = this.#originalReplaceState;
    }

    this.#originalPushState = undefined;
    this.#originalReplaceState = undefined;
  }

  #handleLocationChange(): void {
    const current = this.#getLocation();
    if (current !== this.#lastLocation) {
      this.#lastLocation = current;
    }

    this.#notifyListeners();
  }

  #notifyHistoryNavigation(): void {
    const current = this.#getLocation();
    if (current !== this.#lastLocation) {
      this.#lastLocation = current;
    }

    queueMicrotask(() => {
      this.#invokeListeners();
    });

    for (const delay of HISTORY_NOTIFY_DELAYS_MS) {
      window.setTimeout(() => {
        this.#invokeListeners();
      }, delay);
    }
  }

  #notifyListeners(): void {
    this.#invokeListeners();

    for (const delay of ROUTE_NOTIFY_DELAYS_MS) {
      window.setTimeout(() => {
        this.#invokeListeners();
      }, delay);
    }
  }

  #invokeListeners(): void {
    for (const listener of this.#listeners) {
      listener();
    }
  }

  #getLocation(): string {
    return `${window.location.pathname}${window.location.search}${window.location.hash}`;
  }
}

let sharedRouteChangeService: RouteChangeService | undefined;

/** Shared route-change detection: history patch, popstate/hashchange, and polling. */
export function subscribeRouteChanges(listener: () => void): () => void {
  if (!sharedRouteChangeService) {
    sharedRouteChangeService = new RouteChangeService();
  }

  return sharedRouteChangeService.subscribe(listener);
}

/** Notify all route-change subscribers immediately (with follow-up delayed scans). */
export function notifyRouteChangeNow(): void {
  sharedRouteChangeService?.notifyNow();
}
