import type { Theme } from "../core/types.js";
export declare const tokenToPx: (theme: Theme, token?: string) => string | undefined;
export declare const getRadius: (theme: Theme, r?: string) => string;
export declare const colorToHex: (theme: Theme, token?: string) => string | undefined;
export declare const resolveVariables: (str: string | undefined, dataContext: Record<string, unknown> | undefined) => string | undefined;
export declare const injectTailwind: (theme?: Theme) => Promise<void>;
export declare const injectLegacyStyles: () => void;
//# sourceMappingURL=utils.d.ts.map