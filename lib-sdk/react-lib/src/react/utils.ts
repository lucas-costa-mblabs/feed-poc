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
    // Remove o ponto inicial se existir (padrão Go: {{.Title}})
    const cleanPath = path.trim().replace(/^\./, "");
    if (!cleanPath) return String(dataContext);

    const parts = cleanPath.split(".");
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

export const injectTailwind = (theme?: Theme): Promise<void> => {
  if (typeof window === "undefined") return Promise.resolve();

  const existingScript = document.getElementById(
    "directo-ai-tailwind-cdn",
  ) as HTMLScriptElement;

  // Garante que o CSS de correção de largura esteja presente
  if (!document.getElementById("directo-ai-tailwind-fix")) {
    const style = document.createElement("style");
    style.id = "directo-ai-tailwind-fix";
    style.innerHTML = `
      .directo-ai-custom-post > div:first-child {
        width: 100% !important;
        max-width: 100% !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }
    `;
    document.head.appendChild(style);
  }

  if (existingScript) {
    if ((window as any).tailwind) return Promise.resolve();
    return new Promise((resolve) => {
      existingScript.addEventListener("load", () => resolve());
    });
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.id = "directo-ai-tailwind-cdn";
    script.src = "https://cdn.tailwindcss.com";

    // Configuração customizada para o Tailwind Play CDN
    if (theme) {
      (window as any).tailwind = (window as any).tailwind || {};
      (window as any).tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary:
                theme.colors.lightPrimary || theme.colors.primary || "#6366f1",
            },
          },
        },
      };
    }

    script.onload = () => {
      // Pequeno timeout para garantir que o runtime do Tailwind inicializou
      setTimeout(resolve, 50);
    };
    document.head.appendChild(script);
  });
};

export const injectLegacyStyles = () => {
  // Mantido por compatibilidade temporária se necessário
  if (typeof window === "undefined") return;
  if (document.getElementById("directo-ai-legacy-styles")) return;

  const style = document.createElement("style");
  style.id = "directo-ai-legacy-styles";
  style.innerHTML = `
    .directo-ai-custom-post {
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
    }
  `;
  document.head.appendChild(style);
};
