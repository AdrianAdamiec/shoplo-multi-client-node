describe('Shoplo Multi user resource', () => {
    'use strict';

    const expect = require('chai').expect;

    const fixtures = require('./fixtures/user');
    const base = require('./base');
    const UserResource = require('../resources/user');

    const shoploMulti = base.shoploMulti;
    const shopMultiClient = base.shoploMultiClient;
    const userResource = new UserResource(shopMultiClient);

    it('should return proper user password reset path', () => {
        expect(UserResource.getUserPassResetPath()).to.equal('/v1/user/reset-password-request');
    });

    it('resets user password', () => {
        const input = fixtures.req.post;

        shoploMulti
            .post('/v1/user/reset-password-request', input)
            .reply(200, {});

        return userResource.resetPassword(input)
            .then(rsp => expect(rsp.data).to.deep.equal({}));
    });
});
