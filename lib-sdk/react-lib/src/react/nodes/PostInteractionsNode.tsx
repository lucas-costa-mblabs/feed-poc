import type { CSSProperties } from "react";
import { useState } from "react";
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

  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const baseStyle: CSSProperties = {
    flex: node.flex || undefined,
  };

  const px = tokenToPx(theme, node.paddingX) || "0";
  const py = tokenToPx(theme, node.paddingY) || "12px";

  const iconSize = 24;
  const iconStrokeWidth = 1.5;

  const handleLike = async () => {
    if (!post) return;
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    await tracker.toggleLike(post.id, (post as any).campaignId);
  };

  const handleFavorite = async () => {
    if (!post) return;
    const newFavorited = !isFavorited;
    setIsFavorited(newFavorited);
    await tracker.toggleFavorite(
      post.id,
      (post as any).campaignId,
      isFavorited, // Pass previous state to know method
    );
  };

  const handleShare = async () => {
    if (!post) return;
    await tracker.shareContent(post.id, (post as any).campaignId, post.title);
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
            size={iconSize}
            strokeWidth={iconStrokeWidth}
            color={isLiked ? "#ef4444" : "#1f2937"}
            fill={isLiked ? "#ef4444" : "none"}
            data-testid="heart-icon"
            style={{ cursor: "pointer" }}
            onClick={handleLike}
          />
        )}
        {node.showSave !== false && (
          <Bookmark
            size={iconSize}
            strokeWidth={iconStrokeWidth}
            color={isFavorited ? "#374151" : "#1f2937"}
            fill={isFavorited ? "#374151" : "none"}
            data-testid="bookmark-icon"
            style={{ cursor: "pointer" }}
            onClick={handleFavorite}
          />
        )}
      </div>
      {node.showShare !== false && (
        <Share2
          size={iconSize}
          strokeWidth={iconStrokeWidth}
          color="#1f2937"
          data-testid="share-icon"
          style={{ cursor: "pointer" }}
          onClick={handleShare}
        />
      )}
    </div>
  );
}
