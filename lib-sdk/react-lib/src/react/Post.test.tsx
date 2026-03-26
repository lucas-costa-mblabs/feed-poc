import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Post } from "./Post.js";
import { TemplateContext } from "./context.js";
import React from "react";

vi.mock("./hooks/useImpressionObserver.js", () => ({
  useImpressionObserver: ({ contentId, tracker, data }: any) => {
    // Simula a chamada imediata para verificar se o contentId está correto
    tracker.trackImpression(contentId, data);
    return { elementRef: { current: null }, isIntersecting: true };
  },
}));

const mockTheme = {
  colors: { primary: "#FF0000" },
  spacing: {},
  borderRadius: {},
  typography: {},
};

const mockTracker = {
  trackEvent: vi.fn(),
  trackImpression: vi.fn(),
  trackViewTime: vi.fn(),
};

const renderPost = (post: any, templates: any[] = []) => {
  return render(
    <TemplateContext.Provider
      value={{
        theme: mockTheme as any,
        templates,
        tracker: mockTracker as any,
      }}
    >
      <Post post={post} />
    </TemplateContext.Provider>,
  );
};

describe("Post Component", () => {
  it("should render template if found", () => {
    const templates = [
      {
        id: "t1",
        template: [{ id: "n1", type: "text", value: "Template Node" }],
      },
    ];
    const post = { id: "p1", templateId: "t1" };
    renderPost(post, templates as any);
    expect(screen.getByText("Template Node")).toBeInTheDocument();
  });

  it("should fallback to dangerouslySetInnerHTML if template not found but post.template exists", () => {
    const post = {
      id: "p1",
      templateId: "missing",
      template: "<div data-testid='custom-html'>Custom HTML Content</div>",
    };
    renderPost(post, []);
    expect(screen.getByText("Custom HTML Content")).toBeInTheDocument();
  });

  it("should show 'Template não encontrado' message if both template and fallback are missing", () => {
    const post = { id: "p1", templateId: "missing" };
    renderPost(post, []);
    expect(
      screen.getByText(/Template não encontrado: missing/),
    ).toBeInTheDocument();
  });

  it("should handle contentId if id is missing", () => {
    const post = {
      contentId: "c1",
      templateId: "missing",
      template: "<div>HTML fallback</div>",
    };
    renderPost(post, []);
    // contentId should be passed to useImpressionObserver
    expect(mockTracker.trackImpression).toHaveBeenCalledWith(
      "c1",
      expect.any(Object),
    );
  });
});
