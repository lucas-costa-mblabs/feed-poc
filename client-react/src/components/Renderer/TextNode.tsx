import React from "react";
import type { NodeProps } from "./types";
import { colorToHex, resolveVariables } from "./utils";

export default function TextNode({ node, dataContext }: NodeProps) {
  const baseStyle: React.CSSProperties = {
    flex: node.flex || undefined,
  };

  let fontSize = "16px";
  let fontWeightStr = "normal";

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

  if (node.fontWeight) {
    if (node.fontWeight === "bold") fontWeightStr = "bold";
    else if (node.fontWeight === "semiBold") fontWeightStr = "600";
    else fontWeightStr = "normal";
  }

  return (
    <span
      style={{
        fontSize,
        fontWeight: fontWeightStr,
        color: colorToHex(node.color) || "#111827",
        ...baseStyle,
      }}
    >
      {resolveVariables(node.value || "", dataContext)}
    </span>
  );
}
