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
        expect(OrderResource.getOrderFulfillmentPath(2, null)).to.equal('/v1/public/orders/2/fulfillments');
        expect(OrderResource.getOrderFulfillmentPath(2, 16)).to.equal('/v1/public/orders/2/fulfillments/16');
        expect(OrderResource.getOrderTimelinePath(2)).to.equal('/v1/public/orders/2/timeline');
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

    it('gets a order timeline', () => {
        const output = fixtures.res.get_timeline;

        shoploMulti
            .get('/v1/public/orders/18/timeline')
            .reply(200, output);

        return orderResource.getOrderTimeline(18)
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

    it('deletes a order', () => {

        shoploMulti
            .delete('/v1/public/orders/18')
            .reply(200, []);

        return orderResource.deleteOrder(18)
            .then(rsp => expect(rsp.data).to.deep.equal([]));
    });

    it('creates a order fulfillment', () => {
        const input = fixtures.req.create_fulfillment;
        const output = fixtures.res.create_fulfillment;

        shoploMulti
            .post('/v1/public/orders/18/fulfillments', input)
            .reply(204, output);

        return orderResource.createOrderFulfillment(18, input)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('updates a order fulfillment', () => {
        const input = fixtures.req.update_fulfillment;
        const output = fixtures.res.update_fulfillment;

        shoploMulti
            .put('/v1/public/orders/18/fulfillments/112', input)
            .reply(204, output);

        return orderResource.updateOrderFulfillment(18, 112, input)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('deletes a order fulfillment', () => {

        shoploMulti
            .delete('/v1/public/orders/18/fulfillments/112')
            .reply(200, []);

        return orderResource.deleteOrderFulfillment(18, 112)
            .then(rsp => expect(rsp.data).to.deep.equal([]));
    });
});
