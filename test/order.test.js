describe('Shoplo Multi order resource', () => {
    'use strict';

    const expect = require('chai').expect;

    const fixtures = require('./fixtures/order');
    const base = require('./base');
    const OrderResource = require('../resources/order');

    const shoploMulti = base.shoploMulti;
    const shopMultiClient = base.shoploMultiClient;
    const orderResource = new OrderResource(shopMultiClient);

    it('should return proper order path', () => {
        expect(OrderResource.getOrderPath()).to.equal('/v1/public/orders');
        expect(OrderResource.getOrderPath(2)).to.equal('/v1/public/orders/2');
    });

    it('gets a orders list', () => {
        const output = fixtures.res.list;

        shoploMulti
            .get('/v1/public/orders')
            .reply(200, output);

        return orderResource.getOrders()
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets a order', () => {
        const output = fixtures.res.get;

        shoploMulti
            .get('/v1/public/orders/18')
            .reply(200, output);

        return orderResource.getOrders(18)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('updates a order', () => {
        const input = fixtures.req.update;
        const output = fixtures.res.update;

        shoploMulti
            .put('/v1/public/orders/18', input)
            .reply(200, output);

        return orderResource.updateOrder(18, input)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });
});
