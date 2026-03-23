import { createContext, useContext } from "react";
import type { Theme, CVDTemplate } from "../core/types.js";

export interface TemplateContextValue {
  theme: Theme;
  templates: CVDTemplate[];
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
