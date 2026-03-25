import type { DirectoAiTracker } from "../../core/tracker.js";
interface ImpressionObserverOptions {
    contentId: string;
    tracker: DirectoAiTracker;
    threshold?: number;
    data?: Record<string, any>;
}
export declare function useImpressionObserver({ contentId, tracker, threshold, data, }: ImpressionObserverOptions): {
    elementRef: import("react").RefObject<HTMLDivElement | null>;
    isIntersecting: boolean;
};
export {};
//# sourceMappingURL=useImpressionObserver.d.ts.map