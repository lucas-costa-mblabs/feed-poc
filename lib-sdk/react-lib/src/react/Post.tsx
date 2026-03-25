import type { Post as PostType, ComponentNode } from "../core/types.js";
import { useTemplateContext } from "./context.js";
import { JSONRenderer } from "./JSONRenderer.js";
import { useImpressionObserver } from "./hooks/useImpressionObserver.js";

export interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const { templates, tracker } = useTemplateContext();
  const template = templates.find((t) => t.id === post.templateId);

  const { elementRef } = useImpressionObserver({
    contentId: post.id,
    tracker,
    data: { campaignId: (post as any).campaignId },
  });

  if (!template) {
    return (
      <div
        style={{
          border: "1px dashed orange",
          padding: 16,
          textAlign: "center",
          color: "#94a3b8",
        }}
      >
        Template não encontrado: {post.templateId}
      </div>
    );
  }

  const blocks = template.template as ComponentNode[];
  const dataContext: Record<string, unknown> = { post };

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
        boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      {blocks.map((node) => (
        <JSONRenderer key={node.id} node={node} dataContext={dataContext} />
      ))}
    </div>
  );
}
