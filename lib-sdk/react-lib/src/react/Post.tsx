import React, { useEffect, useState } from "react";
import type { Post as PostType, ComponentNode } from "../core/types.js";
import { useTemplateContext } from "./context.js";
import { JSONRenderer } from "./JSONRenderer.js";
import { useImpressionObserver } from "./hooks/useImpressionObserver.js";
import { resolveVariables, injectTailwind } from "./utils.js";

export interface PostProps {
  post: PostType;
}

const PostSkeleton = () => (
  <div
    style={{
      width: "100%",
      height: "400px",
      backgroundColor: "#f3f4f6",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#9ca3af",
      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    }}
  >
    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: .5; }
      }
    `}</style>
    Carregando estilos...
  </div>
);

export function Post({ post }: PostProps) {
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
    } else {
      setIsStyleLoaded(true);
    }
  }, [post.template, theme]);

  const { elementRef } = useImpressionObserver({
    contentId: postId,
    tracker,
    data: { campaignId: (post as any).campaignId },
  });

  // Se estiver carregando estilos para template legado, mostra o skeleton
  if (post.template && !isStyleLoaded) {
    return <PostSkeleton />;
  }

  // Regra de Legado: Se o post tiver um template HTML, ele tem prioridade total
  if (post.template) {
    // Normaliza o contexto para compatibilidade com as tags Go (ex: .Title, .ImageURL)
    const legacyContext = {
      ...post,
      Title: post.title,
      ImageURL: post.url,
      Caption: post.legend || "",
      CustomVariables: (post as any).customVariables || {},
      Sponsored: (post as any).sponsored || false,
      Liked: (post as any).liked || false,
      LikeCount: (post as any).likeCount || 0,
      Favorite: (post as any).favorite || false,
      // Suporte para campos aninhados comuns
      ...((post as any).customVariables || {}),
    };

    const renderedHtml = resolveVariables(post.template, legacyContext);

    return (
      <div
        ref={elementRef}
        className="directo-ai-custom-post"
        dangerouslySetInnerHTML={{ __html: renderedHtml || "" }}
        style={{ width: "100%", color: "#000000" }}
      />
    );
  }

  // Fallback para JSON Template (Builder)
  if (!template) {
    return (
      <div
        style={{
          border: "1px dashed orange",
          padding: 16,
          textAlign: "center",
          color: "#94a3b8",
          borderRadius: "8px",
        }}
      >
        Template não encontrado: {post.templateId || "ID ausente"}
      </div>
    );
  }

  const blocks = template.data as ComponentNode[];
  const dataContext: Record<string, unknown> = {
    post: {
      ...post,
      shop: post.shop || {
        name: post.profile?.accountName || "",
        avatar: post.profile?.iconUrl || "",
      },
    },
  };

  return (
    <div
      ref={elementRef}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        overflow: "hidden",
      }}
    >
      {blocks.map((node) => (
        <JSONRenderer key={node.id} node={node} dataContext={dataContext} />
      ))}
    </div>
  );
}
