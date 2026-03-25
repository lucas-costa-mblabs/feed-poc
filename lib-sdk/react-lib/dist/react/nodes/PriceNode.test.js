import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PriceNode } from "./PriceNode.js";
import { TemplateContext } from "../context.js";
describe("PriceNode", () => {
    const mockTheme = {
        colors: { "gray-900": "#111827" },
        spacing: { md: "16px" },
        borderRadius: {},
        typography: {},
    };
    const mockTracker = {
        trackEvent: async () => { },
        trackImpression: async () => { },
        trackViewTime: async () => { },
    };
    const renderWithContext = (ui) => {
        return render(_jsx(TemplateContext.Provider, { value: {
                theme: mockTheme,
                templates: [],
                tracker: mockTracker,
            }, children: ui }));
    };
    it("should render current price", () => {
        const node = {
            id: "p1",
            type: "price",
            price: "R$ 99,90",
            showOriginalPrice: false,
            showDiscountPercent: false,
        };
        renderWithContext(_jsx(PriceNode, { node: node }));
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
        renderWithContext(_jsx(PriceNode, { node: node }));
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
        renderWithContext(_jsx(PriceNode, { node: node, dataContext: data }));
        expect(screen.getByText("R$ 49,90")).toBeInTheDocument();
        expect(screen.getByText("R$ 59,90")).toBeInTheDocument();
        expect(screen.getByText("16% OFF")).toBeInTheDocument();
    });
});
//# sourceMappingURL=PriceNode.test.js.map