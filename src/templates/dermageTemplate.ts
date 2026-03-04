import type { ComponentNode } from "../types";

export const dermageProductTemplate: ComponentNode[] = [
  {
    id: "rvnm6q2id",
    type: "container",
    blocks: [
      {
        id: "r8yfd5q46",
        type: "icon",
        icon: "shoppingbag",
        size: 20,
        padding: "sm",
        backgroundColor: "gray-100",
        borderRadius: "full",
      },
      {
        id: "8ck3l1t4d",
        type: "text",
        value: "{{post.shop.name}}",
        typography: "heading5",
        color: "gray-900",
        fontWeight: "semiBold",
      },
    ],
    direction: "row",
    paddingX: "md",
    paddingY: "sm",
    alignItems: "center",
    gap: "sm",
  },
  {
    id: "6n1cziyz5",
    type: "divider",
    thickness: "thin",
  },
  {
    id: "w0sibv6hq",
    type: "container",
    blocks: [
      {
        id: "qqhmjaefb",
        type: "image",
        url: "",
        alt: "Image",
        width: "100%",
        height: "",
      },
    ],
    direction: "column",
    paddingX: "md",
  },
  {
    id: "6sz45x7tl",
    type: "divider",
  },
  {
    id: "7mvrkp9k3",
    type: "post_interactions",
    showLike: true,
    showSave: true,
    showShare: true,
    paddingX: "md",
    paddingY: "xs",
  },
  {
    id: "tljn2usvt",
    type: "container",
    blocks: [
      {
        id: "jz27jbdtn",
        type: "text",
        value: "{{post.title}}",
        typography: "heading5",
        color: "gray-900",
        fontWeight: "normal",
      },
    ],
    direction: "column",
    paddingX: "md",
    paddingY: "xs",
  },
  {
    id: "elr6q26ey",
    type: "price",
    price: "R$ 99,90",
    originalPrice: "R$ 149,90",
    discountPercent: "33",
    showOriginalPrice: true,
    showDiscountPercent: true,
    paddingX: "md",
  },
  {
    id: "pbwqas01z",
    type: "container",
    blocks: [
      {
        id: "v8qnki773",
        type: "button",
        label: "Clique Aqui",
        variant: "primary",
        radius: "md",
      },
    ],
    direction: "column",
    paddingX: "md",
    justifyContent: "center",
  },
];
