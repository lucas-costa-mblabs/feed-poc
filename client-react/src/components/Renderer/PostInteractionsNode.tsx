import React from "react";
import type { NodeProps } from "./types";
import { tokenToPx } from "./utils";
import { Heart, Bookmark, Share2 } from "lucide-react";

export default function PostInteractionsNode({ node }: NodeProps) {
  const baseStyle: React.CSSProperties = {
    flex: node.flex || undefined,
  };

  const px = tokenToPx(node.paddingX) || "0";
  const py = tokenToPx(node.paddingY) || "12px";

  const iconSize = 24;
  const iconColor = "#1f2937"; // Uncolored/gray-800 to match clean design
  const iconStrokeWidth = 1.5; // Matches standard clean simple icons

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
