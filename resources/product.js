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

    static getProductPath(id) {
        if (id) {
            return `/v1/public/products/${id}`;
        }
        return '/v1/public/products';
    }

    getProducts(id, params){
        return this.shoploMultiClient.get(ProductResource.getProductPath(id), params);
    }

    updateProduct(id, product){
        return this.shoploMultiClient.update(ProductResource.getProductPath(id), product);
    }
}

module.exports = ProductResource;
