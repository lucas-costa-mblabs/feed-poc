import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TemplateProvider } from "./TemplateProvider.js";
import { useTemplateContext } from "./context.js";
import React from "react";

const TestComponent = () => {
  const { theme } = useTemplateContext();
  return <div data-testid="theme-primary">{theme.colors.primary}</div>;
};

const mockConfig = { accountId: "123", apiKey: "456" };

describe("TemplateProvider", () => {
  const mockTheme = {
    colors: { primary: "#FF0000" },
    spacing: {},
    borderRadius: {},
    typography: {},
  };

  it("should provide theme via context", () => {
    render(
      <TemplateProvider theme={mockTheme as any} config={mockConfig}>
        <TestComponent />
      </TemplateProvider>,
    );
    expect(screen.getByTestId("theme-primary")).toHaveTextContent("#FF0000");
  });

  it("should throw error if useTemplateContext is used outside provider", () => {
    const SilentErrorComponent = () => {
      try {
        useTemplateContext();
        return null;
      } catch (e: any) {
        return <div data-testid="error">{e.message}</div>;
      }
    };
    render(<SilentErrorComponent />);
    expect(screen.getByTestId("error")).toHaveTextContent(
      "useTemplateContext must be used within a <TemplateProvider>",
    );
  });
});
