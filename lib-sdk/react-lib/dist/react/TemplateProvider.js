import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo, useEffect } from "react";
import { TemplateContext } from "./context.js";
import { DefaultDirectoAiTracker } from "../core/tracker.js";
export function TemplateProvider({ theme, templates = [], config, tracker: providedTracker, children, }) {
    const tracker = useMemo(() => {
        return providedTracker || new DefaultDirectoAiTracker(config);
    }, [providedTracker, config]);
    // Warning para ajudar no debug do projeto real
    useEffect(() => {
        if (!templates || templates.length === 0) {
            console.warn("@directo/template-builder: Nenhum template fornecido ao TemplateProvider. Verifique se os dados da API foram carregados e mapeados corretamente.");
        }
        if (!theme || !theme.colors) {
            console.warn("@directo/template-builder: Nenhum tema (theme) fornecido ao TemplateProvider. Usando estilos default.");
        }
    }, [templates, theme]);
    return (_jsx(TemplateContext.Provider, { value: { theme, templates, config, tracker }, children: children }));
}
//# sourceMappingURL=TemplateProvider.js.map