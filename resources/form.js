'use strict';

class FormResource {

    /**
     * Create a FormResource instance.
     *
     * @param {Object} shoploMultiClient
     */
    constructor(shoploMultiClient) {
        this.shoploMultiClient = shoploMultiClient;
    }

    static getFormPath(shopChannelId, productCHannelId) {
        return `/v1/public/form/channel/${shopChannelId}/products/${productCHannelId}/channel-details`;
    }

    getFormFields(shopChannelId, productCHannelId, params){
        return this.shoploMultiClient.get(FormResource.getFormPath(shopChannelId, productCHannelId), params);
    }
}

module.exports = FormResource;
