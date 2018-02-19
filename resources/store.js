'use strict';

class StoreResource {

    /**
     * Create a StoreResource instance.
     *
     * @param {Object} shoploMultiClient
     */
    constructor(shoploMultiClient) {
        this.shoploMultiClient = shoploMultiClient;
    }

    static getStoreApplicationsPath(shopChannelId) {
        return `/v1/public/store/shoplo/${shopChannelId}/applications`;
    }

    static getStoreCouponsPath(shopChannelId, couponId) {
        if (couponId) {
            return `/v1/public/store/shoplo/${shopChannelId}/coupons/${couponId}`;
        }
        return `/v1/public/store/shoplo/${shopChannelId}/coupons`;
    }

    static getStoreLayoutsPath(shopChannelId, layoutId) {
        if (layoutId) {
            return `/v1/public/store/shoplo/${shopChannelId}/layouts/${layoutId}`;
        }
        return `/v1/public/store/shoplo/${shopChannelId}/layouts`;
    }

    getStoreApplications(shopChannelId){
        return this.shoploMultiClient.get(StoreResource.getStoreApplicationsPath(shopChannelId));
    }

    getStoreCoupons(shopChannelId){
        return this.shoploMultiClient.get(StoreResource.getStoreCouponsPath(shopChannelId));
    }

    patchStoreCoupons(shopChannelId, couponId, params){
        return this.shoploMultiClient.patch(StoreResource.getStoreCouponsPath(shopChannelId, couponId), params);
    }

    getStoreLayouts(shopChannelId){
        return this.shoploMultiClient.get(StoreResource.getStoreLayoutsPath(shopChannelId));
    }

    patchStoreLayouts(shopChannelId, layoutId, params){
        return this.shoploMultiClient.patch(StoreResource.getStoreLayoutsPath(shopChannelId, layoutId), params);
    }
}

module.exports = StoreResource;
