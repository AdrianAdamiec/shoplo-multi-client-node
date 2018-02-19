'use strict';

class UserResource {

    /**
     * Create a UserResource instance.
     *
     * @param {Object} shoploMultiClient
     */
    constructor(shoploMultiClient) {
        this.shoploMultiClient = shoploMultiClient;
    }

    static getUserPassResetPath() {
        return '/v1/user/reset-password-request';
    }

    resetPassword(params){
        return this.shoploMultiClient.create(UserResource.getUserPassResetPath(), params);
    }
}

module.exports = UserResource;
