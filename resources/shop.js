'use strict';

class ShopResource {

    /**
     * Create a ShopResource instance.
     *
     * @param {Object} shoploMultiClient
     */
    constructor(shoploMultiClient) {
        this.shoploMultiClient = shoploMultiClient;
    }

    static getShopPath() {
        return '/v1/public/shop';
    }

    patchShop(params){
        return this.shoploMultiClient.patch(ShopResource.getShopPath(), params);
    }
}

module.exports = ShopResource;
