import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MediaNode } from "./MediaNode.js";
import { TemplateContext } from "../context.js";
describe("MediaNode", () => {
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
    it("should render image with src", () => {
        const node = {
            id: "m1",
            type: "media",
            url: "https://example.com/test.png",
            alt: "Test Image",
        };
        renderWithContext(_jsx(MediaNode, { node: node }));
        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", "https://example.com/test.png");
        expect(img).toHaveAttribute("alt", "Test Image");
    });
    it("should resolve variables in URL", () => {
        const node = {
            id: "m1",
            type: "media",
            url: "{{post.image}}",
        };
        const data = { post: { image: "https://example.com/resolved.png" } };
        renderWithContext(_jsx(MediaNode, { node: node, dataContext: data }));
        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", "https://example.com/resolved.png");
    });
    it("should not render if URL is empty", () => {
        const node = {
            id: "m1",
            type: "media",
            url: "",
        };
        const { container } = renderWithContext(_jsx(MediaNode, { node: node }));
        expect(container.firstChild).toBeNull();
    });
});
//# sourceMappingURL=MediaNode.test.js.map