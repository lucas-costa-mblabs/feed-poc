import type { CSSProperties } from "react";
import type { ComponentNode, Post } from "../../core/types.js";
import { useTemplateContext } from "../context.js";
import { tokenToPx } from "../utils.js";
import { Heart, Bookmark, Share2 } from "lucide-react";

interface PostInteractionsNodeProps {
  node: ComponentNode;
  dataContext?: Record<string, unknown>;
}

export function PostInteractionsNode({
  node,
  dataContext,
}: PostInteractionsNodeProps) {
  const { theme, tracker } = useTemplateContext();
  const post = dataContext?.post as Post | undefined;

  const baseStyle: CSSProperties = {
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

  const handleAction = (name: string) => {
    if (post) {
      tracker.trackEvent(name, {
        contentId: post.id,
        campaignId: (post as any).campaignId,
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: `${py} ${px}`,
        ...baseStyle,
      }}
    >
      <div style={{ display: "flex", gap: "16px" }}>
        {node.showLike !== false && (
          <Heart
            {...iconProps}
            data-testid="heart-icon"
            style={{ cursor: "pointer" }}
            onClick={() => handleAction("click-like")}
          />
        )}
        {node.showSave !== false && (
          <Bookmark
            {...iconProps}
            data-testid="bookmark-icon"
            style={{ cursor: "pointer" }}
            onClick={() => handleAction("click-favorite")}
          />
        )}
      </div>
      {node.showShare !== false && (
        <Share2
          {...iconProps}
          data-testid="share-icon"
          style={{ cursor: "pointer" }}
          onClick={() => handleAction("click-share")}
        />
      )}
    </div>
  );
}
