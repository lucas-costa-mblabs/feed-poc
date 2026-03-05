import React from "react";
import type { NodeProps, ComponentNode } from "./types";
import { tokenToPx, getRadius, colorToHex } from "./utils";
import JSONRenderer from "../../JSONRenderer";

export default function ContainerNode({ node, dataContext }: NodeProps) {
  const px = tokenToPx(node.paddingX);
  const py = tokenToPx(node.paddingY);
  const mx = tokenToPx(node.marginX);
  const my = tokenToPx(node.marginY);

  const baseStyle: React.CSSProperties = {
    flex: node.flex || undefined,
    minHeight: node.flex ? 0 : undefined,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: node.direction || "column",
        justifyContent: node.justifyContent || "flex-start",
        alignItems: node.alignItems || "stretch",
        paddingLeft: px,
        paddingRight: px,
        paddingTop: py,
        paddingBottom: py,
        marginLeft: mx,
        marginRight: mx,
        marginTop: my,
        marginBottom: my,
        gap: tokenToPx(node.gap),
        backgroundColor: colorToHex(node.backgroundColor),
        borderRadius: getRadius(node.borderRadius),
        border: node.borderWidth
          ? `${node.borderWidth} ${node.borderStyle || "solid"} ${colorToHex(node.borderColor) || "#000"}`
          : undefined,
        width: node.width || "auto",
        height: node.height || "auto",
        boxSizing: "border-box",
        ...baseStyle,
      }}
    >
      {node.blocks &&
        node.blocks.map((child: ComponentNode) => (
          <JSONRenderer key={child.id} node={child} dataContext={dataContext} />
        ))}
    </div>
  );
}
