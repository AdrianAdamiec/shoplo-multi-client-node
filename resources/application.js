'use strict';

class ApplicationResource {

    /**
     * Create a ApplicationResource instance.
     *
     * @param {Object} shoploMultiClient
     */
    constructor(shoploMultiClient) {
        this.shoploMultiClient = shoploMultiClient;
    }

    static getApplicationPath() {
        return '/v1/public/applications/installed';
    }

    getApplications(params){
        return this.shoploMultiClient.get(ApplicationResource.getApplicationPath(), params);
    }
}

module.exports = ApplicationResource;
