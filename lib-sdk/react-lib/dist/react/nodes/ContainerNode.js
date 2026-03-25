import { jsx as _jsx } from "react/jsx-runtime";
import { useTemplateContext } from "../context.js";
import { tokenToPx, getRadius, colorToHex } from "../utils.js";
import { JSONRenderer } from "../JSONRenderer.js";
export function ContainerNode({ node, dataContext }) {
    const { theme } = useTemplateContext();
    const px = tokenToPx(theme, node.paddingX);
    const py = tokenToPx(theme, node.paddingY);
    const mx = tokenToPx(theme, node.marginX);
    const my = tokenToPx(theme, node.marginY);
    const baseStyle = {
        flex: node.flex || undefined,
        minHeight: node.flex ? 0 : undefined,
    };
    return (_jsx("div", { style: {
            display: "flex",
            flexDirection: node.direction || "column",
            justifyContent: node.justifyContent || "flex-start",
            alignItems: node.alignItems || "stretch",
            paddingLeft: px,
            paddingRight: px,
            paddingTop: py,
            paddingBottom: py,
            marginLeft: mx,
            marginRight: mx,
            marginTop: my,
            marginBottom: my,
            gap: tokenToPx(theme, node.gap),
            backgroundColor: colorToHex(theme, node.backgroundColor),
            borderRadius: getRadius(theme, node.borderRadius),
            border: node.borderWidth
                ? `${node.borderWidth} ${node.borderStyle || "solid"} ${colorToHex(theme, node.borderColor) || "#000"}`
                : undefined,
            width: node.width || "auto",
            height: node.height || "auto",
            boxSizing: "border-box",
            ...baseStyle,
        }, children: node.blocks?.map((child) => (_jsx(JSONRenderer, { node: child, dataContext: dataContext }, child.id))) }));
}
//# sourceMappingURL=ContainerNode.js.map