describe('Shoplo Multi product resource', () => {
    'use strict';

    // const qs = require('qs');
    const expect = require('chai').expect;

    const fixtures = require('./fixtures/product');
    const base = require('./base');
    const ProductResource = require('../resources/product');

    const shoploMulti = base.shoploMulti;
    const shopMultiClient = base.shoploMultiClient;
    const productResource = new ProductResource(shopMultiClient);

    it('gets a products list', () => {
        const output = fixtures.res.list;

        shoploMulti
            .get('/v1/public/products')
            .reply(200, output);

        return productResource.getProducts()
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });
});
