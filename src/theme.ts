export const theme = {
  colors: {
    white: "#ffffff",
    "gray-100": "#f3f4f6",
    "gray-200": "#e2e8f0",
    "gray-800": "#1f2937",
    "gray-900": "#111827",
    primary: "#6366f1",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },

  typography: {
    body: { fontSize: "16px", fontWeight: "normal" },
    caption: { fontSize: "12px", fontWeight: "normal" },
    heading1: { fontSize: "32px", fontWeight: "bold" },
    heading2: { fontSize: "24px", fontWeight: "bold" },
    heading3: { fontSize: "20px", fontWeight: "bold" },
    heading4: { fontSize: "18px", fontWeight: "bold" },
    heading5: { fontSize: "16px", fontWeight: "bold" },
  },

  fontWeight: {
    normal: "400",
    semiBold: "600",
    bold: "700",
  },

  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    full: "9999px",
  },

  button: {
    sizes: {
      xs: { padding: "4px 8px", fontSize: "10px" },
      sm: { padding: "6px 12px", fontSize: "12px" },
      md: { padding: "10px 16px", fontSize: "14px" },
      lg: { padding: "14px 24px", fontSize: "16px" },
      xl: { padding: "18px 32px", fontSize: "18px" },
      xxl: { padding: "22px 40px", fontSize: "20px" },
    },
  },

  divider: {
    thin: { borderWidth: "0.5px", borderColor: "#f1f5f9" },
    medium: { borderWidth: "1px", borderColor: "#e2e8f0" },
    thick: { borderWidth: "2px", borderColor: "#e2e8f0" },
  },
} as const;
