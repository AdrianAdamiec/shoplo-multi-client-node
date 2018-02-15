describe('Shoplo Multi application resource', () => {
    'use strict';

    const expect = require('chai').expect;

    const fixtures = require('./fixtures/application');
    const base = require('./base');
    const ApplicationResource = require('../resources/application');

    const shoploMulti = base.shoploMulti;
    const shopMultiClient = base.shoploMultiClient;
    const applicationResource = new ApplicationResource(shopMultiClient);

    it('should return proper application path', () => {
        expect(ApplicationResource.getApplicationPath()).to.equal('/v1/public/applications/installed');
    });

    it('gets a applications list', () => {
        const output = fixtures.res.list;

        shoploMulti
            .get('/v1/public/applications/installed')
            .reply(200, output);

        return applicationResource.getApplications()
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });
});
