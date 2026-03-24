import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { DividerNode } from "./DividerNode.js";
import { TemplateContext } from "../context.js";
import React from "react";

describe("DividerNode", () => {
  const mockTheme = {
    colors: {},
    spacing: {},
    borderRadius: {},
    typography: {},
  };

  const renderWithContext = (ui: React.ReactElement) => {
    return render(
      <TemplateContext.Provider
        value={{ theme: mockTheme as any, templates: [] }}
      >
        {ui}
      </TemplateContext.Provider>,
    );
  };

  it("should render a divider element", () => {
    const node = { id: "d1", type: "divider" };
    const { container } = renderWithContext(<DividerNode node={node as any} />);
    const hr = container.querySelector("hr");
    expect(hr).toBeInTheDocument();
  });

  it("should apply thickness styles", () => {
    const node = { id: "d1", type: "divider", thickness: "thick" };
    const { container } = renderWithContext(<DividerNode node={node as any} />);
    const hr = container.querySelector("hr");
    // thickness: thick translates to height/borderWidth 2px based on common logic
    // Let's check DividerNode implementation details if needed.
    expect(hr).toHaveStyle({ borderTopWidth: "2px" });
  });
});
