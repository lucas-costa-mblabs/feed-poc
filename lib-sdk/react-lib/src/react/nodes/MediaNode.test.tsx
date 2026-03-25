import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MediaNode } from "./MediaNode.js";
import { TemplateContext } from "../context.js";
import React from "react";

describe("MediaNode", () => {
  const mockTheme = {
    colors: {},
    spacing: {},
    borderRadius: {},
    typography: {},
  };

  const mockTracker = {
    trackEvent: async () => {},
    trackImpression: async () => {},
    trackViewTime: async () => {},
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

  it("should render image with src", () => {
    const node = {
      id: "m1",
      type: "media",
      url: "https://example.com/test.png",
      alt: "Test Image",
    };
    renderWithContext(<MediaNode node={node as any} />);
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
    renderWithContext(<MediaNode node={node as any} dataContext={data} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/resolved.png");
  });

  it("should not render if URL is empty", () => {
    const node = {
      id: "m1",
      type: "media",
      url: "",
    };
    const { container } = renderWithContext(<MediaNode node={node as any} />);
    expect(container.firstChild).toBeNull();
  });
});
