import type { ReactNode } from "react";
import { TemplateContext } from "./context.js";
import type { Theme, CVDTemplate } from "../core/types.js";

export interface TemplateProviderProps {
  theme: Theme;
  templates?: CVDTemplate[];
  children: ReactNode;
}

export function TemplateProvider({
  theme,
  templates = [],
  children,
}: TemplateProviderProps) {
  return (
    <TemplateContext.Provider value={{ theme, templates }}>
      {children}
    </TemplateContext.Provider>
  );
}
