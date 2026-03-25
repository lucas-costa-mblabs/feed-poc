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
export const resolveVariables = (str, dataContext) => {
    if (!str || typeof str !== "string")
        return str;
    return str.replace(/\{\{(.*?)\}\}/g, (match, path) => {
        const parts = path.trim().split(".");
        let current = dataContext;
        for (const part of parts) {
            if (current && typeof current === "object" && part in current) {
                current = current[part];
            }
            else {
                return match;
            }
        }
        return String(current);
    });
};
//# sourceMappingURL=utils.js.map