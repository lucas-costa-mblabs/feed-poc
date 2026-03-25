import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { TemplateContext } from "./context.js";
import { DefaultDirectoAiTracker } from "../core/tracker.js";
export function TemplateProvider({ theme, templates = [], config, tracker: providedTracker, children, }) {
    const tracker = useMemo(() => {
        return providedTracker || new DefaultDirectoAiTracker(config);
    }, [providedTracker, config]);
    return (_jsx(TemplateContext.Provider, { value: { theme, templates, config, tracker }, children: children }));
}
//# sourceMappingURL=TemplateProvider.js.map