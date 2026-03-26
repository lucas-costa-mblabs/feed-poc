import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTemplateContext } from "./context.js";
import { JSONRenderer } from "./JSONRenderer.js";
import { useImpressionObserver } from "./hooks/useImpressionObserver.js";
export function Post({ post }) {
    const { templates, tracker } = useTemplateContext();
    const template = templates.find((t) => t.id === post.templateId);
    const { elementRef } = useImpressionObserver({
        contentId: post.id,
        tracker,
        data: { campaignId: post.campaignId },
    });
    if (!template) {
        if (post.template) {
            return (_jsx("div", { ref: elementRef, className: "directo-ai-custom-post", dangerouslySetInnerHTML: { __html: post.template }, style: { width: "100%" } }));
        }
        return (_jsxs("div", { style: {
                border: "1px dashed orange",
                padding: 16,
                textAlign: "center",
                color: "#94a3b8",
            }, children: ["Template n\u00E3o encontrado: ", post.templateId] }));
    }
    const blocks = template.template;
    const dataContext = { post };
    return (_jsx("div", { ref: elementRef, style: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
            overflow: "hidden",
        }, children: blocks.map((node) => (_jsx(JSONRenderer, { node: node, dataContext: dataContext }, node.id))) }));
}
//# sourceMappingURL=Post.js.map