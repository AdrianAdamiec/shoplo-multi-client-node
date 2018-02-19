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

    static getChannelProductDetailsPath(channelId, productId) {
        return `/v1/public/channel/${channelId}/products/${productId}/channel-details`;
    }

    static getChannelProductImageMovePath(productId) {
        return `/v1/public/channel/products/${productId}/images/product-image`;
    }

    static getChannelProductImagesPath(productId, imageId) {
        if (imageId) {
            return `/v1/public/channel/products/${productId}/images/${imageId}`;
        }
        return `/v1/public/channel/products/${productId}/images`;
    }

    static getChannelProductVariantsPath(productId, variantId) {
        if (variantId) {
            return `/v1/public/channel/products/${productId}/variants/${variantId}`;
        }
        return `/v1/public/channel/products/${productId}/variants`;
    }

    getChannelProducts(channelId, productId, params){
        return this.shoploMultiClient.get(ChannelProductResource.getChannelProductPath(channelId, productId), params);
    }

    patchChannelProductDetails(channelId, productId, details){
        return this.shoploMultiClient.patch(ChannelProductResource.getChannelProductDetailsPath(channelId, productId), details);
    }

    updateChannelProductDetails(channelId, productId, details){
        return this.shoploMultiClient.update(ChannelProductResource.getChannelProductDetailsPath(channelId, productId), details);
    }

    deleteChannelProduct(channelId, productId){
        return this.shoploMultiClient.delete(ChannelProductResource.getChannelProductPath(channelId, productId));
    }

    getChannelProductImages(productId, params){
        return this.shoploMultiClient.get(ChannelProductResource.getChannelProductImagesPath(productId), params);
    }

    createChannelProductImage(productId, image){
        return this.shoploMultiClient.create(ChannelProductResource.getChannelProductImagesPath(productId), image);
    }

    moveChannelProductImage(productId, image){
        return this.shoploMultiClient.create(ChannelProductResource.getChannelProductImageMovePath(productId), image);
    }

    patchChannelProductImage(productId, imageId, image){
        return this.shoploMultiClient.patch(ChannelProductResource.getChannelProductImagesPath(productId, imageId), image);
    }

    deleteChannelProductImage(productId, imageId){
        return this.shoploMultiClient.delete(ChannelProductResource.getChannelProductImagesPath(productId, imageId));
    }

    getChannelProductVariants(productId, variantId, params){
        return this.shoploMultiClient.get(ChannelProductResource.getChannelProductVariantsPath(productId, variantId), params);
    }

    createChannelProductVariant(productId, variant){
        return this.shoploMultiClient.create(ChannelProductResource.getChannelProductVariantsPath(productId), variant);
    }

    patchChannelProductVariant(productId, variantId, variant){
        return this.shoploMultiClient.patch(ChannelProductResource.getChannelProductVariantsPath(productId, variantId), variant);
    }

    deleteChannelProductVariant(productId, variantId){
        return this.shoploMultiClient.delete(ChannelProductResource.getChannelProductVariantsPath(productId, variantId));
    }
}

module.exports = ChannelProductResource;
