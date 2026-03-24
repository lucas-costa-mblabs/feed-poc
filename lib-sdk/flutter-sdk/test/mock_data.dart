const mockTemplate = [
  {
    "id": "template-1",
    "title": "Raspadinha",
    "active": true,
    "slug": "cvd:raspadinha",
    "template": [
      {
        "id": "w0sibv6hq",
        "type": "container",
        "blocks": [
          {
            "id": "ect61bubl",
            "type": "media",
            "url": "https://images.dev-directoai.com.br/placeholder.png",
            "alt": "Mídia",
            "width": "100%",
            "height": "100%",
            "objectFit": "fill",
          },
        ],
        "direction": "column",
        "height": "100%",
      },
      {"id": "6sz45x7tl", "type": "divider"},
      {
        "id": "7mvrkp9k3",
        "type": "post_interactions",
        "showLike": true,
        "showSave": true,
        "showShare": false,
        "paddingX": "md",
        "paddingY": "xs",
      },
      {
        "id": "tljn2usvt",
        "type": "container",
        "blocks": [
          {
            "id": "g86791d3w",
            "type": "text",
            "value": "Aniversário Super João",
            "typography": "heading5",
            "color": "gray-900",
          },
        ],
        "direction": "column",
        "paddingX": "md",
        "paddingY": "xs",
      },
      {
        "id": "pbwqas01z",
        "type": "container",
        "blocks": [
          {
            "id": "v8qnki773",
            "type": "button",
            "label": "Ver cupons raspáveis",
            "variant": "primary",
            "radius": "md",
            "deeplink": "directoai://test",
          },
        ],
        "direction": "column",
        "paddingX": "md",
        "justifyContent": "center",
        "gap": "sm",
        "paddingY": "sm",
      },
      {
        "id": "price-1",
        "type": "price",
        "price": "99.90",
        "originalPrice": "129.90",
        "discountPercent": "23",
        "showOriginalPrice": true,
        "showDiscountPercent": true,
        "paddingX": "md",
      },
      {"id": "icon-1", "type": "icon", "icon": "shoppingbag", "size": 20},
    ],
  },
];

const mockDataContext = {
  "post": {
    "title": "Test Post Title",
    "price": "49.90",
    "originalPrice": "59.90",
    "discount": "16",
    "url": "https://images.dev-directoai.com.br/test.png",
  },
};
