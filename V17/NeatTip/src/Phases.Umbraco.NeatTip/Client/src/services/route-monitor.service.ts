const ROUTE_SCAN_DELAYS_MS = [0, 50, 150, 400, 800, 1500];

export class RouteMonitorService {
  #listeners = new Set<() => void>();
  #intervalId: ReturnType<typeof setInterval> | undefined;
  #lastLocation = "";

  start(): void {
    this.#lastLocation = this.#getLocation();

    this.#intervalId = window.setInterval(() => {
      const current = this.#getLocation();
      if (current === this.#lastLocation) {
        return;
      }

      this.#lastLocation = current;
      this.#notifyRouteChange();
    }, 200);
  }

  stop(): void {
    if (this.#intervalId) {
      clearInterval(this.#intervalId);
      this.#intervalId = undefined;
    }
  }

  subscribe(listener: () => void): () => void {
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  }

  notifyNow(): void {
    this.#notifyRouteChange();
  }

  #getLocation(): string {
    return `${window.location.pathname}${window.location.search}${window.location.hash}`;
  }

  #notifyRouteChange(): void {
    for (const listener of this.#listeners) {
      listener();
    }

    for (const delay of ROUTE_SCAN_DELAYS_MS) {
      window.setTimeout(() => {
        for (const listener of this.#listeners) {
          listener();
        }
      }, delay);
    }
  }
}
