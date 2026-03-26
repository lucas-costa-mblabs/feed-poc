import type { DirectoAiConfig } from "./types.js";

export interface DirectoAiTracker {
  trackEvent(name: string, data: Record<string, any>): Promise<void>;
  trackImpression(contentId: string, data: Record<string, any>): Promise<void>;
  trackViewTime(
    contentId: string,
    seconds: number,
    data: Record<string, any>,
  ): Promise<void>;
  toggleLike(contentId: string, campaignId?: string): Promise<void>;
  toggleFavorite(
    contentId: string,
    campaignId: string | undefined,
    isFavorited: boolean,
  ): Promise<void>;
  shareContent(
    contentId: string,
    campaignId?: string,
    title?: string,
  ): Promise<void>;
}

export class DefaultDirectoAiTracker implements DirectoAiTracker {
  private config: DirectoAiConfig;

  constructor(config: DirectoAiConfig) {
    this.config = config;
  }

  private get baseUrl() {
    return this.config.baseUrl || "https://api.directoai.com.br";
  }

  private async sendMessageQueue(payload: object) {
    try {
      const response = await fetch(`${this.baseUrl}/metric-queue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.warn(
          "DirectoAi SDK: Error sending message to queue",
          response.status,
        );
      }
    } catch (error) {
      console.error("DirectoAi SDK: Failed to send analytic event:", error);
    }
  }

  async trackEvent(name: string, data: Record<string, any>) {
    const payload = {
      type: "click",
      data: {
        ...data,
        accountId: this.config.accountId,
        customerId: this.config.customerId,
        deviceId: this.config.deviceId,
        eventType: name,
        createdAt: new Date().toISOString(),
      },
    };
    return this.sendMessageQueue(payload);
  }

  async trackImpression(contentId: string, data: Record<string, any>) {
    const payload = {
      type: "view",
      data: {
        ...data,
        contentId,
        accountId: this.config.accountId,
        customerId: this.config.customerId,
        deviceId: this.config.deviceId,
        createdAt: new Date().toISOString(),
      },
    };
    return this.sendMessageQueue(payload);
  }

  async trackViewTime(
    contentId: string,
    seconds: number,
    data: Record<string, any>,
  ) {
    const payload = {
      type: "timeView",
      data: {
        ...data,
        contentId,
        time: seconds,
        accountId: this.config.accountId,
        customerId: this.config.customerId,
        deviceId: this.config.deviceId,
        createdAt: new Date().toISOString(),
      },
    };
    return this.sendMessageQueue(payload);
  }

  async toggleLike(contentId: string, campaignId?: string) {
    return this.trackEvent("click-like", {
      contentId,
      campaignId,
    });
  }

  async toggleFavorite(
    contentId: string,
    campaignId: string | undefined,
    isFavorited: boolean,
  ) {
    const method = isFavorited ? "DELETE" : "POST";
    const url = `${this.baseUrl}/campaign/api/v1/feed/favorites`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: this.config.accountId,
          customerId: this.config.customerId,
          contentId,
          campaignId,
        }),
      });

      if (response.ok) {
        await this.trackEvent("click-favorite", {
          contentId,
          campaignId,
        });
      }
    } catch (error) {
      console.error("DirectoAi SDK: Failed to toggle favorite:", error);
    }
  }

  async shareContent(contentId: string, campaignId?: string, title?: string) {
    const shareId = crypto.randomUUID();
    const publicShareUrl = `${window.location.origin}/share/${shareId}`;

    try {
      const response = await fetch(
        `${this.baseUrl}/campaign/api/v1/feed/share`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            share_id: shareId,
            content_id: contentId,
            campaign_id: campaignId || "",
            account_id: this.config.accountId,
            created_by: this.config.customerId,
            expires_in_hours: 168,
            url: publicShareUrl,
          }),
        },
      );

      if (response.ok) {
        await this.trackEvent("click-share", {
          contentId,
          campaignId,
        });

        const shareData = {
          title: title || "Compartilhar",
          url: publicShareUrl,
          text: title || "",
        };

        if ((window as any).flutter_inappwebview?.callHandler) {
          (window as any).flutter_inappwebview.callHandler(
            "shareLink",
            publicShareUrl,
          );
        } else if (
          navigator.share &&
          navigator.canShare &&
          navigator.canShare(shareData)
        ) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(publicShareUrl);
        }
      }
    } catch (error) {
      console.error("DirectoAi SDK: Failed to share content:", error);
    }
  }
}
