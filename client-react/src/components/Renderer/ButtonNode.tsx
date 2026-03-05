import React from "react";
import type { NodeProps } from "./types";
import { colorToHex, getRadius, resolveVariables } from "./utils";

export default function ButtonNode({ node, dataContext }: NodeProps) {
  const baseStyle: React.CSSProperties = {
    flex: node.flex || undefined,
  };

  let bg = colorToHex(node.background) || "#6366f1";
  let color = "white";
  let border = "none";

  if (node.variant === "outline") {
    bg = "transparent";
    color = colorToHex(node.background) || "#6366f1";
    border = `1px solid ${color}`;
  } else if (node.variant === "ghost") {
    bg = "transparent";
    color = colorToHex(node.background) || "#6366f1";
  }

  const sizes = {
    xs: "4px 8px",
    sm: "6px 12px",
    md: "10px 16px",
    lg: "14px 24px",
    xl: "18px 32px",
    xxl: "22px 40px",
  };
  const padding = sizes[node.size as keyof typeof sizes] || sizes.md;

  return (
    <button
      style={{
        backgroundColor: bg,
        color,
        border,
        padding,
        borderRadius: getRadius(node.radius) || "8px",
        width: node.fullWidth !== false ? "100%" : "auto",
        fontWeight: "bold",
        cursor: "pointer",
        ...baseStyle,
      }}
    >
      {resolveVariables(node.label || "Click here", dataContext)}
    </button>
  );
}
