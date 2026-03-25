import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Post } from "./Post.js";
import { ButtonNode } from "./nodes/ButtonNode.js";
import { PostInteractionsNode } from "./nodes/PostInteractionsNode.js";
import { TemplateContext } from "./context.js";
const mockTheme = {
    colors: { primary: "#6366f1" },
    spacing: { md: "16px" },
    borderRadius: { md: "8px" },
    typography: {},
};
const mockConfig = {
    accountId: "acc_123",
    apiKey: "api_456",
    customerId: "cust_789",
};
const mockPost = {
    id: "post_1",
    templateId: "tpl_1",
    title: "Test Post",
    campaignId: "camp_1",
};
const mockTemplate = {
    id: "tpl_1",
    template: [
        { id: "b1", type: "button", label: "Buy Now", action: "click-buy" },
        { id: "i1", type: "post_interactions", showLike: true },
    ],
};
describe("Tracking & Observability", () => {
    let mockTracker;
    beforeEach(() => {
        mockTracker = {
            trackEvent: vi.fn().mockResolvedValue(undefined),
            trackImpression: vi.fn().mockResolvedValue(undefined),
            trackViewTime: vi.fn().mockResolvedValue(undefined),
        };
        vi.clearAllMocks();
    });
    it("should track button clicks with correct action", () => {
        render(_jsx(TemplateContext.Provider, { value: {
                theme: mockTheme,
                templates: [mockTemplate],
                config: mockConfig,
                tracker: mockTracker,
            }, children: _jsx(ButtonNode, { node: mockTemplate.template[0], dataContext: { post: mockPost } }) }));
        const button = screen.getByText("Buy Now");
        fireEvent.click(button);
        expect(mockTracker.trackEvent).toHaveBeenCalledWith("click-buy", expect.objectContaining({
            contentId: "post_1",
            campaignId: "camp_1",
        }));
    });
    it("should track interaction clicks (like/favorite/share)", () => {
        render(_jsx(TemplateContext.Provider, { value: {
                theme: mockTheme,
                templates: [mockTemplate],
                config: mockConfig,
                tracker: mockTracker,
            }, children: _jsx(PostInteractionsNode, { node: mockTemplate.template[1], dataContext: { post: mockPost } }) }));
        // Lucide icons render as SVG with data-lucide attribute (if configured) or just SVG
        const heartIcon = screen.getByTestId("heart-icon");
        const bookmarkIcon = screen.getByTestId("bookmark-icon");
        const shareIcon = screen.getByTestId("share-icon");
        fireEvent.click(heartIcon);
        expect(mockTracker.trackEvent).toHaveBeenCalledWith("click-like", expect.objectContaining({
            contentId: "post_1",
        }));
        fireEvent.click(bookmarkIcon);
        expect(mockTracker.trackEvent).toHaveBeenCalledWith("click-favorite", expect.objectContaining({
            contentId: "post_1",
        }));
        fireEvent.click(shareIcon);
        expect(mockTracker.trackEvent).toHaveBeenCalledWith("click-share", expect.objectContaining({
            contentId: "post_1",
        }));
    });
    it("should track impressions via Post component", () => {
        const observeSpy = vi.spyOn(IntersectionObserver.prototype, "observe");
        render(_jsx(TemplateContext.Provider, { value: {
                theme: mockTheme,
                templates: [mockTemplate],
                config: mockConfig,
                tracker: mockTracker,
            }, children: _jsx(Post, { post: mockPost }) }));
        expect(observeSpy).toHaveBeenCalled();
    });
});
//# sourceMappingURL=Tracking.test.js.map