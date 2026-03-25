export type SpacingToken = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type BorderRadiusToken = "sm" | "md" | "lg" | "full";
export type TypographyToken = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export interface Theme {
    colors: Record<string, string>;
    spacing: Record<SpacingToken, string>;
    borderRadius: Record<BorderRadiusToken, string>;
    typography: Record<TypographyToken, string>;
}
export interface PostShop {
    avatar: string;
    name: string;
}
export interface DirectoAiConfig {
    accountId: string;
    apiKey: string;
    customerId?: string;
    deviceId?: string;
    baseUrl?: string;
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
export type ComponentType = "container" | "text" | "media" | "divider" | "button" | "price" | "icon" | "post_interactions";
export interface ComponentNode {
    id: string;
    type: ComponentType;
    flex?: number;
    blocks?: ComponentNode[];
    direction?: "row" | "column";
    justifyContent?: "space-between" | "space-evenly" | "space-around" | "center" | "flex-start" | "flex-end";
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
    value?: string;
    typography?: "caption" | "body" | "heading5" | "heading4" | "heading3" | "heading2" | "heading1";
    color?: string;
    fontWeight?: "bold" | "semiBold" | "normal";
    textAlign?: "left" | "center" | "right";
    url?: string;
    alt?: string;
    aspectRatio?: string;
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
    label?: string;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    background?: string;
    radius?: string;
    deeplink?: string;
    fullWidth?: boolean;
    size?: string | number;
    price?: string;
    originalPrice?: string;
    discountPercent?: string;
    showOriginalPrice?: boolean;
    showDiscountPercent?: boolean;
    showLike?: boolean;
    showSave?: boolean;
    showShare?: boolean;
    icon?: string;
    padding?: string;
    thickness?: "thin" | "medium" | "thick";
    [key: string]: unknown;
}
export interface DirectoAiTemplate {
    id: string;
    title: string;
    active: boolean;
    slug: string;
    template: ComponentNode[];
}
//# sourceMappingURL=types.d.ts.map