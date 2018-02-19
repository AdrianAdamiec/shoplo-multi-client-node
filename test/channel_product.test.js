describe('Shoplo Multi channel product resource', () => {
    'use strict';

    const expect = require('chai').expect;

    const fixtures = require('./fixtures/channel_product');
    const base = require('./base');
    const ChannelProductResource = require('../resources/channel_product');

    const shoploMulti = base.shoploMulti;
    const shopMultiClient = base.shoploMultiClient;
    const channelProductResource = new ChannelProductResource(shopMultiClient);

    it('should return proper product path', () => {
        expect(ChannelProductResource.getChannelProductPath(2266)).to.equal('/v1/public/channel/2266/products');
        expect(ChannelProductResource.getChannelProductPath(2266, 12)).to.equal('/v1/public/channel/2266/products/12');
        expect(ChannelProductResource.getChannelProductDetailsPath(2266, 12)).to.equal('/v1/public/channel/2266/products/12/channel-details');
        expect(ChannelProductResource.getChannelProductVariantsPath(10)).to.equal('/v1/public/channel/products/10/variants');
        expect(ChannelProductResource.getChannelProductVariantsPath(10, 10)).to.equal('/v1/public/channel/products/10/variants/10');
        expect(ChannelProductResource.getChannelProductImagesPath(10)).to.equal('/v1/public/channel/products/10/images');
        expect(ChannelProductResource.getChannelProductImagesPath(10, 56)).to.equal('/v1/public/channel/products/10/images/56');
        expect(ChannelProductResource.getChannelProductImageMovePath(10)).to.equal('/v1/public/channel/products/10/images/product-image');
    });

    it('gets channel products list', () => {
        const output = fixtures.res.list;

        shoploMulti
            .get('/v1/public/channel/2266/products')
            .reply(200, output);

        return channelProductResource.getChannelProducts(2266)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets channel product', () => {
        const output = fixtures.res.get;

        shoploMulti
            .get('/v1/public/channel/2266/products/10')
            .reply(200, output);

        return channelProductResource.getChannelProducts(2266, 10)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('deletes a channel product', () => {
        const output = {};

        shoploMulti
            .delete('/v1/public/channel/2266/products/10')
            .reply(200, output);

        return channelProductResource.deleteChannelProduct(2266, 10)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('updates a channel product details', () => {
        const input = fixtures.req.update_details;
        const output = {};

        shoploMulti
            .patch('/v1/public/channel/2266/products/10/channel-details', input)
            .reply(200, output);

        return channelProductResource.patchChannelProductDetails(2266, 10, input)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('updates a channel product details data', () => {
        const input = fixtures.req.update_details_data;
        const output = {};

        shoploMulti
            .put('/v1/public/channel/2266/products/10/channel-details', input)
            .reply(200, output);

        return channelProductResource.updateChannelProductDetails(2266, 10, input)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('creates a channel product image', () => {
        const input = fixtures.req.create_image;
        const output = fixtures.res.create_image;

        shoploMulti
            .post('/v1/public/channel/products/10/images', input)
            .reply(200, output);

        return channelProductResource.createChannelProductImage(10, input)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('deletes a channel product image', () => {
        const output = {};

        shoploMulti
            .delete('/v1/public/channel/products/10/images/56')
            .reply(200, output);

        return channelProductResource.deleteChannelProductImage(10, 56)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('deletes a channel product variant', () => {
        const output = {};

        shoploMulti
            .delete('/v1/public/channel/products/22/variants/44')
            .reply(200, output);

        return channelProductResource.deleteChannelProductVariant(22, 44)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });
});
