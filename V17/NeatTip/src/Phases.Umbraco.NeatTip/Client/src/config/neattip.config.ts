export interface NeatTipConfig {
  minLength: number;
  tooltipDelay: number;
  tooltipMaxWidth: number;
  indicatorChar: string;
  fadeSpeed: number;
  observerDebounceMs: number;
  flashFallbackMs: number;
  viewportMargin: number;
}

export const NEATTIP_CONFIG: NeatTipConfig = {
  minLength: 0,
  tooltipDelay: 200,
  tooltipMaxWidth: 320,
  indicatorChar: "i",
  fadeSpeed: 150,
  observerDebounceMs: 150,
  flashFallbackMs: 3000,
  viewportMargin: 20,
};
