describe('Shoplo Multi client', () => {
    'use strict';

    const expect = require('chai').expect;
    const base = require('./base');
    const ShoploMulti = require('..');

    const clientKey     = base.config.clientKey;
    const clientSecret  = base.config.clientSecret;

    const fixtures = require('./fixtures/account');
    const shopMultiClient = base.shoploMultiClient;
    const shopMulti = base.shoploMulti;

    it('throws an error when required options missing or invalid', () => {

        expect(() => new ShoploMulti()).to.throw(Error, 'Mising app configuration');
        expect(() => new ShoploMulti({})).to.throw(Error, 'Must provide client key');
        expect(() => new ShoploMulti({ clientKey })).to.throw(Error, 'Must provide client secret');
        expect(() => new ShoploMulti({ clientKey, clientSecret })).to.throw(Error, 'Must provide callback url');
    });

    it('should override api host from config', () => {

        const shoploMultiTest = new ShoploMulti(base.config);

        expect(shoploMultiTest.apiHost).to.not.equal('api.shoplo.com');
    });

    it('should set access and secret token when passed in config', () => {
        const shoploMultiTest = new ShoploMulti(base.config);

        expect(shoploMultiTest.client).to.be.an('object');
    });

    it('should return authorize url', () => {
        const shoploMultiTest = new ShoploMulti(base.config);

        expect(shoploMultiTest.getAuthorizeUrl()).to.contains('https://api.shoplo.io/oauth/v2/auth?client_id=clientKey&redirect_uri=callbackUrl&scope=scope_read_order%20scope_write_order%20scope_read_customer%20scope_write_customer%20scope_read_product%20scope_write_product&response_type=code&state=');
    });

    it('should return account data', () => {
        const output = fixtures.res.get;

        shopMulti
            .get('/v1/public/me')
            .reply(200, output);

        return shopMultiClient.getAccount()
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('should generate random state', () => {

        const state = ShoploMulti.generateState();
        expect(state).to.be.a('string');
        expect(ShoploMulti.generateState()).to.not.equal(state);
    });
});
