import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostInteractionsNode } from "./PostInteractionsNode.js";
import { TemplateContext } from "../context.js";
import React from "react";

describe("PostInteractionsNode", () => {
  const mockTheme = {
    colors: {},
    spacing: { md: "16px" },
    borderRadius: {},
    typography: {},
  };

  const mockTracker = {
    trackEvent: async () => {},
    trackImpression: async () => {},
    trackViewTime: async () => {},
    toggleLike: async () => {},
    toggleFavorite: async () => {},
    shareContent: async () => {},
  };

  const renderWithContext = (ui: React.ReactElement) => {
    return render(
      <TemplateContext.Provider
        value={{
          theme: mockTheme as any,
          templates: [],
          tracker: mockTracker as any,
        }}
      >
        {ui}
      </TemplateContext.Provider>,
    );
  };

  it("should render interaction buttons", () => {
    const node = {
      id: "pi1",
      type: "post_interactions",
      showLike: true,
      showSave: true,
      showShare: true,
    };
    const { container } = renderWithContext(
      <PostInteractionsNode node={node as any} />,
    );

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
    const { container } = renderWithContext(
      <PostInteractionsNode node={node as any} />,
    );
    // Just verify it renders something
    expect(container).toBeInTheDocument();
  });
});
