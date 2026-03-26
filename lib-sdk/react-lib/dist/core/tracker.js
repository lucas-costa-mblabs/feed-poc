export class DefaultDirectoAiTracker {
    config;
    constructor(config) {
        this.config = config;
    }
    get baseUrl() {
        return this.config.baseUrl || "https://api.directoai.com.br";
    }
    async sendMessageQueue(payload) {
        try {
            const response = await fetch(`${this.baseUrl}/metric-queue`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                console.warn("DirectoAi SDK: Error sending message to queue", response.status);
            }
        }
        catch (error) {
            console.error("DirectoAi SDK: Failed to send analytic event:", error);
        }
    }
    async trackEvent(name, data) {
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
    async trackImpression(contentId, data) {
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
    async trackViewTime(contentId, seconds, data) {
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
    async toggleLike(contentId, campaignId) {
        return this.trackEvent("click-like", {
            contentId,
            campaignId,
        });
    }
    async toggleFavorite(contentId, campaignId, isFavorited) {
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
        }
        catch (error) {
            console.error("DirectoAi SDK: Failed to toggle favorite:", error);
        }
    }
    async shareContent(contentId, campaignId, title) {
        const shareId = crypto.randomUUID();
        const publicShareUrl = `${window.location.origin}/share/${shareId}`;
        try {
            const response = await fetch(`${this.baseUrl}/campaign/api/v1/feed/share`, {
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
            });
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
                if (window.flutter_inappwebview?.callHandler) {
                    window.flutter_inappwebview.callHandler("shareLink", publicShareUrl);
                }
                else if (navigator.share &&
                    navigator.canShare &&
                    navigator.canShare(shareData)) {
                    await navigator.share(shareData);
                }
                else {
                    await navigator.clipboard.writeText(publicShareUrl);
                }
            }
        }
        catch (error) {
            console.error("DirectoAi SDK: Failed to share content:", error);
        }
    }
}
//# sourceMappingURL=tracker.js.map