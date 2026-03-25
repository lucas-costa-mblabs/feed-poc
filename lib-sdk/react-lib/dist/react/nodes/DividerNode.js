import { jsx as _jsx } from "react/jsx-runtime";
export function DividerNode({ node }) {
    const baseStyle = {
        flex: node.flex || undefined,
    };
    let bw = "1px";
    let bc = "#e2e8f0";
    if (node.thickness === "thin") {
        bw = "0.5px";
        bc = "#f1f5f9";
    }
    else if (node.thickness === "thick") {
        bw = "2px";
    }
    return (_jsx("div", { style: {
            height: "12px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            ...baseStyle,
        }, children: _jsx("hr", { style: { borderTop: `${bw} solid ${bc}`, width: "100%", margin: 0 } }) }));
}
//# sourceMappingURL=DividerNode.js.map