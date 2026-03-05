import React from "react";
import type { NodeProps } from "./types";

export default function DividerNode({ node }: NodeProps) {
  const baseStyle: React.CSSProperties = {
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
