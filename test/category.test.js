describe('Shoplo Multi category resource', () => {
    'use strict';

    const expect = require('chai').expect;

    const fixtures = require('./fixtures/category');
    const base = require('./base');
    const CategoryResource = require('../resources/category');

    const shoploMulti = base.shoploMulti;
    const shopMultiClient = base.shoploMultiClient;
    const categoryResource = new CategoryResource(shopMultiClient);

    it('should return proper channel path', () => {
        expect(CategoryResource.getCategoryPath()).to.equal('/v1/public/categories');
        expect(CategoryResource.getCategoryPath(2)).to.equal('/v1/public/categories/2');
    });

    it('gets a categories list', () => {
        const output = fixtures.res.list;

        shoploMulti
            .get('/v1/public/categories')
            .reply(200, output);

        return categoryResource.getCategories()
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets a category', () => {
        const output = fixtures.res.get;

        shoploMulti
            .get('/v1/public/categories/6027')
            .reply(200, output);

        return categoryResource.getCategories(6027)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });
});
