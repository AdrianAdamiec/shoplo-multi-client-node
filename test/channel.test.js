describe('Shoplo Multi channel resource', () => {
    'use strict';

    const expect = require('chai').expect;

    const fixtures = require('./fixtures/channel');
    const base = require('./base');
    const ChannelResource = require('../resources/channel');

    const shoploMulti = base.shoploMulti;
    const shopMultiClient = base.shoploMultiClient;
    const channelResource = new ChannelResource(shopMultiClient);

    it('should return proper channel path', () => {
        expect(ChannelResource.getChannelPath()).to.equal('/v1/public/channels');
    });

    it('gets a channels list', () => {
        const output = fixtures.res.list;

        shoploMulti
            .get('/v1/public/channels')
            .reply(200, output);

        return channelResource.getChannels()
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });
});
