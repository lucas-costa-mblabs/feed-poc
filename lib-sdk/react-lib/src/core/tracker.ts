import type { DirectoAiConfig } from "./types.js";

export interface DirectoAiTracker {
  trackEvent(name: string, data: Record<string, any>): Promise<void>;
  trackImpression(contentId: string, data: Record<string, any>): Promise<void>;
  trackViewTime(
    contentId: string,
    seconds: number,
    data: Record<string, any>,
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
}
