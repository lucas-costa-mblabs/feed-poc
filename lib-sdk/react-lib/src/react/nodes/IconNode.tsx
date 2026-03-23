import type { CSSProperties } from "react";
import type { ComponentNode } from "../../core/types.js";
import { useTemplateContext } from "../context.js";
import { tokenToPx, getRadius, colorToHex } from "../utils.js";
import { ShoppingBag, Sparkles } from "lucide-react";

interface IconNodeProps {
  node: ComponentNode;
}

export function IconNode({ node }: IconNodeProps) {
  const { theme } = useTemplateContext();

  const baseStyle: CSSProperties = {
    flex: node.flex || undefined,
  };

  const p = tokenToPx(theme, node.padding) || "0";
  const size = (typeof node.size === "number" ? node.size : 20) as number;
  const color = colorToHex(theme, node.color) || "#1f2937";

  const IconComponent = node.icon === "shoppingbag" ? ShoppingBag : Sparkles;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:
          colorToHex(theme, node.backgroundColor) || "transparent",
        padding: p,
        borderRadius: getRadius(theme, node.borderRadius) || "0",
        ...baseStyle,
      }}
    >
      <IconComponent size={size} color={color} strokeWidth={1.5} />
    </div>
  );
}
