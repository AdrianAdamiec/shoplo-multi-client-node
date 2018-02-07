const ShoploMultiClient = require('..');
const nock = require('nock');

const config = {
    callbackUrl: 'callbackUrl',
    clientKey: 'clientKey',
    clientSecret: 'clientSecret',
    accessToken: 'accessToken',
    secretToken: 'secretToken',
    apiHost: 'api.shoplo.io'
};

const shoploMultiClient = new ShoploMultiClient(config);
const shoploMulti = nock(`https://${config.apiHost}`);

module.exports = {
    shoploMulti,
    shoploMultiClient,
    config
};
