describe('Shoplo Multi tracking resource', () => {
    'use strict';

    const expect = require('chai').expect;

    const fixtures = require('./fixtures/tracking');
    const base = require('./base');
    const TrackingResource = require('../resources/tracking');

    const shoploMulti = base.shoploMulti;
    const shopMultiClient = base.shoploMultiClient;
    const trackingResource = new TrackingResource(shopMultiClient);

    it('should return proper tracking path', () => {
        expect(TrackingResource.getTrackingCompaniesPath()).to.equal('/v1/public/tracking-companies');
    });

    it('gets a tracking companies list', () => {
        const output = fixtures.res.list;

        shoploMulti
            .get('/v1/public/tracking-companies')
            .reply(200, output);

        return trackingResource.getTrackingCompanies()
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });
});
