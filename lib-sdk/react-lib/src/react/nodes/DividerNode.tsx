import type { CSSProperties } from "react";
import type { ComponentNode } from "../../core/types.js";

interface DividerNodeProps {
  node: ComponentNode;
}

export function DividerNode({ node }: DividerNodeProps) {
  const baseStyle: CSSProperties = {
    flex: node.flex || undefined,
  };

  let bw = "1px";
  let bc = "#e2e8f0";
  if (node.thickness === "thin") {
    bw = "0.5px";
    bc = "#f1f5f9";
  } else if (node.thickness === "thick") {
    bw = "2px";
  }

  return (
    <div
      style={{
        height: "12px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        ...baseStyle,
      }}
    >
      <hr
        style={{ borderTop: `${bw} solid ${bc}`, width: "100%", margin: 0 }}
      />
    </div>
  );
}
