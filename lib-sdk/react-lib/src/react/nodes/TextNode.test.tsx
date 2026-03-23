import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TextNode } from "./TextNode.js";
import { TemplateContext } from "../context.js";
import React from "react";
import {
  resolveVariables,
  tokenToPx,
  getRadius,
  colorToHex,
} from "../utils.js";

describe("resolveVariables", () => {
  it("should resolve simple variable", () => {
    const data = { name: "John" };
    expect(resolveVariables("Hello {{name}}", data)).toBe("Hello John");
  });

  it("should resolve nested variable", () => {
    const data = { user: { name: "John" } };
    expect(resolveVariables("Hello {{user.name}}", data)).toBe("Hello John");
  });

  it("should return original tag if variable not found", () => {
    const data = { user: "John" };
    expect(resolveVariables("Hello {{missing}}", data)).toBe(
      "Hello {{missing}}",
    );
  });
});

describe("tokenToPx", () => {
  const theme = {
    spacing: { sm: "8px", md: "16px" },
    borderRadius: {},
    colors: {},
    typography: {},
  } as any;

  it("should resolve spacing tokens", () => {
    expect(tokenToPx(theme, "sm")).toBe("8px");
    expect(tokenToPx(theme, "md")).toBe("16px");
    expect(tokenToPx(theme, "24px")).toBe("24px");
    expect(tokenToPx(theme, "10")).toBe("10");
  });
});

const mockTheme = {
  colors: { primary: "#FF0000" },
  spacing: {},
  borderRadius: {},
  typography: { body: "16px", heading1: "32px" },
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

describe("TextNode", () => {
  it("should render text value", () => {
    const node = { id: "1", type: "text", value: "Hello World" };
    renderWithContext(<TextNode node={node as any} />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("should resolve variables in value", () => {
    const node = { id: "1", type: "text", value: "Hello {{name}}" };
    const data = { name: "John" };
    renderWithContext(<TextNode node={node as any} dataContext={data} />);
    expect(screen.getByText("Hello John")).toBeInTheDocument();
  });

  it("should apply typography styles", () => {
    const node = {
      id: "1",
      type: "text",
      value: "Title",
      typography: "heading1",
    };
    renderWithContext(<TextNode node={node as any} />);
    const element = screen.getByText("Title");
    // In our implementation, if typography is in theme, we get the size from theme.
    // The boldness is only applied if NOT in theme OR if explicitly set.
    expect(element).toHaveStyle({ fontSize: "32px" });
  });

  it("should apply custom fontWeight", () => {
    const node = { id: "1", type: "text", value: "Bold", fontWeight: "bold" };
    renderWithContext(<TextNode node={node as any} />);
    expect(screen.getByText("Bold")).toHaveStyle({ fontWeight: "bold" });
  });

  it("should apply color from theme", () => {
    const node = { id: "1", type: "text", value: "Colored", color: "primary" };
    renderWithContext(<TextNode node={node as any} />);
    expect(screen.getByText("Colored")).toHaveStyle({ color: "#FF0000" });
  });
});
