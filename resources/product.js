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

    // getCount(params){
    //     return this.shoploClient.get(ProductResource.getProductCountPath(), params);
    // }
    //
    // createProduct(product){
    //     return this.shoploClient.create(ProductResource.getProductPath(null), { product });
    // }
    //
    // updateProduct(id, product){
    //     return this.shoploClient.update(ProductResource.getProductPath(id), { product });
    // }
    //
    // deleteProduct(id){
    //     return this.shoploClient.delete(ProductResource.getProductPath(id), null);
    // }
}

module.exports = ProductResource;
