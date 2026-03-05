import React from "react";
import type { NodeProps } from "./types";
import { tokenToPx, resolveVariables } from "./utils";

export default function PriceNode({ node, dataContext }: NodeProps) {
  const baseStyle: React.CSSProperties = {
    flex: node.flex || undefined,
  };

  const px = tokenToPx(node.paddingX) || "0";
  const py = tokenToPx(node.paddingY) || "8px";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        padding: `${py} ${px}`,
        ...baseStyle,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {node.showOriginalPrice !== false && node.originalPrice && (
          <span
            style={{
              fontSize: "12px",
              color: "#94a3b8",
              textDecoration: "line-through",
            }}
          >
            {resolveVariables(node.originalPrice, dataContext)}
          </span>
        )}
        {node.showDiscountPercent !== false && node.discountPercent && (
          <span
            style={{
              backgroundColor: "#fecaca",
              color: "#dc2626",
              fontSize: "10px",
              fontWeight: "bold",
              padding: "1px 4px",
              borderRadius: "3px",
            }}
          >
            {resolveVariables(node.discountPercent, dataContext)}% OFF
          </span>
        )}
      </div>
      <span style={{ fontSize: "20px", fontWeight: "bold", color: "#111827" }}>
        {resolveVariables(node.price, dataContext)}
      </span>
    </div>
  );
}
