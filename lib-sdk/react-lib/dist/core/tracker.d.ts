import type { DirectoAiConfig } from "./types.js";
export interface DirectoAiTracker {
    trackEvent(name: string, data: Record<string, any>): Promise<void>;
    trackImpression(contentId: string, data: Record<string, any>): Promise<void>;
    trackViewTime(contentId: string, seconds: number, data: Record<string, any>): Promise<void>;
    toggleLike(contentId: string, campaignId?: string): Promise<void>;
    toggleFavorite(contentId: string, campaignId: string | undefined, isFavorited: boolean): Promise<void>;
    shareContent(contentId: string, campaignId?: string, title?: string): Promise<void>;
}
export declare class DefaultDirectoAiTracker implements DirectoAiTracker {
    private config;
    constructor(config: DirectoAiConfig);
    private get baseUrl();
    private sendMessageQueue;
    trackEvent(name: string, data: Record<string, any>): Promise<void>;
    trackImpression(contentId: string, data: Record<string, any>): Promise<void>;
    trackViewTime(contentId: string, seconds: number, data: Record<string, any>): Promise<void>;
    toggleLike(contentId: string, campaignId?: string): Promise<void>;
    toggleFavorite(contentId: string, campaignId: string | undefined, isFavorited: boolean): Promise<void>;
    shareContent(contentId: string, campaignId?: string, title?: string): Promise<void>;
}
//# sourceMappingURL=tracker.d.ts.map