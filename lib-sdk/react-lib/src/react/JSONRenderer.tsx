import type { FC } from "react";
import type { ComponentNode } from "../core/types.js";
import { ContainerNode } from "./nodes/ContainerNode.js";
import { TextNode } from "./nodes/TextNode.js";
import { MediaNode } from "./nodes/MediaNode.js";
import { DividerNode } from "./nodes/DividerNode.js";
import { ButtonNode } from "./nodes/ButtonNode.js";
import { PriceNode } from "./nodes/PriceNode.js";
import { IconNode } from "./nodes/IconNode.js";
import { PostInteractionsNode } from "./nodes/PostInteractionsNode.js";
import { HtmlNode } from "./nodes/HtmlNode.js";

interface NodeProps {
  node: ComponentNode;
  dataContext?: Record<string, unknown>;
}

const nodeTypes: Record<string, FC<NodeProps>> = {
  container: ContainerNode,
  text: TextNode,
  media: MediaNode,
  divider: DividerNode,
  button: ButtonNode,
  price: PriceNode,
  icon: IconNode,
  post_interactions: PostInteractionsNode,
  html: HtmlNode,
};

export function JSONRenderer({ node, dataContext }: NodeProps) {
  const Component = nodeTypes[node.type];

  if (!Component) {
    return (
      <div style={{ border: "1px dashed red", padding: 8 }}>
        Unknown Node: {node.type}
      </div>
    );
  }

  return <Component node={node} dataContext={dataContext} />;
}
