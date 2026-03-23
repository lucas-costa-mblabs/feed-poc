import type { CSSProperties } from "react";
import type { ComponentNode } from "../../core/types.js";
import { useTemplateContext } from "../context.js";
import { tokenToPx, getRadius, colorToHex } from "../utils.js";
import { JSONRenderer } from "../JSONRenderer.js";

interface ContainerNodeProps {
  node: ComponentNode;
  dataContext?: Record<string, unknown>;
}

export function ContainerNode({ node, dataContext }: ContainerNodeProps) {
  const { theme } = useTemplateContext();

  const px = tokenToPx(theme, node.paddingX);
  const py = tokenToPx(theme, node.paddingY);
  const mx = tokenToPx(theme, node.marginX);
  const my = tokenToPx(theme, node.marginY);

  const baseStyle: CSSProperties = {
    flex: node.flex || undefined,
    minHeight: node.flex ? 0 : undefined,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection:
          (node.direction as CSSProperties["flexDirection"]) || "column",
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
        gap: tokenToPx(theme, node.gap),
        backgroundColor: colorToHex(theme, node.backgroundColor),
        borderRadius: getRadius(theme, node.borderRadius),
        border: node.borderWidth
          ? `${node.borderWidth} ${node.borderStyle || "solid"} ${colorToHex(theme, node.borderColor) || "#000"}`
          : undefined,
        width: (node.width as string) || "auto",
        height: (node.height as string) || "auto",
        boxSizing: "border-box",
        ...baseStyle,
      }}
    >
      {node.blocks?.map((child) => (
        <JSONRenderer key={child.id} node={child} dataContext={dataContext} />
      ))}
    </div>
  );
}
