describe('Shoplo Multi customer resource', () => {
    'use strict';

    const expect = require('chai').expect;

    const fixtures = require('./fixtures/customer');
    const base = require('./base');
    const CustomerResource = require('../resources/customer');

    const shoploMulti = base.shoploMulti;
    const shopMultiClient = base.shoploMultiClient;
    const customerResource = new CustomerResource(shopMultiClient);

    it('should return proper customer path', () => {
        expect(CustomerResource.getCustomerPath()).to.equal('/v1/public/customers');
        expect(CustomerResource.getCustomerPath(2)).to.equal('/v1/public/customers/2');
    });

    it('gets a customers list', () => {
        const output = fixtures.res.list;

        shoploMulti
            .get('/v1/public/customers')
            .reply(200, output);

        return customerResource.getCustomers()
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets a customer', () => {
        const output = fixtures.res.get;

        shoploMulti
            .get('/v1/public/customers/2')
            .reply(200, output);

        return customerResource.getCustomers(2)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('creates a customer', () => {
        const input = fixtures.req.create;
        const output = fixtures.res.create;

        shoploMulti
            .post('/v1/public/customers', input)
            .reply(201, output);

        return customerResource.createCustomer(input)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('updates a customer', () => {
        const input = fixtures.req.update;
        const output = fixtures.res.update;

        shoploMulti
            .put('/v1/public/customers/4', input)
            .reply(201, output);

        return customerResource.updateCustomer(4, input)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });
});
