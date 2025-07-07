import type { HSOverlay, IStaticMethods } from "flyonui/flyonui";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
    HSOverlay: typeof HSOverlay;
  }
}
