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
}
//# sourceMappingURL=tracker.js.map