'use strict';

class NotificationResource {

    /**
     * Create a NotificationResource instance.
     *
     * @param {Object} shoploMultiClient
     */
    constructor(shoploMultiClient) {
        this.shoploMultiClient = shoploMultiClient;
    }

    static getNotificationPath(id) {
        if (id) {
            return `/v1/public/notifications/${id}`;
        }
        return '/v1/public/notifications';
    }

    static getTodosNotificationPath() {
        return '/v1/public/notifications/todos';
    }

    getNotifications(id, params){
        return this.shoploMultiClient.get(NotificationResource.getNotificationPath(id), params);
    }

    getTodosNotifications(params){
        return this.shoploMultiClient.get(NotificationResource.getTodosNotificationPath(), params);
    }
}

module.exports = NotificationResource;
