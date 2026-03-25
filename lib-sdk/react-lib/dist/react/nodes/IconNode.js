import { jsx as _jsx } from "react/jsx-runtime";
import { useTemplateContext } from "../context.js";
import { tokenToPx, getRadius, colorToHex } from "../utils.js";
import { ShoppingBag, Sparkles } from "lucide-react";
export function IconNode({ node }) {
    const { theme } = useTemplateContext();
    const baseStyle = {
        flex: node.flex || undefined,
    };
    const p = tokenToPx(theme, node.padding) || "0";
    const size = (typeof node.size === "number" ? node.size : 20);
    const color = colorToHex(theme, node.color) || "#1f2937";
    const IconComponent = node.icon === "shoppingbag" ? ShoppingBag : Sparkles;
    return (_jsx("div", { style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colorToHex(theme, node.backgroundColor) || "transparent",
            padding: p,
            borderRadius: getRadius(theme, node.borderRadius) || "0",
            ...baseStyle,
        }, children: _jsx(IconComponent, { size: size, color: color, strokeWidth: 1.5 }) }));
}
//# sourceMappingURL=IconNode.js.map