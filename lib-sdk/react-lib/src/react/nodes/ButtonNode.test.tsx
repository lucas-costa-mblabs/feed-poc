import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ButtonNode } from "./ButtonNode.js";
import { TemplateContext } from "../context.js";
import React from "react";

describe("ButtonNode", () => {
  const mockTheme = {
    colors: { primary: "#6366F1" },
    spacing: { md: "16px" },
    borderRadius: { md: "8px" },
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

  it("should render with label", () => {
    const node = {
      id: "b1",
      type: "button",
      label: "Click Me",
      variant: "primary",
    };
    renderWithContext(<ButtonNode node={node as any} />);
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
    renderWithContext(<ButtonNode node={node as any} />);
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
    renderWithContext(<ButtonNode node={node as any} dataContext={data} />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
