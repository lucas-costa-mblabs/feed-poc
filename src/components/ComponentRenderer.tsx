import React from "react";
import * as Lu from "react-icons/lu";
import type {
  ComponentNode,
  ContainerComponentNode,
  CarouselComponentNode,
  ButtonComponentNode,
  TextComponentNode,
} from "../types";

interface RendererProps {
  node: ComponentNode;
  selectedNodeId: string | null;
  dragOverNodeId?: string | null;
  dragPosition?: "top" | "bottom" | "inside" | null;
  onSelect: (id: string) => void;
  onDragStartNode?: (e: React.DragEvent, id: string) => void;
  onDragOverNode?: (e: React.DragEvent, id: string) => void;
  onDragLeaveNode?: (e: React.DragEvent, id: string) => void;
  onDropNode?: (e: React.DragEvent, id: string) => void;
  dataContext?: any;
}

export default function ComponentRenderer({
  node,
  selectedNodeId,
  dragOverNodeId,
  dragPosition,
  onSelect,
  onDragStartNode,
  onDragOverNode,
  onDragLeaveNode,
  onDropNode,
  dataContext,
}: RendererProps) {
  // Mapping tokens to simple inline styles for the POC builder
  const tokenToPx = (token?: string) => {
    switch (token) {
      case "xs":
        return "4px";
      case "sm":
        return "8px";
      case "md":
        return "16px";
      case "lg":
        return "24px";
      case "xl":
        return "32px";
      case "xxl":
        return "48px";
      default:
        return undefined;
    }
  };

  const colorToHex = (token?: string) => {
    switch (token) {
      case "white":
        return "#ffffff";
      case "gray-100":
        return "#f3f4f6";
      case "gray-200":
        return "#e2e8f0";
      case "gray-800":
        return "#1f2937";
      case "gray-900":
        return "#111827";
      case "primary":
        return "#6366f1";
      default:
        return token; // Fallback
    }
  };

  const mockDataContext = {
    post: {
      title: "Chaleira Elétrica Cadence 1,8L Inox Control 127V CEL850",
      description: "",
      originalPrice: "R$ 189,90",
      price: "R$ 139,90",
      discount: "26",
      destinationUrl: "/shop/f148c0ad-a39a-4674-a59f-cad2f4b7e91b",
      contentType: "catalog",
      url: "https://cdn.luxuryloyalty.com/media/product/detail/9c3adfe3-00d6-4e1a-9e4f-be925067f2d6-1.jpg",
      shop: {
        name: "Shop Rock",
        avatar:
          "https://keenthemes.com/metronic/tailwind/dist/assets/media/brand-logos/cloud-one.svg",
      },
    },
  };

  const resolveVariables = (str: string) => {
    if (!str) return str;
    return str.replace(/\{\{(.*?)\}\}/g, (match, path) => {
      const parts = path.trim().split(".");
      let current: any = dataContext || mockDataContext;
      for (const part of parts) {
        if (current && part in current) {
          current = current[part];
        } else {
          return match; // Return as is if not found
        }
      }
      return current;
    });
  };

  const renderIcon = (
    iconName: string,
    color: string,
    size: number | string = 20,
  ) => {
    // Map of common names to react-icons/lu component names
    const iconMap: Record<string, React.ElementType> = {
      user: Lu.LuUser,
      heart: Lu.LuHeart,
      bookmark: Lu.LuBookmark,
      share: Lu.LuShare2,
      camera: Lu.LuCamera,
      settings: Lu.LuSettings,
      home: Lu.LuHouse,
      search: Lu.LuSearch,
      bell: Lu.LuBell,
      star: Lu.LuStar,
      "more-horizontal": Lu.LuEllipsis,
      shopping: Lu.LuShoppingBag,
      shoppingbag: Lu.LuShoppingBag,
      "shopping-bag": Lu.LuShoppingBag,
      plus: Lu.LuPlus,
      trash: Lu.LuTrash2,
      edit: Lu.LuPencil,
      check: Lu.LuCheck,
      chevronRight: Lu.LuChevronRight,
      chevronLeft: Lu.LuChevronLeft,
    };

    const IconComponent = iconMap[iconName] || Lu.LuStar;

    return <IconComponent size={size} color={color} strokeWidth={2} />;
  };

  const isSelected = node.id === selectedNodeId;
  const isDragOver = node.id === dragOverNodeId;

  const selectionStyle: React.CSSProperties = isSelected
    ? { outline: "2px solid #2563eb", outlineOffset: "-2px" }
    : {};

  const dragIndicatorStyle: React.CSSProperties = isDragOver
    ? {
        borderTop: dragPosition === "top" ? "4px solid #2563eb" : undefined,
        borderBottom:
          dragPosition === "bottom" ? "4px solid #2563eb" : undefined,
        backgroundColor:
          dragPosition === "inside" ? "rgba(37, 99, 235, 0.1)" : undefined,
      }
    : {};

  const baseStyle: React.CSSProperties = {
    flex: node.flex || ((node as any).height === "100%" ? 1 : undefined),
  };

  if (node.type === "text") {
    const textNode = node as TextComponentNode;
    let fontSize = "16px";
    let fontWeightStr = "normal";

    if (textNode.typography === "caption") {
      fontSize = "12px";
    } else if (textNode.typography === "heading1") {
      fontSize = "32px";
      fontWeightStr = "bold";
    } else if (textNode.typography === "heading2") {
      fontSize = "24px";
      fontWeightStr = "bold";
    } else if (textNode.typography === "heading3") {
      fontSize = "20px";
      fontWeightStr = "bold";
    } else if (textNode.typography === "heading4") {
      fontSize = "18px";
      fontWeightStr = "bold";
    } else if (textNode.typography === "heading5") {
      fontSize = "16px";
      fontWeightStr = "bold";
    }

    if (textNode.fontWeight) {
      if (textNode.fontWeight === "bold") fontWeightStr = "bold";
      else if (textNode.fontWeight === "semiBold") fontWeightStr = "600";
      else fontWeightStr = "normal";
    }

    return (
      <div
        draggable
        onDragStart={(e) => onDragStartNode?.(e, node.id)}
        onDragOver={(e) => onDragOverNode?.(e, node.id)}
        onDragLeave={(e) => onDragLeaveNode?.(e, node.id)}
        onDrop={(e) => onDropNode?.(e, node.id)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        style={{
          fontSize,
          fontWeight: fontWeightStr,
          color: colorToHex(textNode.color) || "#000",
          padding: "4px",
          cursor: "pointer",
          ...baseStyle,
          ...selectionStyle,
          ...dragIndicatorStyle,
        }}
      >
        {resolveVariables(textNode.value || "Input Text")}
      </div>
    );
  }

  const getRadius = (r?: string) => {
    switch (r) {
      case "sm":
        return "4px";
      case "md":
        return "8px";
      case "lg":
      case "full":
        return "9999px";
      default:
        return "0";
    }
  };

  if (node.type === "container") {
    const containerNode = node as ContainerComponentNode;
    const paddingX = tokenToPx(containerNode.paddingX);
    const paddingY = tokenToPx(containerNode.paddingY);
    const marginX = tokenToPx(containerNode.marginX);
    const marginY = tokenToPx(containerNode.marginY);

    return (
      <div
        draggable
        onDragStart={(e) => onDragStartNode?.(e, node.id)}
        onDragOver={(e) => onDragOverNode?.(e, node.id)}
        onDragLeave={(e) => onDragLeaveNode?.(e, node.id)}
        onDrop={(e) => onDropNode?.(e, node.id)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        style={{
          display: "flex",
          flexDirection: containerNode.direction || "column",
          justifyContent: containerNode.justifyContent || "flex-start",
          alignItems: containerNode.alignItems || "stretch",
          paddingLeft: paddingX,
          paddingRight: paddingX,
          paddingTop: paddingY,
          paddingBottom: paddingY,
          marginLeft: marginX,
          marginRight: marginX,
          marginTop: marginY,
          marginBottom: marginY,
          gap: tokenToPx(containerNode.gap),
          backgroundColor: colorToHex(containerNode.backgroundColor),
          borderRadius: getRadius(containerNode.borderRadius),
          border: containerNode.borderWidth
            ? `${containerNode.borderWidth} ${
                containerNode.borderStyle || "solid"
              } ${colorToHex(containerNode.borderColor) || "#000"}`
            : undefined,
          width: containerNode.width || "auto",
          height: containerNode.height || "auto",
          minHeight: "40px",
          position: "relative",
          boxSizing: "border-box",
          ...baseStyle,
          ...selectionStyle,
          ...dragIndicatorStyle,
        }}
        className="builder-container-node"
      >
        {containerNode.blocks && containerNode.blocks.length > 0 ? (
          containerNode.blocks.map((child) => (
            <ComponentRenderer
              key={child.id}
              node={child}
              selectedNodeId={selectedNodeId}
              dragOverNodeId={dragOverNodeId}
              dragPosition={dragPosition}
              onSelect={onSelect}
              onDragStartNode={onDragStartNode}
              onDragOverNode={onDragOverNode}
              onDragLeaveNode={onDragLeaveNode}
              onDropNode={onDropNode}
              dataContext={dataContext}
            />
          ))
        ) : (
          <span
            style={{
              color: "#94a3b8",
              fontSize: "12px",
              opacity: 0.6,
              alignSelf: "center",
              margin: "auto",
            }}
          >
            Empty Container
          </span>
        )}
      </div>
    );
  }

  if (node.type === "carousel") {
    const carouselNode = node as CarouselComponentNode;

    return (
      <div
        draggable
        onDragStart={(e) => onDragStartNode?.(e, node.id)}
        onDragOver={(e) => onDragOverNode?.(e, node.id)}
        onDragLeave={(e) => onDragLeaveNode?.(e, node.id)}
        onDrop={(e) => onDropNode?.(e, node.id)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          backgroundColor: "#f8fafc",
          border: "1px dashed #cbd5e1",
          borderRadius: "8px",
          padding: "16px",
          width: carouselNode.width || "100%",
          height: carouselNode.height || "auto",
          minHeight: carouselNode.height ? undefined : "100px",
          position: "relative",
          ...baseStyle,
          ...selectionStyle,
          ...dragIndicatorStyle,
        }}
      >
        {carouselNode.showArrows && (
          <>
            <div
              style={{
                position: "absolute",
                left: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                zIndex: 2,
                fontSize: "12px",
              }}
            >
              {"<"}
            </div>
            <div
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                zIndex: 2,
                fontSize: "12px",
              }}
            >
              {">"}
            </div>
          </>
        )}
        <div
          style={{ display: "flex", overflowX: "auto", gap: "16px", flex: 1 }}
        >
          {carouselNode.blocks && carouselNode.blocks.length > 0 ? (
            carouselNode.blocks.map((child) => (
              <div key={child.id} style={{ minWidth: "200px" }}>
                <ComponentRenderer
                  node={child}
                  selectedNodeId={selectedNodeId}
                  dragOverNodeId={dragOverNodeId}
                  dragPosition={dragPosition}
                  onSelect={onSelect}
                  onDragStartNode={onDragStartNode}
                  onDragOverNode={onDragOverNode}
                  onDragLeaveNode={onDragLeaveNode}
                  onDropNode={onDropNode}
                  dataContext={dataContext}
                />
              </div>
            ))
          ) : (
            <span
              style={{
                color: "#94a3b8",
                fontSize: "12px",
                opacity: 0.6,
                margin: "auto",
              }}
            >
              Empty Carousel
            </span>
          )}
        </div>
        {carouselNode.showDots && (
          <div
            style={{
              display: "flex",
              gap: "4px",
              justifyContent: "center",
              marginTop: "12px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#94a3b8",
              }}
            ></div>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#e2e8f0",
              }}
            ></div>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#e2e8f0",
              }}
            ></div>
          </div>
        )}
      </div>
    );
  }

  if (node.type === "divider") {
    const dividerNode = node as any;
    return (
      <div
        draggable
        onDragStart={(e) => onDragStartNode?.(e, node.id)}
        onDragOver={(e) => onDragOverNode?.(e, node.id)}
        onDragLeave={(e) => onDragLeaveNode?.(e, node.id)}
        onDrop={(e) => onDropNode?.(e, node.id)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        style={{
          height: dividerNode.height || "auto",
          padding: dividerNode.height ? "0" : "8px 0",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          ...baseStyle,
          ...selectionStyle,
          ...dragIndicatorStyle,
        }}
      >
        <hr
          style={{
            borderTop: "1px solid #e2e8f0",
            margin: 0,
            width: "100%",
          }}
        />
      </div>
    );
  }

  if (node.type === "image") {
    const imageNode = node as any;
    const width = imageNode.width || "100%";
    const height = imageNode.height || "200px";

    return (
      <div
        draggable
        onDragStart={(e) => onDragStartNode?.(e, node.id)}
        onDragOver={(e) => onDragOverNode?.(e, node.id)}
        onDragLeave={(e) => onDragLeaveNode?.(e, node.id)}
        onDrop={(e) => onDropNode?.(e, node.id)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        style={{
          width,
          height,
          backgroundColor: imageNode.url ? "transparent" : "#e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          cursor: "pointer",
          overflow: "hidden",
          ...baseStyle,
          ...selectionStyle,
          ...dragIndicatorStyle,
        }}
      >
        {imageNode.url ? (
          <img
            src={resolveVariables(imageNode.url)}
            alt={resolveVariables(imageNode.alt || "")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: imageNode.objectFit || "cover",
            }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#94a3b8",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span style={{ fontSize: "14px", fontWeight: 500 }}>
              Image Placeholder
            </span>
          </div>
        )}
      </div>
    );
  }

  if (node.type === "button") {
    const buttonNode = node as ButtonComponentNode;

    let bg = colorToHex(buttonNode.background) || "#6366f1";
    let color = "white";
    let border = "none";

    if (buttonNode.variant === "outline") {
      bg = "transparent";
      color = colorToHex(buttonNode.background) || "#6366f1";
      border = `1px solid ${color}`;
    } else if (buttonNode.variant === "ghost") {
      bg = "transparent";
      color = colorToHex(buttonNode.background) || "#6366f1";
    }

    return (
      <button
        draggable
        onDragStart={(e) => onDragStartNode?.(e, node.id)}
        onDragOver={(e) => onDragOverNode?.(e, node.id)}
        onDragLeave={(e) => onDragLeaveNode?.(e, node.id)}
        onDrop={(e) => onDropNode?.(e, node.id)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        style={{
          backgroundColor: bg,
          color,
          border,
          padding: "10px 16px",
          borderRadius: getRadius(buttonNode.radius) || "8px",
          fontWeight: "bold",
          width: buttonNode.fullWidth ? "100%" : "auto",
          cursor: "pointer",
          ...baseStyle,
          ...selectionStyle,
          ...dragIndicatorStyle,
        }}
      >
        {resolveVariables(buttonNode.label || "Button")}
      </button>
    );
  }

  if (node.type === "icon") {
    const iconNode = node as any;
    const padding = tokenToPx(iconNode.padding);

    return (
      <div
        draggable
        onDragStart={(e) => onDragStartNode?.(e, node.id)}
        onDragOver={(e) => onDragOverNode?.(e, node.id)}
        onDragLeave={(e) => onDragLeaveNode?.(e, node.id)}
        onDrop={(e) => onDropNode?.(e, node.id)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            colorToHex(iconNode.backgroundColor) || "transparent",
          padding,
          borderRadius: getRadius(iconNode.borderRadius) || "0",
          cursor: "pointer",
          ...baseStyle,
          ...selectionStyle,
          ...dragIndicatorStyle,
        }}
      >
        {renderIcon(iconNode.icon || "star", "#64748b", iconNode.size || 20)}
      </div>
    );
  }

  return <div>Unknown Component</div>;
}
