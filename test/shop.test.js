describe('Shoplo Multi shop resource', () => {
    'use strict';

    const expect = require('chai').expect;

    const fixtures = require('./fixtures/shop');
    const base = require('./base');
    const ShopResource = require('../resources/shop');

    const shoploMulti = base.shoploMulti;
    const shopMultiClient = base.shoploMultiClient;
    const shopResource = new ShopResource(shopMultiClient);

    it('should return proper channel path', () => {
        expect(ShopResource.getShopPath()).to.equal('/v1/public/shop');
    });

    it('patch shop', () => {
        const output = fixtures.res.patch;

        shoploMulti
            .patch('/v1/public/shop')
            .reply(200, output);

        return shopResource.patchShop()
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });
});
