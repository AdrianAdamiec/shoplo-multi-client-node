'use strict';

class CategoryResource {

    /**
     * Create a CategoryResource instance.
     *
     * @param {Object} shoploMultiClient
     */
    constructor(shoploMultiClient) {
        this.shoploMultiClient = shoploMultiClient;
    }

    static getCategoryPath(categoryId) {
        if (categoryId) {
            return `/v1/public/categories/${categoryId}`;
        }
        return '/v1/public/categories';
    }

    getCategories(categoryId, params){
        return this.shoploMultiClient.get(CategoryResource.getCategoryPath(categoryId), params);
    }
}

module.exports = CategoryResource;
