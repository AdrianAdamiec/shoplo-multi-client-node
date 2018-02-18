'use strict';

class ChannelProductResource {

    /**
     * Create a ChannelProductResource instance.
     *
     * @param {Object} shoploMultiClient
     */
    constructor(shoploMultiClient) {
        this.shoploMultiClient = shoploMultiClient;
    }

    static getChannelProductPath(channelId, productId) {
        if (productId) {
            return `/v1/public/channel/${channelId}/products/${productId}`;
        }
        return `/v1/public/channel/${channelId}/products`;
    }

    static getChannelProductImagesPath(productId) {
        return `/v1/public/channel/products/${productId}/images`;
    }

    static getChannelProductVariantsPath(productId) {
        return `/v1/public/channel/products/${productId}/variants`;
    }

    getChannelProducts(channelId, productId, params){
        return this.shoploMultiClient.get(ChannelProductResource.getChannelProductPath(channelId, productId), params);
    }

    updateChannelProduct(channelId, productId, product){
        return this.shoploMultiClient.update(ChannelProductResource.getChannelProductPath(channelId, productId), product);
    }

    getChannelProductImages(productId, params){
        return this.shoploMultiClient.get(ChannelProductResource.getChannelProductImagesPath(productId), params);
    }

    getChannelProductVariants(productId, params){
        return this.shoploMultiClient.get(ChannelProductResource.getChannelProductVariantsPath(productId), params);
    }
}

module.exports = ChannelProductResource;
