// types.ts
export type TokenType = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type ColorToken =
  | "white"
  | "gray-100"
  | "gray-200"
  | "gray-800"
  | "gray-900"
  | "primary";

export interface ComponentStyle {
  padding?: TokenType;
  gap?: TokenType;
  margin?: TokenType;
  color?: ColorToken;
  backgroundColor?: ColorToken;
  borderColor?: ColorToken;
  borderRadius?: "sm" | "md" | "lg" | "full";
  fontSize?: TokenType;
  fontWeight?: "bold" | "semiBold" | "normal";
}

export interface BaseComponentNode {
  id: string; // Unique ID for the node in the tree
  type: string;
  flex?: number;
}

export interface TextComponentNode extends BaseComponentNode {
  type: "text";
  value: string;
  typography?:
    | "body"
    | "caption"
    | "heading1"
    | "heading2"
    | "heading3"
    | "heading4"
    | "heading5";
  color?: ColorToken;
  fontWeight?: "bold" | "semiBold" | "normal";
}

export interface ContainerComponentNode extends BaseComponentNode {
  type: "container";
  direction?: "row" | "column";
  justifyContent?:
    | "space-between"
    | "space-evenly"
    | "space-around"
    | "center"
    | "flex-start"
    | "flex-end";
  alignItems?: "center" | "flex-start" | "flex-end";
  backgroundColor?: ColorToken;
  borderRadius?: "sm" | "md" | "lg" | "full";
  borderWidth?: string;
  borderColor?: ColorToken;
  borderStyle?: "solid" | "dashed" | "dotted";
  paddingX?: TokenType;
  paddingY?: TokenType;
  marginX?: TokenType;
  marginY?: TokenType;
  gap?: TokenType;
  width?: string;
  height?: string;
  blocks: ComponentNode[];
}

export interface CarouselComponentNode extends BaseComponentNode {
  type: "carousel";
  showArrows?: boolean;
  showDots?: boolean;
  width?: string;
  height?: string;
  blocks: ComponentNode[];
}

export interface DividerComponentNode extends BaseComponentNode {
  type: "divider";
  thickness?: "thin" | "medium" | "thick";
}

export interface ImageComponentNode extends BaseComponentNode {
  type: "image";
  url: string;
  alt: string;
  aspectRatio?: string;
  width?: string;
  height?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export interface AvatarComponentNode extends BaseComponentNode {
  type: "avatar";
  icon: string;
  backgroundColor?: ColorToken;
}

export interface ButtonComponentNode extends BaseComponentNode {
  type: "button";
  label: string;
  radius?: "sm" | "md" | "lg" | "full";
  background?: ColorToken;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  url?: string;
  fullWidth?: boolean;
  size?: TokenType;
}

export interface IconButtonComponentNode extends BaseComponentNode {
  type: "icon_button";
  icon: string;
  action?: string;
}

export interface IconComponentNode extends BaseComponentNode {
  type: "icon";
  icon: string;
  backgroundColor?: ColorToken;
  padding?: TokenType;
  size?: number | string;
  borderRadius?: "sm" | "md" | "lg" | "full";
}

export interface PostInteractionsComponentNode extends BaseComponentNode {
  type: "post_interactions";
  showLike?: boolean;
  showSave?: boolean;
  showShare?: boolean;
  paddingX?: TokenType;
  paddingY?: TokenType;
  gap?: TokenType;
}

export interface PriceComponentNode extends BaseComponentNode {
  type: "price";
  price: string;
  originalPrice?: string;
  discountPercent?: string;
  showOriginalPrice?: boolean;
  showDiscountPercent?: boolean;
  paddingX?: TokenType;
  paddingY?: TokenType;
}

export type ComponentNode =
  | ContainerComponentNode
  | CarouselComponentNode
  | DividerComponentNode
  | ImageComponentNode
  | TextComponentNode
  | ButtonComponentNode
  | IconComponentNode
  | PostInteractionsComponentNode
  | PriceComponentNode;

// Helper to generate IDs
export const generateId = () => Math.random().toString(36).substr(2, 9);
