import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { DividerNode } from "./DividerNode.js";
import { TemplateContext } from "../context.js";
describe("DividerNode", () => {
    const mockTheme = {
        colors: {},
        spacing: {},
        borderRadius: {},
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
    it("should render a divider element", () => {
        const node = { id: "d1", type: "divider" };
        const { container } = renderWithContext(_jsx(DividerNode, { node: node }));
        const hr = container.querySelector("hr");
        expect(hr).toBeInTheDocument();
    });
    it("should apply thickness styles", () => {
        const node = { id: "d1", type: "divider", thickness: "thick" };
        const { container } = renderWithContext(_jsx(DividerNode, { node: node }));
        const hr = container.querySelector("hr");
        // thickness: thick translates to height/borderWidth 2px based on common logic
        // Let's check DividerNode implementation details if needed.
        expect(hr).toHaveStyle({ borderTopWidth: "2px" });
    });
});
//# sourceMappingURL=DividerNode.test.js.map