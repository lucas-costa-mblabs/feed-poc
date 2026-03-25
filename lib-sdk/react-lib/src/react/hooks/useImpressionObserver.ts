import { useEffect, useRef, useState } from "react";
import type { DirectoAiTracker } from "../../core/tracker.js";

interface ImpressionObserverOptions {
  contentId: string;
  tracker: DirectoAiTracker;
  threshold?: number;
  data?: Record<string, any>;
}

export function useImpressionObserver({
  contentId,
  tracker,
  threshold = 0.5,
  data = {},
}: ImpressionObserverOptions) {
  const [isIntersecting, setIntersecting] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const hasTrackedImpression = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);

        if (entry.isIntersecting) {
          // In view
          startTimeRef.current = Date.now();

          if (!hasTrackedImpression.current) {
            tracker.trackImpression(contentId, data);
            hasTrackedImpression.current = true;
          }
        } else {
          // Out of view
          if (startTimeRef.current) {
            const durationMs = Date.now() - startTimeRef.current;
            const durationSeconds = durationMs / 1000;
            if (durationSeconds > 0.1) {
              // Only track if meaningful
              tracker.trackViewTime(contentId, durationSeconds, data);
            }
            startTimeRef.current = null;
          }
        }
      },
      { threshold },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      // On unmount, if it was in view, track final time
      if (startTimeRef.current) {
        const durationSeconds = (Date.now() - startTimeRef.current) / 1000;
        tracker.trackViewTime(contentId, durationSeconds, data);
      }
    };
  }, [contentId, tracker, threshold, JSON.stringify(data)]);

  return { elementRef, isIntersecting };
}
