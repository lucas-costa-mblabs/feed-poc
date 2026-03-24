// ─── Tokens ───
export type SpacingToken = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type BorderRadiusToken = "sm" | "md" | "lg" | "full";
export type TypographyToken = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

// ─── Theme ───
export interface Theme {
  colors: Record<string, string>;
  spacing: Record<SpacingToken, string>;
  borderRadius: Record<BorderRadiusToken, string>;
  typography: Record<TypographyToken, string>;
}

// ─── Post ───
export interface PostShop {
  avatar: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  url: string;
  price: string;
  originalPrice: string;
  discount: string;
  shop: PostShop;
  templateId: string;
}

// ─── Template / ComponentNode ───
export type ComponentType =
  | "container"
  | "text"
  | "media"
  | "divider"
  | "button"
  | "price"
  | "icon"
  | "post_interactions";

export interface ComponentNode {
  id: string;
  type: ComponentType;
  flex?: number;

  // Container
  blocks?: ComponentNode[];
  direction?: "row" | "column";
  justifyContent?:
    | "space-between"
    | "space-evenly"
    | "space-around"
    | "center"
    | "flex-start"
    | "flex-end";
  alignItems?: "center" | "flex-start" | "flex-end" | "stretch";
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderStyle?: "solid" | "dashed" | "dotted";
  paddingX?: string;
  paddingY?: string;
  marginX?: string;
  marginY?: string;
  gap?: string;
  width?: string;
  height?: string;

  // Text
  value?: string;
  typography?:
    | "caption"
    | "body"
    | "heading5"
    | "heading4"
    | "heading3"
    | "heading2"
    | "heading1";
  color?: string;
  fontWeight?: "bold" | "semiBold" | "normal";
  textAlign?: "left" | "center" | "right";

  // Media
  url?: string;
  alt?: string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";

  // Button
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  background?: string;
  radius?: string;
  deeplink?: string;
  fullWidth?: boolean;
  size?: string | number;

  // Price
  price?: string;
  originalPrice?: string;
  discountPercent?: string;
  showOriginalPrice?: boolean;
  showDiscountPercent?: boolean;

  // Post Interactions
  showLike?: boolean;
  showSave?: boolean;
  showShare?: boolean;

  // Icon
  icon?: string;
  padding?: string;

  // Divider
  thickness?: "thin" | "medium" | "thick";

  // Extensível
  [key: string]: unknown;
}

export interface DirectoAiTemplate {
  id: string;
  title: string;
  active: boolean;
  slug: string;
  template: ComponentNode[];
}
