import type { ComponentNode } from "../types";

export const dermageProductTemplate: ComponentNode[] = [
  {
    id: "shop-rock-card",
    type: "container",
    direction: "column",
    backgroundColor: "white",
    borderRadius: "md",
    height: "100%",
    blocks: [
      // 1. HEADER (Shop Logo + Name)
      {
        id: "header-container",
        type: "container",
        direction: "row",
        alignItems: "center",
        paddingX: "md",
        paddingY: "md",
        gap: "sm",
        blocks: [
          {
            id: "shop-avatar",
            type: "icon",
            icon: "user",
            backgroundColor: "gray-200",
            size: 32,
            borderRadius: "full",
          },
          {
            id: "shop-name",
            type: "text",
            value: "Shop Rock",
            typography: "heading3",
            fontWeight: "semiBold",
            color: "gray-900",
          },
        ],
      },
      // Divider
      {
        id: "header-divider",
        type: "divider",
      },
      // 2. PRODUCT IMAGE
      {
        id: "product-image",
        type: "image",
        url: "", // In a real scenario we'd have a prop for this, using placeholder for builder
        alt: "Dermage Revox",
        height: "100%",
      },
      // 3. PRODUCT INFO CONTAINER
      {
        id: "info-container",
        type: "container",
        direction: "column",
        paddingX: "md",
        paddingY: "md",
        gap: "md",
        blocks: [
          // Actions Row (Heart, Bookmark ... Share)
          {
            id: "actions-row",
            type: "container",
            direction: "row",
            justifyContent: "space-between",
            alignItems: "center",
            blocks: [
              {
                id: "actions-left",
                type: "container",
                direction: "row",
                gap: "xs",
                blocks: [
                  {
                    id: "btn-like",
                    type: "icon",
                    icon: "heart",
                    size: 24,
                  },
                  {
                    id: "btn-save",
                    type: "icon",
                    icon: "bookmark",
                    size: 24,
                  },
                ],
              },
              {
                id: "btn-share",
                type: "icon",
                icon: "share",
                size: 24,
              },
            ],
          },
          // Spacer/Title
          {
            id: "product-title",
            type: "text",
            value: "{{post.title}}",
            typography: "heading3",
            color: "gray-900",
          },
          // Price
          {
            id: "product-price",
            type: "text",
            value: "{{post.price}}",
            typography: "heading1",
            fontWeight: "bold",
            color: "gray-900",
          },
          // CTA Button
          {
            id: "product-cta",
            type: "button",
            label: "Ver detalhes",
            variant: "primary",
            radius: "full",
            fullWidth: true,
          },
        ],
      },
    ],
  },
];
