import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { ContainerNode } from "./nodes/ContainerNode.js";
import { TextNode } from "./nodes/TextNode.js";
import { MediaNode } from "./nodes/MediaNode.js";
import { DividerNode } from "./nodes/DividerNode.js";
import { ButtonNode } from "./nodes/ButtonNode.js";
import { PriceNode } from "./nodes/PriceNode.js";
import { IconNode } from "./nodes/IconNode.js";
import { PostInteractionsNode } from "./nodes/PostInteractionsNode.js";
const nodeTypes = {
    container: ContainerNode,
    text: TextNode,
    media: MediaNode,
    divider: DividerNode,
    button: ButtonNode,
    price: PriceNode,
    icon: IconNode,
    post_interactions: PostInteractionsNode,
};
export function JSONRenderer({ node, dataContext }) {
    const Component = nodeTypes[node.type];
    if (!Component) {
        return (_jsxs("div", { style: { border: "1px dashed red", padding: 8 }, children: ["Unknown Node: ", node.type] }));
    }
    return _jsx(Component, { node: node, dataContext: dataContext });
}
//# sourceMappingURL=JSONRenderer.js.map