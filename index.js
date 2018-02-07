const assert = require('assert');

class ShoploMultiClient{

    /**
     * Create a ShoploMultiClient instance.
     *
     * @param {Object} options Configuration options
     * @param {String} options.callbackUrl The callback URL for the Oauth1 flow
     * @param {String} options.clientKey The API Key for the app
     * @param {String} options.clientSecret The Shared Secret for the app
     * @param {Number} [options.timeout] The request timeout
     */
    constructor(options) {
        assert(options, 'Mising app configuration');
        assert(options.clientKey, 'Must provide client key');
        assert(options.clientSecret, 'Must provide client secret');
        assert(options.callbackUrl, 'Must provide callback url');

        this.clientKey = options.clientKey;
        this.clientSecret = options.clientSecret;
        this.callbackUrl = options.callbackUrl;
        this.apiHost = options.apiHost || 'api.shoplo.io';

        if (options.accessToken && options.secretToken) {

            this.accessToken = options.accessToken;
            this.secretToken = options.secretToken;
        }
    }
}

module.exports = ShoploMultiClient;
