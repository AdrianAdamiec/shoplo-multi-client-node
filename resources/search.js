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

    static getSavedQueriesPath() {
        return '/v1/public/search/saved-queries';
    }

    search(params){
        return this.shoploMultiClient.get(SearchResource.getSearchPath(), params);
    }

    getSavedQueries(params){
        return this.shoploMultiClient.get(SearchResource.getSavedQueriesPath(), params);
    }

    createSavedQuery(query){
        return this.shoploMultiClient.create(SearchResource.getSavedQueriesPath(), query);
    }
}

module.exports = SearchResource;
