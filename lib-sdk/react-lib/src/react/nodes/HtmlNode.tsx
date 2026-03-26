import type { CSSProperties } from "react";
import type { ComponentNode } from "../../core/types.js";
import { useTemplateContext } from "../context.js";
import { tokenToPx, resolveVariables } from "../utils.js";

interface HtmlNodeProps {
  node: ComponentNode;
  dataContext?: Record<string, unknown>;
}

export function HtmlNode({ node, dataContext }: HtmlNodeProps) {
  const { theme } = useTemplateContext();

  const rawHtml = resolveVariables(
    (node as any).html || "",
    dataContext as Record<string, any>,
  );

  if (!rawHtml) return null;

  const px = tokenToPx(theme, node.paddingX) || "0";
  const py = tokenToPx(theme, node.paddingY) || "0";

  const style: CSSProperties = {
    padding: `${py} ${px}`,
    width: node.width || "100%",
    height: node.height || "auto",
    flex: node.flex || undefined,
  };

  return <div style={style} dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
