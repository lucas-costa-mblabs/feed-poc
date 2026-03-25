import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { IconNode } from "./IconNode.js";
import { TemplateContext } from "../context.js";
import React from "react";

describe("IconNode", () => {
  const mockTheme = {
    colors: { "gray-100": "#F3F4F6" },
    spacing: { sm: "8px" },
    borderRadius: { full: "999px" },
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

  it("should render an icon container", () => {
    const node = {
      id: "i1",
      type: "icon",
      icon: "shoppingbag",
      backgroundColor: "gray-100",
      borderRadius: "full",
      padding: "sm",
    };
    const { container } = renderWithContext(<IconNode node={node as any} />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveStyle({
      backgroundColor: "#F3F4F6",
      borderRadius: "999px",
      padding: "8px",
    });
  });
});
