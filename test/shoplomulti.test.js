describe('Shoplo Multi', () => {
    'use strict';

    const expect = require('chai').expect;

    const base = require('./base');
    const ShoploMulti = require('..');

    const accessToken   = base.config.accessToken;
    const secretToken   = base.config.secretToken;
    const callbackUrl   = base.config.callbackUrl;
    const clientKey     = base.config.clientKey;
    const clientSecret  = base.config.clientSecret;

    describe('Client constructor validation', () => {

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

            expect(shoploMultiTest.accessToken).to.equal(accessToken);
            expect(shoploMultiTest.secretToken).to.equal(secretToken);
            expect(shoploMultiTest.callbackUrl).to.equal(callbackUrl);
        });
    });
});
