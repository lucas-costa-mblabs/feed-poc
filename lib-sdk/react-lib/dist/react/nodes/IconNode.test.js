import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { IconNode } from "./IconNode.js";
import { TemplateContext } from "../context.js";
describe("IconNode", () => {
    const mockTheme = {
        colors: { "gray-100": "#F3F4F6" },
        spacing: { sm: "8px" },
        borderRadius: { full: "999px" },
        typography: {},
    };
    const mockTracker = {
        trackEvent: async () => { },
        trackImpression: async () => { },
        trackViewTime: async () => { },
    };
    const renderWithContext = (ui) => {
        return render(_jsx(TemplateContext.Provider, { value: {
                theme: mockTheme,
                templates: [],
                tracker: mockTracker,
            }, children: ui }));
    };
    it("should render an icon container", () => {
        const node = {
            id: "i1",
            type: "icon",
            icon: "shoppingbag",
            backgroundColor: "gray-100",
            borderRadius: "full",
            padding: "sm",
        };
        const { container } = renderWithContext(_jsx(IconNode, { node: node }));
        const div = container.firstChild;
        expect(div).toHaveStyle({
            backgroundColor: "#F3F4F6",
            borderRadius: "999px",
            padding: "8px",
        });
    });
});
//# sourceMappingURL=IconNode.test.js.map