'use strict';

class OrderResource {

    /**
     * Create a OrderResource instance.
     *
     * @param {Object} shoploMultiClient
     */
    constructor(shoploMultiClient) {
        this.shoploMultiClient = shoploMultiClient;
    }

    static getOrderPath(id) {
        if (id) {
            return `/v1/public/orders/${id}`;
        }
        return '/v1/public/orders';
    }

    static getOrderTimelinePath(id) {
        return `/v1/public/orders/${id}/timeline`;
    }

    static getOrderFulfillmentPath(orderId, fulfillmentId) {
        if (fulfillmentId) {
            return `/v1/public/orders/${orderId}/fulfillments/${fulfillmentId}`;
        }
        return `/v1/public/orders/${orderId}/fulfillments`;
    }

    getOrders(id, params){
        return this.shoploMultiClient.get(OrderResource.getOrderPath(id), params);
    }

    getOrderTimeline(id, params){
        return this.shoploMultiClient.get(OrderResource.getOrderTimelinePath(id), params);
    }

    updateOrder(id, order){
        return this.shoploMultiClient.update(OrderResource.getOrderPath(id), order);
    }

    deleteOrder(id){
        return this.shoploMultiClient.delete(OrderResource.getOrderPath(id));
    }

    createOrderFulfillment(orderId, orderFulfillment){
        return this.shoploMultiClient.create(OrderResource.getOrderFulfillmentPath(orderId, null), orderFulfillment);
    }

    updateOrderFulfillment(orderId, fulfillmentId, orderFulfillment){
        return this.shoploMultiClient.update(OrderResource.getOrderFulfillmentPath(orderId, fulfillmentId), orderFulfillment);
    }

    deleteOrderFulfillment(orderId, fulfillmentId){
        return this.shoploMultiClient.delete(OrderResource.getOrderFulfillmentPath(orderId, fulfillmentId));
    }
}

module.exports = OrderResource;
