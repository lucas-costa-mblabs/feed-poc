import { jsx as _jsx } from "react/jsx-runtime";
import { useTemplateContext } from "../context.js";
import { tokenToPx, resolveVariables } from "../utils.js";
export function HtmlNode({ node, dataContext }) {
    const { theme } = useTemplateContext();
    const rawHtml = resolveVariables(node.html || "", dataContext);
    if (!rawHtml)
        return null;
    const px = tokenToPx(theme, node.paddingX) || "0";
    const py = tokenToPx(theme, node.paddingY) || "0";
    const style = {
        padding: `${py} ${px}`,
        width: node.width || "100%",
        height: node.height || "auto",
        flex: node.flex || undefined,
    };
    return _jsx("div", { style: style, dangerouslySetInnerHTML: { __html: rawHtml } });
}
//# sourceMappingURL=HtmlNode.js.map