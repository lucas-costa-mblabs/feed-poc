export const tokenToPx = (theme, token) => {
    if (!token)
        return undefined;
    return theme.spacing[token] ?? token;
};
export const getRadius = (theme, r) => {
    if (!r)
        return "0";
    return theme.borderRadius[r] ?? r;
};
export const colorToHex = (theme, token) => {
    if (!token)
        return undefined;
    return theme.colors[token] ?? token;
};
/**
 * GoLite Parser: Suporta lógica básica do Go Templates no navegador.
 * Suporta: if/else/end, eq, gt, len, slice, safeSlice e variáveis ($var).
 * Suporta tags com quebras de linha [s\S].
 */
export const resolveGoTemplate = (template, dataContext) => {
    if (!template || typeof template !== "string")
        return template || "";
    const vars = {};
    // Usa [\s\S] para capturar quebras de linha dentro das chaves {{ ... }}
    const tokens = template.split(/(\{\{[\s\S]*?\}\})/g);
    let output = "";
    const stack = [];
    const isCurrentlyDisplaying = () => {
        for (const s of stack) {
            if (!s.isDisplaying)
                return false;
        }
        return true;
    };
    const evaluateValue = (val) => {
        val = val.trim().replace(/\s+/g, " ");
        if (val.startsWith('"') && val.endsWith('"'))
            return val.slice(1, -1);
        if (!isNaN(Number(val)))
            return Number(val);
        if (val === "true")
            return true;
        if (val === "false")
            return false;
        if (val.startsWith("$"))
            return vars[val];
        const cleanPath = val.replace(/^\./, "");
        if (!cleanPath)
            return dataContext;
        const parts = cleanPath.split(".");
        let current = dataContext;
        for (const part of parts) {
            if (current && typeof current === "object" && part in current) {
                current = current[part];
            }
            else {
                return undefined;
            }
        }
        return current;
    };
    const evaluateExpression = (expr) => {
        expr = expr.trim().replace(/\s+/g, " ");
        while (expr.includes("(")) {
            expr = expr.replace(/\(([^()]+)\)/g, (_, sub) => {
                const res = evaluateExpression(sub);
                if (typeof res === "string")
                    return `"${res}"`;
                return String(res);
            });
        }
        const parts = expr.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
        if (parts.length === 0)
            return undefined;
        const func = parts[0];
        const args = parts.slice(1);
        switch (func) {
            case "eq":
                return evaluateValue(args[0]) == evaluateValue(args[1]);
            case "gt":
                return Number(evaluateValue(args[0])) > Number(evaluateValue(args[1]));
            case "len":
                const valLen = evaluateValue(args[0]);
                return typeof valLen === "string" || Array.isArray(valLen)
                    ? valLen.length
                    : 0;
            case "slice":
            case "safeSlice":
                const str = evaluateValue(args[0]);
                const start = Number(evaluateValue(args[1]));
                const end = args[2] ? Number(evaluateValue(args[2])) : undefined;
                if (typeof str !== "string")
                    return "";
                return str.slice(start, end);
            default:
                return evaluateValue(expr);
        }
    };
    for (const token of tokens) {
        if (token.startsWith("{{") && token.endsWith("}}")) {
            const content = token.slice(2, -2).trim().replace(/\s+/g, " ");
            const currentDisp = isCurrentlyDisplaying();
            if (content.match(/^\$\w+\s*(?::=|=)/)) {
                if (currentDisp) {
                    const match = content.match(/^\$(\w+)\s*(?::=|=)\s*(.*)$/);
                    if (match) {
                        vars[`$${match[1]}`] = evaluateExpression(match[2]);
                    }
                }
                continue;
            }
            if (content.startsWith("if ")) {
                const condition = evaluateExpression(content.slice(3));
                const canDisplay = currentDisp && !!condition;
                stack.push({ isDisplaying: canDisplay, hasExecuted: canDisplay });
            }
            else if (content.startsWith("else if ")) {
                if (stack.length === 0)
                    continue;
                const prev = stack[stack.length - 1];
                if (prev.hasExecuted) {
                    prev.isDisplaying = false;
                }
                else {
                    const parentDisp = stack.slice(0, -1).every((s) => s.isDisplaying);
                    const condition = evaluateExpression(content.slice(8));
                    prev.isDisplaying = parentDisp && !!condition;
                    if (prev.isDisplaying)
                        prev.hasExecuted = true;
                }
            }
            else if (content === "else") {
                if (stack.length === 0)
                    continue;
                const prev = stack[stack.length - 1];
                const parentDisp = stack.slice(0, -1).every((s) => s.isDisplaying);
                prev.isDisplaying = parentDisp && !prev.hasExecuted;
                if (prev.isDisplaying)
                    prev.hasExecuted = true;
            }
            else if (content === "end") {
                stack.pop();
            }
            else {
                if (currentDisp) {
                    const val = evaluateExpression(content);
                    output += val !== undefined && val !== null ? String(val) : "";
                }
            }
        }
        else {
            if (isCurrentlyDisplaying()) {
                output += token;
            }
        }
    }
    return output;
};
// Aliases para compatibilidade
export const resolveVariables = resolveGoTemplate;
export const injectTailwind = (theme) => {
    if (typeof window === "undefined")
        return Promise.resolve();
    const existingScript = document.getElementById("directo-ai-tailwind-cdn");
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
        if (window.tailwind)
            return Promise.resolve();
        return new Promise((resolve) => {
            existingScript.addEventListener("load", () => resolve());
        });
    }
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "directo-ai-tailwind-cdn";
        script.src = "https://cdn.tailwindcss.com";
        if (theme) {
            window.tailwind = window.tailwind || {};
            window.tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            primary: theme.colors.lightPrimary || theme.colors.primary || "#6366f1",
                        },
                    },
                },
            };
        }
        script.onload = () => {
            setTimeout(resolve, 50);
        };
        document.head.appendChild(script);
    });
};
export const injectLegacyStyles = () => {
    if (typeof window === "undefined")
        return;
    if (document.getElementById("directo-ai-legacy-styles"))
        return;
    const style = document.createElement("style");
    style.id = "directo-ai-legacy-styles";
    style.innerHTML = `
    .directo-ai-custom-post {
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
    }
  `;
    document.head.appendChild(style);
};
//# sourceMappingURL=utils.js.map