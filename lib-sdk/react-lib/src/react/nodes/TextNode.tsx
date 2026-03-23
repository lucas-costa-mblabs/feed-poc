import type { CSSProperties } from "react";
import type { ComponentNode } from "../../core/types.js";
import { useTemplateContext } from "../context.js";
import { colorToHex, resolveVariables } from "../utils.js";

interface TextNodeProps {
  node: ComponentNode;
  dataContext?: Record<string, unknown>;
}

export function TextNode({ node, dataContext }: TextNodeProps) {
  const { theme } = useTemplateContext();

  const baseStyle: CSSProperties = {
    flex: node.flex || undefined,
  };

  let fontSize =
    theme.typography[node.typography as keyof typeof theme.typography] ||
    "16px";
  let fontWeightStr = "normal";

  if (!theme.typography[node.typography as keyof typeof theme.typography]) {
    const typography = node.typography;
    if (typography === "caption") fontSize = "12px";
    else if (typography === "heading1") {
      fontSize = "32px";
      fontWeightStr = "bold";
    } else if (typography === "heading2") {
      fontSize = "24px";
      fontWeightStr = "bold";
    } else if (typography === "heading3") {
      fontSize = "20px";
      fontWeightStr = "bold";
    } else if (typography === "heading4") {
      fontSize = "18px";
      fontWeightStr = "bold";
    } else if (typography === "heading5") {
      fontSize = "16px";
      fontWeightStr = "bold";
    }
  }

  if (node.fontWeight) {
    if (node.fontWeight === "bold") fontWeightStr = "bold";
    else if (node.fontWeight === "semiBold") fontWeightStr = "600";
    else fontWeightStr = "normal";
  }

  return (
    <span
      style={{
        fontSize,
        lineHeight: "1.4",
        fontWeight: fontWeightStr,
        color: colorToHex(theme, node.color) || "#111827",
        textAlign: (node.textAlign as CSSProperties["textAlign"]) || undefined,
        ...baseStyle,
      }}
    >
      {resolveVariables(node.value || "", dataContext)}
    </span>
  );
}
