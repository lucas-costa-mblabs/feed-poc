import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { TemplateProvider } from "./TemplateProvider.js";
import { Post } from "./Post.js";
import { ButtonNode } from "./nodes/ButtonNode.js";
import { PostInteractionsNode } from "./nodes/PostInteractionsNode.js";
import { TemplateContext } from "./context.js";

const mockTheme = {
  colors: { primary: "#6366f1" },
  spacing: { md: "16px" },
  borderRadius: { md: "8px" },
  typography: {},
} as any;

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
} as any;

const mockTemplate = {
  id: "tpl_1",
  template: [
    { id: "b1", type: "button", label: "Buy Now", action: "click-buy" },
    { id: "i1", type: "post_interactions", showLike: true },
  ],
} as any;

describe("Tracking & Observability", () => {
  let mockTracker: any;

  beforeEach(() => {
    mockTracker = {
      trackEvent: vi.fn().mockResolvedValue(undefined),
      trackImpression: vi.fn().mockResolvedValue(undefined),
      trackViewTime: vi.fn().mockResolvedValue(undefined),
      toggleLike: vi.fn().mockResolvedValue(undefined),
      toggleFavorite: vi.fn().mockResolvedValue(undefined),
      shareContent: vi.fn().mockResolvedValue(undefined),
    };
    vi.clearAllMocks();
  });

  it("should track button clicks with correct action", () => {
    render(
      <TemplateContext.Provider
        value={{
          theme: mockTheme,
          templates: [mockTemplate],
          config: mockConfig,
          tracker: mockTracker,
        }}
      >
        <ButtonNode
          node={mockTemplate.template[0]}
          dataContext={{ post: mockPost }}
        />
      </TemplateContext.Provider>,
    );

    const button = screen.getByText("Buy Now");
    fireEvent.click(button);

    expect(mockTracker.trackEvent).toHaveBeenCalledWith(
      "click-buy",
      expect.objectContaining({
        contentId: "post_1",
        campaignId: "camp_1",
      }),
    );
  });

  it("should track interaction clicks (like/favorite/share)", () => {
    render(
      <TemplateContext.Provider
        value={{
          theme: mockTheme,
          templates: [mockTemplate],
          config: mockConfig,
          tracker: mockTracker,
        }}
      >
        <PostInteractionsNode
          node={mockTemplate.template[1]}
          dataContext={{ post: mockPost }}
        />
      </TemplateContext.Provider>,
    );

    // Lucide icons render as SVG with data-lucide attribute (if configured) or just SVG
    const heartIcon = screen.getByTestId("heart-icon");
    const bookmarkIcon = screen.getByTestId("bookmark-icon");
    const shareIcon = screen.getByTestId("share-icon");

    fireEvent.click(heartIcon);
    expect(mockTracker.toggleLike).toHaveBeenCalledWith("post_1", "camp_1");

    fireEvent.click(bookmarkIcon);
    expect(mockTracker.toggleFavorite).toHaveBeenCalledWith(
      "post_1",
      "camp_1",
      false, // initial isFavorited state
    );

    fireEvent.click(shareIcon);
    expect(mockTracker.shareContent).toHaveBeenCalledWith(
      "post_1",
      "camp_1",
      "Test Post",
    );
  });

  it("should track impressions via Post component", () => {
    const observeSpy = vi.spyOn(IntersectionObserver.prototype, "observe");

    render(
      <TemplateContext.Provider
        value={{
          theme: mockTheme,
          templates: [mockTemplate],
          config: mockConfig,
          tracker: mockTracker,
        }}
      >
        <Post post={mockPost} />
      </TemplateContext.Provider>,
    );

    expect(observeSpy).toHaveBeenCalled();
  });
});
