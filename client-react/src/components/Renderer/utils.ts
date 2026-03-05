export const tokenToPx = (token?: string) => {
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

export const getRadius = (r?: string) => {
  switch (r) {
    case "sm":
      return "4px";
    case "md":
      return "8px";
    case "lg":
      return "12px";
    case "full":
      return "9999px";
    default:
      return "0";
  }
};

export const colorToHex = (token?: string) => {
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
      return token;
  }
};

export const resolveVariables = (str: string | undefined, dataContext: any) => {
  if (!str || typeof str !== "string") return str;
  return str.replace(/\{\{(.*?)\}\}/g, (match, path) => {
    const parts = path.trim().split(".");
    let current: any = dataContext;
    for (const part of parts) {
      if (current && part in current) {
        current = current[part];
      } else {
        return match;
      }
    }
    return current;
  });
};
