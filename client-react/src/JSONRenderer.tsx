import React from "react";
import type { ComponentNode, NodeProps } from "./components/Renderer/types";
import ContainerNode from "./components/Renderer/ContainerNode";
import TextNode from "./components/Renderer/TextNode";
import MediaNode from "./components/Renderer/MediaNode";
import DividerNode from "./components/Renderer/DividerNode";
import ButtonNode from "./components/Renderer/ButtonNode";
import PriceNode from "./components/Renderer/PriceNode";
import IconNode from "./components/Renderer/IconNode";
import PostInteractionsNode from "./components/Renderer/PostInteractionsNode";

export type { ComponentNode, NodeProps };

interface JSONRendererProps {
  node: ComponentNode;
  dataContext?: unknown;
}

const nodeTypes: Record<string, React.FC<NodeProps>> = {
  container: ContainerNode,
  text: TextNode,
  media: MediaNode,
  divider: DividerNode,
  button: ButtonNode,
  price: PriceNode,
  icon: IconNode,
  post_interactions: PostInteractionsNode,
};

export default function JSONRenderer({ node, dataContext }: JSONRendererProps) {
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
