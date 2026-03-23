import type { CSSProperties } from "react";
import type { ComponentNode } from "../../core/types.js";
import { useTemplateContext } from "../context.js";
import { tokenToPx, resolveVariables } from "../utils.js";

interface PriceNodeProps {
  node: ComponentNode;
  dataContext?: Record<string, unknown>;
}

export function PriceNode({ node, dataContext }: PriceNodeProps) {
  const { theme } = useTemplateContext();

  const baseStyle: CSSProperties = {
    flex: node.flex || undefined,
  };

  const px = tokenToPx(theme, node.paddingX) || "0";
  const py = tokenToPx(theme, node.paddingY) || "8px";

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
