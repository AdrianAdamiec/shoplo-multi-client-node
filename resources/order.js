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

    getOrders(id, params){
        return this.shoploMultiClient.get(OrderResource.getOrderPath(id), params);
    }

    updateOrder(id, order){
        return this.shoploMultiClient.update(OrderResource.getOrderPath(id), order);
    }

    deleteOrder(id){
        return this.shoploMultiClient.delete(OrderResource.getOrderPath(id));
    }
}

module.exports = OrderResource;
