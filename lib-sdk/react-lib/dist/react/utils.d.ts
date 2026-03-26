import type { Theme } from "../core/types.js";
export declare const tokenToPx: (theme: Theme, token?: string) => string | undefined;
export declare const getRadius: (theme: Theme, r?: string) => string;
export declare const colorToHex: (theme: Theme, token?: string) => string | undefined;
/**
 * GoLite Parser: Suporta lógica básica do Go Templates no navegador.
 * Suporta: if/else/end, eq, gt, len, slice, safeSlice e variáveis ($var).
 * Suporta tags com quebras de linha [s\S].
 */
export declare const resolveGoTemplate: (template: string | undefined, dataContext: Record<string, any> | undefined) => string;
export declare const resolveVariables: (template: string | undefined, dataContext: Record<string, any> | undefined) => string;
export declare const injectTailwind: (theme?: Theme) => Promise<void>;
export declare const injectLegacyStyles: () => void;
//# sourceMappingURL=utils.d.ts.map