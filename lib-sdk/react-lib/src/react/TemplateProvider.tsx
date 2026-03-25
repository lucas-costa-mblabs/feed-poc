import type { ReactNode } from "react";
import { useMemo } from "react";
import { TemplateContext } from "./context.js";
import { DefaultDirectoAiTracker } from "../core/tracker.js";
import type { DirectoAiTracker } from "../core/tracker.js";
import type {
  Theme,
  DirectoAiTemplate,
  DirectoAiConfig,
} from "../core/types.js";

export interface TemplateProviderProps {
  theme: Theme;
  templates?: DirectoAiTemplate[];
  config: DirectoAiConfig;
  tracker?: DirectoAiTracker;
  children: ReactNode;
}

export function TemplateProvider({
  theme,
  templates = [],
  config,
  tracker: providedTracker,
  children,
}: TemplateProviderProps) {
  const tracker = useMemo(() => {
    return providedTracker || new DefaultDirectoAiTracker(config);
  }, [providedTracker, config]);

  return (
    <TemplateContext.Provider value={{ theme, templates, config, tracker }}>
      {children}
    </TemplateContext.Provider>
  );
}
