import type { SpacingToken, BorderRadiusToken, Theme } from "../core/types.js";

export const tokenToPx = (theme: Theme, token?: string): string | undefined => {
  if (!token) return undefined;
  return theme.spacing[token as SpacingToken] ?? token;
};

export const getRadius = (theme: Theme, r?: string): string => {
  if (!r) return "0";
  return theme.borderRadius[r as BorderRadiusToken] ?? r;
};

export const colorToHex = (
  theme: Theme,
  token?: string,
): string | undefined => {
  if (!token) return undefined;
  return theme.colors[token] ?? token;
};

export const resolveVariables = (
  str: string | undefined,
  dataContext: Record<string, unknown> | undefined,
): string | undefined => {
  if (!str || typeof str !== "string") return str;
  return str.replace(/\{\{(.*?)\}\}/g, (match, path: string) => {
    const parts = path.trim().split(".");
    let current: unknown = dataContext;
    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = (current as Record<string, unknown>)[part];
      } else {
        return match;
      }
    }
    return String(current);
  });
};
