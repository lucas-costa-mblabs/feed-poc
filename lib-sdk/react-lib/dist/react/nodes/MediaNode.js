import { jsx as _jsx } from "react/jsx-runtime";
import { resolveVariables } from "../utils.js";
export function MediaNode({ node, dataContext }) {
    const url = resolveVariables(node.url, dataContext)?.trim();
    if (!url)
        return null;
    const baseStyle = {
        flex: node.flex || undefined,
        minHeight: node.flex ? 0 : undefined,
    };
    return (_jsx("div", { style: {
            width: node.width || "100%",
            height: node.height || "auto",
            display: "flex",
            overflow: "hidden",
            ...baseStyle,
        }, children: _jsx("img", { src: url, alt: resolveVariables(node.alt || "image", dataContext), style: {
                width: "100%",
                height: "100%",
                objectFit: node.objectFit || "cover",
            } }) }));
}
//# sourceMappingURL=MediaNode.js.map