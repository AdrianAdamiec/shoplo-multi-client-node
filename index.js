'use strict';

const assert = require('assert');
const url = require('url');
const ClientOAuth2 = require('client-oauth2');
const axios = require('axios');

class ShoploMultiClient{

    /**
     * Create a ShoploMultiClient instance.
     *
     * @param {Object} options Configuration options
     * @param {String} options.callbackUrl The callback URL for the Oauth1 flow
     * @param {String} options.clientKey The API Key for the app
     * @param {String} options.clientSecret The Shared Secret for the app
     * @param {Array} options.scope The Shared Secret for the app
     */
    constructor(options) {
        assert(options, 'Mising app configuration');
        assert(options.clientKey, 'Must provide client key');
        assert(options.clientSecret, 'Must provide client secret');
        assert(options.callbackUrl, 'Must provide callback url');
        assert(options.scope, 'Must provide scopes');

        this.clientKey      = options.clientKey;
        this.clientSecret   = options.clientSecret;
        this.callbackUrl    = options.callbackUrl;
        this.scope          = options.scope;
        this.apiHost        = options.apiHost || 'api.shoplo.io';
        this.state          = this.generateState();
        this.timeout        = options.timeout || 15000;

        this.oauthClient = new ClientOAuth2({
            clientId: this.clientKey,
            clientSecret: this.clientSecret,
            accessTokenUri: this.getTokenUrl(),
            authorizationUri: this.getAuthUrl(),
            redirectUri: this.callbackUrl,
            scopes: this.scope,
            state: this.state
        });

        if (options.accessToken && options.refreshToken) {

            this.client = this.oauthClient.createToken(options.accessToken, options.refreshToken, 'bearer');
        }
    }

    /**
     *
     * @returns {string}
     * @private
     */
    generateState()
    {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    /**
     *
     * @returns {string}
     * @private
     */
    getEndpointUrl(path, query){

        return url.format({
            pathname: path,
            hostname: this.apiHost,
            protocol: 'https:',
            query
        });
    }

    /**
     *
     * @returns {string}
     * @private
     */
    getAuthUrl()
    {
        return this.getEndpointUrl('/oauth/v2/auth', null);
    }

    /**
     *
     * @returns {string}
     * @private
     */
    getTokenUrl()
    {
        return this.getEndpointUrl('/oauth/v2/token', null);
    }

    /**
     *
     * @returns {string}
     * @public
     */
    getAuthorizeUrl()
    {
        return this.oauthClient.code.getUri();
    }

    /**
     *
     * @returns {Promise}
     * @public
     */
    getAccesToken(originalUrl)
    {
        return this.oauthClient.code.getToken(originalUrl);
    }

    /**
     *
     * @returns {Object}
     * @private
     */
    requestOptions(path, params, method)
    {
        const url = this.getEndpointUrl(path, params);

        return this.client.sign({
            method,
            timeout: this.timeout,
            json: true,
            url
        });
    }

    get(path, params){

        const options = this.requestOptions(path, params, 'get');

        return axios.request(options);
    }

    create(path, content){

        const options = this.requestOptions(path, null, 'post');
        options.data = content;

        return axios.request(options);
    }

    update(path, content){

        const options = this.requestOptions(path, null, 'put');
        options.data = content;

        return axios.request(options);
    }

    delete(path){

        const options = this.requestOptions(path, null, 'delete');

        return axios.request(options);
    }

    getAccount()
    {
        return this.get('/v1/public/me', null);
    }
}

module.exports = ShoploMultiClient;
