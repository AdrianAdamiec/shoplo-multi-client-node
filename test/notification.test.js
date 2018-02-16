describe('Shoplo Multi notification resource', () => {
    'use strict';

    const expect = require('chai').expect;

    const fixtures = require('./fixtures/notification');
    const base = require('./base');
    const NotificationResource = require('../resources/notification');

    const shoploMulti = base.shoploMulti;
    const shopMultiClient = base.shoploMultiClient;
    const notificationResource = new NotificationResource(shopMultiClient);

    it('should return proper notification path', () => {
        expect(NotificationResource.getNotificationPath()).to.equal('/v1/public/notifications');
        expect(NotificationResource.getNotificationPath(4)).to.equal('/v1/public/notifications/4');
        expect(NotificationResource.getTodosNotificationPath()).to.equal('/v1/public/notifications/todos');
    });

    it('gets a notifications list', () => {
        const output = fixtures.res.list;

        shoploMulti
            .get('/v1/public/notifications')
            .reply(200, output);

        return notificationResource.getNotifications()
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets a notification', () => {
        const output = fixtures.res.get;

        shoploMulti
            .get('/v1/public/notifications/4')
            .reply(200, output);

        return notificationResource.getNotifications(4)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets a todos notifications list', () => {
        const output = fixtures.res.todos_list;

        shoploMulti
            .get('/v1/public/notifications/todos')
            .reply(200, output);

        return notificationResource.getTodosNotifications()
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });
});
