import { createContext, useContext } from "react";
export const TemplateContext = createContext(null);
export function useTemplateContext() {
    const ctx = useContext(TemplateContext);
    if (!ctx) {
        throw new Error("useTemplateContext must be used within a <TemplateProvider>");
    }
    return ctx;
}
//# sourceMappingURL=context.js.map