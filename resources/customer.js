'use strict';

class CustomerResource {

    /**
     * Create a CustomerResource instance.
     *
     * @param {Object} shoploMultiClient
     */
    constructor(shoploMultiClient) {
        this.shoploMultiClient = shoploMultiClient;
    }

    static getCustomerPath(id) {
        if (id) {
            return `/v1/public/customers/${id}`;
        }
        return '/v1/public/customers';
    }

    getCustomers(id, params){
        return this.shoploMultiClient.get(CustomerResource.getCustomerPath(id), params);
    }

    createCustomer(customer){
        return this.shoploMultiClient.create(CustomerResource.getCustomerPath(), customer);
    }

    updateCustomer(id, customer){
        return this.shoploMultiClient.update(CustomerResource.getCustomerPath(id), customer);
    }
}

module.exports = CustomerResource;
