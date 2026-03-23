import type { CSSProperties } from "react";
import type { ComponentNode } from "../../core/types.js";
import { useTemplateContext } from "../context.js";
import { tokenToPx } from "../utils.js";
import { Heart, Bookmark, Share2 } from "lucide-react";

interface PostInteractionsNodeProps {
  node: ComponentNode;
}

export function PostInteractionsNode({ node }: PostInteractionsNodeProps) {
  const { theme } = useTemplateContext();

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
          <Heart {...iconProps} style={{ cursor: "pointer" }} />
        )}
        {node.showSave !== false && (
          <Bookmark {...iconProps} style={{ cursor: "pointer" }} />
        )}
      </div>
      {node.showShare !== false && (
        <Share2 {...iconProps} style={{ cursor: "pointer" }} />
      )}
    </div>
  );
}
