describe('Shoplo Multi form resource', () => {
    'use strict';

    const expect = require('chai').expect;

    const fixtures = require('./fixtures/form');
    const base = require('./base');
    const FormResource = require('../resources/form');

    const shoploMulti = base.shoploMulti;
    const shopMultiClient = base.shoploMultiClient;
    const formResource = new FormResource(shopMultiClient);

    it('should return proper form path', () => {
        expect(FormResource.getFormPath(2266, 10)).to.equal('/v1/public/form/channel/2266/products/10/channel-details');
    });

    it('gets a forms list', () => {
        const output = fixtures.res.list;

        shoploMulti
            .get('/v1/public/form/channel/2266/products/10/channel-details')
            .reply(200, output);

        return formResource.getFormFields(2266, 10)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });
});
