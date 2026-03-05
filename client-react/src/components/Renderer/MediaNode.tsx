import React from "react";
import type { NodeProps } from "./types";
import { resolveVariables } from "./utils";

export default function MediaNode({ node, dataContext }: NodeProps) {
  const baseStyle: React.CSSProperties = {
    flex: node.flex || undefined,
    minHeight: node.flex ? 0 : undefined,
  };

  return (
    <div
      style={{
        width: node.width || "100%",
        height: node.height || "auto",
        display: "flex",
        overflow: "hidden",
        ...baseStyle,
      }}
    >
      <img
        src={resolveVariables(node.url, dataContext)}
        alt={resolveVariables(node.alt || "image", dataContext)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: node.objectFit || "cover",
        }}
      />
    </div>
  );
}
