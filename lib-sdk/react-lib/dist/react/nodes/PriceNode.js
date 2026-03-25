import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTemplateContext } from "../context.js";
import { tokenToPx, resolveVariables } from "../utils.js";
export function PriceNode({ node, dataContext }) {
    const { theme } = useTemplateContext();
    const baseStyle = {
        flex: node.flex || undefined,
    };
    const px = tokenToPx(theme, node.paddingX) || "0";
    const py = tokenToPx(theme, node.paddingY) || "8px";
    return (_jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            padding: `${py} ${px}`,
            ...baseStyle,
        }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: "6px" }, children: [node.showOriginalPrice !== false && node.originalPrice && (_jsx("span", { style: {
                            fontSize: "12px",
                            color: "#94a3b8",
                            textDecoration: "line-through",
                        }, children: resolveVariables(node.originalPrice, dataContext) })), node.showDiscountPercent !== false && node.discountPercent && (_jsxs("span", { style: {
                            backgroundColor: "#fecaca",
                            color: "#dc2626",
                            fontSize: "10px",
                            fontWeight: "bold",
                            padding: "1px 4px",
                            borderRadius: "3px",
                        }, children: [resolveVariables(node.discountPercent, dataContext), "% OFF"] }))] }), _jsx("span", { style: { fontSize: "20px", fontWeight: "bold", color: "#111827" }, children: resolveVariables(node.price, dataContext) })] }));
}
//# sourceMappingURL=PriceNode.js.map