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

    it('should return proper product path', () => {
        expect(ProductResource.getProductPath()).to.equal('/v1/public/products');
        expect(ProductResource.getProductPath(2)).to.equal('/v1/public/products/2');
    });

    it('gets a products list', () => {
        const output = fixtures.res.list;

        shoploMulti
            .get('/v1/public/products')
            .reply(200, output);

        return productResource.getProducts()
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets a product', () => {
        const output = fixtures.res.get;

        shoploMulti
            .get('/v1/public/products/10')
            .reply(200, output);

        return productResource.getProducts(10)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });
});
