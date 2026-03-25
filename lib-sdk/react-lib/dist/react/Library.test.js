import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TextNode } from "./nodes/TextNode.js";
import { ContainerNode } from "./nodes/ContainerNode.js";
import { JSONRenderer } from "./JSONRenderer.js";
import { TemplateContext } from "./context.js";
import { resolveVariables, tokenToPx } from "./utils.js";
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
        expect(resolveVariables("Hello {{missing}}", data)).toBe("Hello {{missing}}");
    });
});
describe("tokenToPx", () => {
    const theme = {
        spacing: { sm: "8px", md: "16px" },
        borderRadius: {},
        colors: {},
        typography: {},
    };
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
describe("JSONRenderer", () => {
    const mockTheme = {
        colors: {},
        spacing: {},
        borderRadius: {},
        typography: {},
    };
    it("should render correct component based on type", () => {
        const node = { id: "1", type: "text", value: "Rendered Text" };
        render(_jsx(TemplateContext.Provider, { value: {
                theme: mockTheme,
                templates: [],
                tracker: mockTracker,
            }, children: _jsx(JSONRenderer, { node: node }) }));
        expect(screen.getByText("Rendered Text")).toBeInTheDocument();
    });
    it("should render unknown node placeholder for missing types", () => {
        const node = { id: "1", type: "invalid" };
        render(_jsx(TemplateContext.Provider, { value: {
                theme: mockTheme,
                templates: [],
                tracker: mockTracker,
            }, children: _jsx(JSONRenderer, { node: node }) }));
        expect(screen.getByText(/Unknown Node: invalid/)).toBeInTheDocument();
    });
});
describe("ContainerNode", () => {
    const mockTheme = {
        colors: { bg: "#F3F4F6" },
        spacing: { md: "16px" },
        borderRadius: { md: "8px" },
        typography: {},
    };
    const renderContainer = (node) => {
        return render(_jsx(TemplateContext.Provider, { value: {
                theme: mockTheme,
                templates: [],
                tracker: mockTracker,
            }, children: _jsx(ContainerNode, { node: node }) }));
    };
    it("should render children blocks", () => {
        const node = {
            id: "c1",
            type: "container",
            blocks: [
                { id: "t1", type: "text", value: "Child 1" },
                { id: "t2", type: "text", value: "Child 2" },
            ],
        };
        renderContainer(node);
        expect(screen.getByText("Child 1")).toBeInTheDocument();
        expect(screen.getByText("Child 2")).toBeInTheDocument();
    });
    it("should apply layout styles", () => {
        const node = {
            id: "c1",
            type: "container",
            direction: "row",
            alignItems: "center",
            paddingX: "md",
        };
        const { container } = renderContainer(node);
        const div = container.firstChild;
        expect(div).toHaveStyle({
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: "16px",
        });
    });
});
describe("TextNode", () => {
    it("should render text value", () => {
        const node = { id: "1", type: "text", value: "Hello World" };
        renderWithContext(_jsx(TextNode, { node: node }));
        expect(screen.getByText("Hello World")).toBeInTheDocument();
    });
    it("should resolve variables in value", () => {
        const node = { id: "1", type: "text", value: "Hello {{name}}" };
        const data = { name: "John" };
        renderWithContext(_jsx(TextNode, { node: node, dataContext: data }));
        expect(screen.getByText("Hello John")).toBeInTheDocument();
    });
    it("should apply typography styles", () => {
        const node = {
            id: "1",
            type: "text",
            value: "Title",
            typography: "heading1",
        };
        renderWithContext(_jsx(TextNode, { node: node }));
        const element = screen.getByText("Title");
        // In our implementation, if typography is in theme, we get the size from theme.
        // The boldness is only applied if NOT in theme OR if explicitly set.
        expect(element).toHaveStyle({ fontSize: "32px" });
    });
    it("should apply custom fontWeight", () => {
        const node = { id: "1", type: "text", value: "Bold", fontWeight: "bold" };
        renderWithContext(_jsx(TextNode, { node: node }));
        expect(screen.getByText("Bold")).toHaveStyle({ fontWeight: "bold" });
    });
    it("should apply color from theme", () => {
        const node = { id: "1", type: "text", value: "Colored", color: "primary" };
        renderWithContext(_jsx(TextNode, { node: node }));
        expect(screen.getByText("Colored")).toHaveStyle({ color: "#FF0000" });
    });
});
//# sourceMappingURL=Library.test.js.map