import type { ReactNode } from "react";
import type { DirectoAiTracker } from "../core/tracker.js";
import type { Theme, DirectoAiTemplate, DirectoAiConfig } from "../core/types.js";
export interface TemplateProviderProps {
    theme: Theme;
    templates?: DirectoAiTemplate[];
    config: DirectoAiConfig;
    tracker?: DirectoAiTracker;
    children: ReactNode;
}
export declare function TemplateProvider({ theme, templates, config, tracker: providedTracker, children, }: TemplateProviderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TemplateProvider.d.ts.map