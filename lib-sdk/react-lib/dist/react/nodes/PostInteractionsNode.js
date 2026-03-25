import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTemplateContext } from "../context.js";
import { tokenToPx } from "../utils.js";
import { Heart, Bookmark, Share2 } from "lucide-react";
export function PostInteractionsNode({ node, dataContext, }) {
    const { theme, tracker } = useTemplateContext();
    const post = dataContext?.post;
    const baseStyle = {
        flex: node.flex || undefined,
    };
    const px = tokenToPx(theme, node.paddingX) || "0";
    const py = tokenToPx(theme, node.paddingY) || "12px";
    const iconSize = 24;
    const iconColor = "#1f2937";
    const iconStrokeWidth = 1.5;
    const iconProps = {
        size: iconSize,
        color: iconColor,
        strokeWidth: iconStrokeWidth,
    };
    const handleAction = (name) => {
        if (post) {
            tracker.trackEvent(name, {
                contentId: post.id,
                campaignId: post.campaignId,
            });
        }
    };
    return (_jsxs("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            padding: `${py} ${px}`,
            ...baseStyle,
        }, children: [_jsxs("div", { style: { display: "flex", gap: "16px" }, children: [node.showLike !== false && (_jsx(Heart, { ...iconProps, "data-testid": "heart-icon", style: { cursor: "pointer" }, onClick: () => handleAction("click-like") })), node.showSave !== false && (_jsx(Bookmark, { ...iconProps, "data-testid": "bookmark-icon", style: { cursor: "pointer" }, onClick: () => handleAction("click-favorite") }))] }), node.showShare !== false && (_jsx(Share2, { ...iconProps, "data-testid": "share-icon", style: { cursor: "pointer" }, onClick: () => handleAction("click-share") }))] }));
}
//# sourceMappingURL=PostInteractionsNode.js.map