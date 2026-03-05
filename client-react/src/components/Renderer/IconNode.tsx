import React from "react";
import type { NodeProps } from "./types";
import { tokenToPx, getRadius, colorToHex } from "./utils";
import { ShoppingBag, Sparkles } from "lucide-react";

export default function IconNode({ node }: NodeProps) {
  const baseStyle: React.CSSProperties = {
    flex: node.flex || undefined,
  };

  const p = tokenToPx(node.padding) || "0";
  const size = node.size || 20;
  // Let user customize color, default to #1f2937 (gray-800) for simple uncolored icon
  const color = colorToHex(node.color) || "#1f2937";

  const IconComponent = node.icon === "shoppingbag" ? ShoppingBag : Sparkles;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colorToHex(node.backgroundColor) || "transparent",
        padding: p,
        borderRadius: getRadius(node.borderRadius) || "0",
        ...baseStyle,
      }}
    >
      <IconComponent size={size} color={color} strokeWidth={1.5} />
    </div>
  );
}
