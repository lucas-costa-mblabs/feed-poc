import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PriceNode } from "./PriceNode.js";
import { TemplateContext } from "../context.js";
import React from "react";

describe("PriceNode", () => {
  const mockTheme = {
    colors: { "gray-900": "#111827" },
    spacing: { md: "16px" },
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

  it("should render current price", () => {
    const node = {
      id: "p1",
      type: "price",
      price: "R$ 99,90",
      showOriginalPrice: false,
      showDiscountPercent: false,
    };
    renderWithContext(<PriceNode node={node as any} />);
    expect(screen.getByText("R$ 99,90")).toBeInTheDocument();
  });

  it("should render original price and discount", () => {
    const node = {
      id: "p1",
      type: "price",
      price: "R$ 99,90",
      originalPrice: "R$ 129,90",
      discountPercent: "23",
      showOriginalPrice: true,
      showDiscountPercent: true,
    };
    renderWithContext(<PriceNode node={node as any} />);
    expect(screen.getByText("R$ 99,90")).toBeInTheDocument();
    expect(screen.getByText("R$ 129,90")).toBeInTheDocument();
    expect(screen.getByText("23% OFF")).toBeInTheDocument();
  });

  it("should resolve variables", () => {
    const node = {
      id: "p1",
      type: "price",
      price: "{{post.price}}",
      originalPrice: "{{post.originalPrice}}",
      discountPercent: "{{post.discount}}",
    };
    const data = {
      post: {
        price: "R$ 49,90",
        originalPrice: "R$ 59,90",
        discount: "16",
      },
    };
    renderWithContext(<PriceNode node={node as any} dataContext={data} />);
    expect(screen.getByText("R$ 49,90")).toBeInTheDocument();
    expect(screen.getByText("R$ 59,90")).toBeInTheDocument();
    expect(screen.getByText("16% OFF")).toBeInTheDocument();
  });
});
