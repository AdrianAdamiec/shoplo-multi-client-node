'use strict';

class ProductResource {

    /**
     * Create a ProductResource instance.
     *
     * @param {Object} shoploMultiClient
     */
    constructor(shoploMultiClient) {
        this.shoploMultiClient = shoploMultiClient;
    }

    static getProductPath(productId) {
        if (productId) {
            return `/v1/public/products/${productId}`;
        }
        return '/v1/public/products';
    }

    static getProductImagesPath(productId, imageId) {
        if (imageId) {
            return `/v1/public/products/${productId}/images/${imageId}`;
        }
        return `/v1/public/products/${productId}/images`;
    }

    static getProductVariantsPath(productId, variantId) {
        if (variantId) {
            return `/v1/public/products/${productId}/variants/${variantId}`;
        }
        return `/v1/public/products/${productId}/variants`;
    }

    static getProductVariantsPropertiesPath(productId) {
        return `/v1/public/products/${productId}/variants-properties`;
    }

    getProducts(productId, params){
        return this.shoploMultiClient.get(ProductResource.getProductPath(productId), params);
    }

    updateProduct(productId, product){
        return this.shoploMultiClient.update(ProductResource.getProductPath(productId), product);
    }

    getProductImages(productId, params){
        return this.shoploMultiClient.get(ProductResource.getProductImagesPath(productId, null), params);
    }

    createProductImage(productId, image){
        return this.shoploMultiClient.create(ProductResource.getProductImagesPath(productId, null), image);
    }

    deleteProductImage(productId, imageId){
        return this.shoploMultiClient.delete(ProductResource.getProductImagesPath(productId, imageId));
    }

    getProductVariants(productId, variantId, params){
        return this.shoploMultiClient.get(ProductResource.getProductVariantsPath(productId, variantId), params);
    }

    createProductVariant(productId, variant){
        return this.shoploMultiClient.create(ProductResource.getProductVariantsPath(productId, null), variant);
    }

    updateProductVariant(productId, variantId, variant){
        return this.shoploMultiClient.update(ProductResource.getProductVariantsPath(productId, variantId), variant);
    }

    deleteProductVariant(productId, variantId){
        return this.shoploMultiClient.delete(ProductResource.getProductVariantsPath(productId, variantId));
    }

    getProductVariantsProperties(productId, params){
        return this.shoploMultiClient.get(ProductResource.getProductVariantsPropertiesPath(productId), params);
    }

    updateProductVariantsProperties(productId, property){
        return this.shoploMultiClient.update(ProductResource.getProductVariantsPropertiesPath(productId), property);
    }
}

module.exports = ProductResource;
