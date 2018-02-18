describe('Shoplo Multi product resource', () => {
    'use strict';

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
        expect(ProductResource.getProductImagesPath(2, null)).to.equal('/v1/public/products/2/images');
        expect(ProductResource.getProductImagesPath(2, 12)).to.equal('/v1/public/products/2/images/12');
        expect(ProductResource.getProductVariantsPath(2, null)).to.equal('/v1/public/products/2/variants');
        expect(ProductResource.getProductVariantsPath(2, 44)).to.equal('/v1/public/products/2/variants/44');
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

    it('updates a product', () => {
        const input = fixtures.req.update;
        const output = fixtures.res.update;

        shoploMulti
            .put('/v1/public/products/10', input)
            .reply(200, output);

        return productResource.updateProduct(10, input)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets product images', () => {
        const output = fixtures.res.list_images;

        shoploMulti
            .get('/v1/public/products/10/images')
            .reply(200, output);

        return productResource.getProductImages(10, null)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('creates product image', () => {
        const input = fixtures.req.create_image;
        const output = fixtures.res.create_image;

        shoploMulti
            .post('/v1/public/products/10/images', input)
            .reply(201, output);

        return productResource.createProductImage(10, input)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('deletes product image', () => {
        const output = {};

        shoploMulti
            .delete('/v1/public/products/10/images/12')
            .reply(201, output);

        return productResource.deleteProductImage(10, 12)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets product variants', () => {
        const output = fixtures.res.list_variants;

        shoploMulti
            .get('/v1/public/products/10/variants')
            .reply(200, output);

        return productResource.getProductVariants(10, null)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets a product variant', () => {
        const output = fixtures.res.get_variant;

        shoploMulti
            .get('/v1/public/products/10/variants/10')
            .reply(200, output);

        return productResource.getProductVariants(10, 10)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('updates product variant', () => {
        const input = fixtures.req.update_variant;
        const output = {};

        shoploMulti
            .put('/v1/public/products/10/variants/10', input)
            .reply(200, output);

        return productResource.updateProductVariant(10, 10, input)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('creates product variant', () => {
        const input = fixtures.req.create_variant;
        const output = {};

        shoploMulti
            .post('/v1/public/products/10/variants', input)
            .reply(200, output);

        return productResource.createProductVariant(10, input)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('deletes product variant', () => {
        const output = {};

        shoploMulti
            .delete('/v1/public/products/10/variants/14')
            .reply(200, output);

        return productResource.deleteProductVariant(10, 14)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

});
