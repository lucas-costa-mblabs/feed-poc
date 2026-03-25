import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ButtonNode } from "./ButtonNode.js";
import { TemplateContext } from "../context.js";
describe("ButtonNode", () => {
    const mockTheme = {
        colors: { primary: "#6366F1" },
        spacing: { md: "16px" },
        borderRadius: { md: "8px" },
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
    it("should render with label", () => {
        const node = {
            id: "b1",
            type: "button",
            label: "Click Me",
            variant: "primary",
        };
        renderWithContext(_jsx(ButtonNode, { node: node }));
        expect(screen.getByText("Click Me")).toBeInTheDocument();
    });
    it("should apply primary styles from theme", () => {
        const node = {
            id: "b1",
            type: "button",
            label: "Primary",
            variant: "primary",
            background: "primary",
        };
        renderWithContext(_jsx(ButtonNode, { node: node }));
        const button = screen.getByRole("button");
        expect(button).toHaveStyle({ backgroundColor: "#6366F1" });
    });
    it("should resolve variables in label", () => {
        const node = {
            id: "b1",
            type: "button",
            label: "Hello {{name}}",
        };
        const data = { name: "World" };
        renderWithContext(_jsx(ButtonNode, { node: node, dataContext: data }));
        expect(screen.getByText("Hello World")).toBeInTheDocument();
    });
});
//# sourceMappingURL=ButtonNode.test.js.map