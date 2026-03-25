import { createContext, useContext } from "react";
import type {
  Theme,
  DirectoAiTemplate,
  DirectoAiConfig,
} from "../core/types.js";
import type { DirectoAiTracker } from "../core/tracker.js";

export interface TemplateContextValue {
  theme: Theme;
  templates: DirectoAiTemplate[];
  config?: DirectoAiConfig;
  tracker: DirectoAiTracker;
}

export const TemplateContext = createContext<TemplateContextValue | null>(null);

export function useTemplateContext(): TemplateContextValue {
  const ctx = useContext(TemplateContext);
  if (!ctx) {
    throw new Error(
      "useTemplateContext must be used within a <TemplateProvider>",
    );
  }
  return ctx;
}
