'use strict';

class ChannelResource {

    /**
     * Create a ChannelResource instance.
     *
     * @param {Object} shoploMultiClient
     */
    constructor(shoploMultiClient) {
        this.shoploMultiClient = shoploMultiClient;
    }

    static getChannelPath() {
        return '/v1/public/channels';
    }

    getChannels(params){
        return this.shoploMultiClient.get(ChannelResource.getChannelPath(), params);
    }
}

module.exports = ChannelResource;
