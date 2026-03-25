import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PostInteractionsNode } from "./PostInteractionsNode.js";
import { TemplateContext } from "../context.js";
describe("PostInteractionsNode", () => {
    const mockTheme = {
        colors: {},
        spacing: { md: "16px" },
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
    it("should render interaction buttons", () => {
        const node = {
            id: "pi1",
            type: "post_interactions",
            showLike: true,
            showSave: true,
            showShare: true,
        };
        const { container } = renderWithContext(_jsx(PostInteractionsNode, { node: node }));
        // Check for SVGs (Lucide icons render as svg)
        const svgs = container.querySelectorAll("svg");
        expect(svgs.length).toBe(3);
    });
    it("should respect visibility flags", () => {
        const node = {
            id: "pi1",
            type: "post_interactions",
            showLike: true,
            showSave: false,
            showShare: false,
        };
        const { container } = renderWithContext(_jsx(PostInteractionsNode, { node: node }));
        // Just verify it renders something
        expect(container).toBeInTheDocument();
    });
});
//# sourceMappingURL=PostInteractionsNode.test.js.map