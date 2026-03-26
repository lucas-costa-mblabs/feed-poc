export type SpacingToken = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type BorderRadiusToken = "sm" | "md" | "lg" | "full";
export type TypographyToken = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export interface Theme {
    colors: Record<string, string>;
    spacing: Record<SpacingToken, string>;
    borderRadius: Record<BorderRadiusToken, string>;
    typography: Record<TypographyToken, string>;
}
export interface PostProfile {
    accountName: string;
    iconUrl: string;
    description?: string;
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
    id?: string;
    contentId: string;
    title: string;
    legend?: string;
    url: string;
    price?: string | null;
    originalPrice?: string | null;
    discount?: string | null;
    shop?: PostShop;
    profile?: PostProfile;
    templateId: string;
    template?: string;
    [key: string]: unknown;
}
export type ComponentType = "container" | "text" | "media" | "divider" | "button" | "price" | "icon" | "post_interactions" | "html";
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
    typography?: "caption" | "body" | "heading5" | "heading4" | "heading3" | "heading2" | "heading1" | string;
    color?: string;
    fontWeight?: "bold" | "semiBold" | "normal" | string;
    textAlign?: "left" | "center" | "right";
    url?: string;
    alt?: string;
    aspectRatio?: string;
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
    label?: string;
    variant?: "primary" | "secondary" | "outline" | "ghost" | string;
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
    thickness?: "thin" | "medium" | "thick" | string;
    [key: string]: unknown;
}
export interface DirectoAiTemplate {
    templateId: string;
    name: string;
    active: boolean;
    slug: string;
    data: ComponentNode[];
}
//# sourceMappingURL=types.d.ts.map