import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useTemplateContext } from "./context.js";
import { JSONRenderer } from "./JSONRenderer.js";
import { useImpressionObserver } from "./hooks/useImpressionObserver.js";
import { resolveVariables, injectTailwind } from "./utils.js";
const PostSkeleton = () => (_jsxs("div", { style: {
        width: "100%",
        height: "400px",
        backgroundColor: "#f3f4f6",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#9ca3af",
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    }, children: [_jsx("style", { children: `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: .5; }
      }
    ` }), "Carregando estilos..."] }));
export function Post({ post }) {
    const { templates, theme, tracker } = useTemplateContext();
    const template = templates.find((t) => t.templateId === post.templateId);
    const postId = post.id || post.contentId || "";
    const [isStyleLoaded, setIsStyleLoaded] = useState(false);
    // Injeta o Tailwind apenas se houver um template HTML legado
    useEffect(() => {
        if (post.template) {
            setIsStyleLoaded(false);
            injectTailwind(theme).then(() => {
                // Delay extra para garantir que o Tailwind processou o DOM
                setTimeout(() => setIsStyleLoaded(true), 150);
            });
        }
        else {
            setIsStyleLoaded(true);
        }
    }, [post.template, theme]);
    const { elementRef } = useImpressionObserver({
        contentId: postId,
        tracker,
        data: { campaignId: post.campaignId },
    });
    // Se estiver carregando estilos para template legado, mostra o skeleton
    if (post.template && !isStyleLoaded) {
        return _jsx(PostSkeleton, {});
    }
    // Regra de Legado: Se o post tiver um template HTML, ele tem prioridade total
    if (post.template) {
        // Normaliza o contexto para compatibilidade com as tags Go (ex: .Title, .ImageURL)
        const legacyContext = {
            ...post,
            Title: post.title,
            ImageURL: post.url,
            Caption: post.legend || "",
            CustomVariables: post.customVariables || {},
            Sponsored: post.sponsored || false,
            Liked: post.liked || false,
            LikeCount: post.likeCount || 0,
            Favorite: post.favorite || false,
            // Suporte para campos aninhados comuns
            ...(post.customVariables || {}),
        };
        const renderedHtml = resolveVariables(post.template, legacyContext);
        return (_jsx("div", { ref: elementRef, className: "directo-ai-custom-post", dangerouslySetInnerHTML: { __html: renderedHtml || "" }, style: { width: "100%", color: "#000000" } }));
    }
    // Fallback para JSON Template (Builder)
    if (!template) {
        return (_jsxs("div", { style: {
                border: "1px dashed orange",
                padding: 16,
                textAlign: "center",
                color: "#94a3b8",
                borderRadius: "8px",
            }, children: ["Template n\u00E3o encontrado: ", post.templateId || "ID ausente"] }));
    }
    const blocks = template.data;
    const dataContext = {
        post: {
            ...post,
            shop: post.shop || {
                name: post.profile?.accountName || "",
                avatar: post.profile?.iconUrl || "",
            },
        },
    };
    return (_jsx("div", { ref: elementRef, style: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
        }, children: blocks.map((node) => (_jsx(JSONRenderer, { node: node, dataContext: dataContext }, node.id))) }));
}
//# sourceMappingURL=Post.js.map