'use strict';

class TrackingResource {

    /**
     * Create a trackingResource instance.
     *
     * @param {Object} shoploMultiClient
     */
    constructor(shoploMultiClient) {
        this.shoploMultiClient = shoploMultiClient;
    }

    static getTrackingCompaniesPath() {
        return '/v1/public/tracking-companies';
    }

    getTrackingCompanies(params){
        return this.shoploMultiClient.get(TrackingResource.getTrackingCompaniesPath(), params);
    }
}

module.exports = TrackingResource;
