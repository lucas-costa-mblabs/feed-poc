import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TemplateProvider } from "./TemplateProvider.js";
import { useTemplateContext } from "./context.js";
const TestComponent = () => {
    const { theme } = useTemplateContext();
    return _jsx("div", { "data-testid": "theme-primary", children: theme.colors.primary });
};
const mockConfig = { accountId: "123", apiKey: "456" };
describe("TemplateProvider", () => {
    const mockTheme = {
        colors: { primary: "#FF0000" },
        spacing: {},
        borderRadius: {},
        typography: {},
    };
    it("should provide theme via context", () => {
        render(_jsx(TemplateProvider, { theme: mockTheme, config: mockConfig, children: _jsx(TestComponent, {}) }));
        expect(screen.getByTestId("theme-primary")).toHaveTextContent("#FF0000");
    });
    it("should throw error if useTemplateContext is used outside provider", () => {
        const SilentErrorComponent = () => {
            try {
                useTemplateContext();
                return null;
            }
            catch (e) {
                return _jsx("div", { "data-testid": "error", children: e.message });
            }
        };
        render(_jsx(SilentErrorComponent, {}));
        expect(screen.getByTestId("error")).toHaveTextContent("useTemplateContext must be used within a <TemplateProvider>");
    });
});
//# sourceMappingURL=TemplateProvider.test.js.map