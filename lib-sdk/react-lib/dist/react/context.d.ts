import type { Theme, DirectoAiTemplate, DirectoAiConfig } from "../core/types.js";
import type { DirectoAiTracker } from "../core/tracker.js";
export interface TemplateContextValue {
    theme: Theme;
    templates: DirectoAiTemplate[];
    config?: DirectoAiConfig;
    tracker: DirectoAiTracker;
}
export declare const TemplateContext: import("react").Context<TemplateContextValue | null>;
export declare function useTemplateContext(): TemplateContextValue;
//# sourceMappingURL=context.d.ts.map