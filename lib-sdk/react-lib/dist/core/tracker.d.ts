import type { DirectoAiConfig } from "./types.js";
export interface DirectoAiTracker {
    trackEvent(name: string, data: Record<string, any>): Promise<void>;
    trackImpression(contentId: string, data: Record<string, any>): Promise<void>;
    trackViewTime(contentId: string, seconds: number, data: Record<string, any>): Promise<void>;
}
export declare class DefaultDirectoAiTracker implements DirectoAiTracker {
    private config;
    constructor(config: DirectoAiConfig);
    private get baseUrl();
    private sendMessageQueue;
    trackEvent(name: string, data: Record<string, any>): Promise<void>;
    trackImpression(contentId: string, data: Record<string, any>): Promise<void>;
    trackViewTime(contentId: string, seconds: number, data: Record<string, any>): Promise<void>;
}
//# sourceMappingURL=tracker.d.ts.map