'use strict';

const ShoploMultiClient = require('..');
const nock = require('nock');

const config = {
    callbackUrl: 'callbackUrl',
    clientKey: 'clientKey',
    clientSecret: 'clientSecret',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    apiHost: 'api.shoplo.io',
    scope: ['scope_read_order', 'scope_write_order', 'scope_read_customer', 'scope_write_customer', 'scope_read_product', 'scope_write_product']
};

const shoploMultiClient = new ShoploMultiClient(config);
const shoploMulti = nock(`https://${config.apiHost}`);

module.exports = {
    shoploMulti,
    shoploMultiClient,
    config
};
