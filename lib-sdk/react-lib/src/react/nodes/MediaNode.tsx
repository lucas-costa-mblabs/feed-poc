import type { CSSProperties } from "react";
import type { ComponentNode } from "../../core/types.js";
import { resolveVariables } from "../utils.js";

interface MediaNodeProps {
  node: ComponentNode;
  dataContext?: Record<string, unknown>;
}

export function MediaNode({ node, dataContext }: MediaNodeProps) {
  const url = resolveVariables(node.url, dataContext)?.trim();
  if (!url) return null;

  const baseStyle: CSSProperties = {
    flex: node.flex || undefined,
    minHeight: node.flex ? 0 : undefined,
  };

  return (
    <div
      style={{
        width: (node.width as string) || "100%",
        height: (node.height as string) || "auto",
        display: "flex",
        overflow: "hidden",
        ...baseStyle,
      }}
    >
      <img
        src={url}
        alt={resolveVariables(node.alt || "image", dataContext)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: (node.objectFit as CSSProperties["objectFit"]) || "cover",
        }}
      />
    </div>
  );
}
