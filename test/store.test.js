describe('Shoplo Multi store resource', () => {
    'use strict';

    const expect = require('chai').expect;

    const fixtures = require('./fixtures/store');
    const base = require('./base');
    const StoreResource = require('../resources/store');

    const shoploMulti = base.shoploMulti;
    const shopMultiClient = base.shoploMultiClient;
    const storeResource = new StoreResource(shopMultiClient);

    it('should return proper channel path', () => {
        expect(StoreResource.getStoreApplicationsPath(2266)).to.equal('/v1/public/store/shoplo/2266/applications');
        expect(StoreResource.getStoreCouponsPath(2266)).to.equal('/v1/public/store/shoplo/2266/coupons');
        expect(StoreResource.getStoreLayoutsPath(2266)).to.equal('/v1/public/store/shoplo/2266/layouts');
    });

    it('gets store applications list', () => {
        const output = fixtures.res.list_applications;

        shoploMulti
            .get('/v1/public/store/shoplo/2266/applications')
            .reply(200, output);

        return storeResource.getStoreApplications(2266)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets store coupons list', () => {
        const output = fixtures.res.list_coupons;

        shoploMulti
            .get('/v1/public/store/shoplo/2266/coupons')
            .reply(200, output);

        return storeResource.getStoreCoupons(2266)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('patch store coupon', () => {
        const output = fixtures.res.patch_coupon;

        shoploMulti
            .patch('/v1/public/store/shoplo/2266/coupons/2')
            .reply(200, output);

        return storeResource.patchStoreCoupons(2266, 2)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets store layouts list', () => {
        const output = fixtures.res.list_layouts;

        shoploMulti
            .get('/v1/public/store/shoplo/2266/layouts')
            .reply(200, output);

        return storeResource.getStoreLayouts(2266)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('patch store layout', () => {
        const output = fixtures.res.patch_layout;

        shoploMulti
            .patch('/v1/public/store/shoplo/2266/layouts/2')
            .reply(200, output);

        return storeResource.patchStoreLayouts(2266, 2)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });
});
