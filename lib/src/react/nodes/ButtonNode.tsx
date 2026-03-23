import type { CSSProperties } from "react";
import type { ComponentNode } from "../../core/types.js";
import { useTemplateContext } from "../context.js";
import { colorToHex, getRadius, resolveVariables } from "../utils.js";

interface ButtonNodeProps {
  node: ComponentNode;
  dataContext?: Record<string, unknown>;
}

export function ButtonNode({ node, dataContext }: ButtonNodeProps) {
  const { theme } = useTemplateContext();

  const baseStyle: CSSProperties = {
    flex: node.flex || undefined,
  };

  let bg =
    colorToHex(theme, node.background) ||
    colorToHex(theme, "primary") ||
    "#6366f1";
  let color = "white";
  let border = "none";

  if (node.variant === "outline") {
    bg = "transparent";
    color =
      colorToHex(theme, node.background) ||
      colorToHex(theme, "primary") ||
      "#6366f1";
    border = `1px solid ${color}`;
  } else if (node.variant === "ghost") {
    bg = "transparent";
    color =
      colorToHex(theme, node.background) ||
      colorToHex(theme, "primary") ||
      "#6366f1";
  }

  const sizes: Record<string, string> = {
    xs: "4px 8px",
    sm: "6px 12px",
    md: "10px 16px",
    lg: "14px 24px",
    xl: "18px 32px",
    xxl: "22px 40px",
  };
  const padding =
    (node.size ? sizes[String(node.size)] : undefined) || sizes.md;

  return (
    <button
      style={{
        backgroundColor: bg,
        color,
        border,
        padding,
        borderRadius: getRadius(theme, node.radius) || "8px",
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
