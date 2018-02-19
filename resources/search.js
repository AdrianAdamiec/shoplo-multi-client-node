'use strict';

class SearchResource {

    /**
     * Create a SearchResource instance.
     *
     * @param {Object} shoploMultiClient
     */
    constructor(shoploMultiClient) {
        this.shoploMultiClient = shoploMultiClient;
    }

    static getSearchPath() {
        return '/v1/public/search';
    }

    search(params){
        return this.shoploMultiClient.get(SearchResource.getSearchPath(), params);
    }
}

module.exports = SearchResource;
