[![Build Status](https://travis-ci.org/AdrianAdamiec/shoplo-multi-client-node.svg?branch=master)](https://travis-ci.org/AdrianAdamiec/shoplo-multi-client-node)
[![Coverage Status](https://coveralls.io/repos/github/AdrianAdamiec/shoplo-multi-client-node/badge.svg?branch=master)](https://coveralls.io/github/AdrianAdamiec/shoplo-multi-client-node?branch=master)
[![dependencies Status](https://david-dm.org/AdrianAdamiec/shoplo-multi-client-node/status.svg)](https://david-dm.org/AdrianAdamiec/shoplo-multi-client-node)

# Shoplo Multi API node Client 

This sdk enables node developers to communicate with Shoplo Multi API with an oauth 2 authentication. 
[More detailed info about api](http://api.shoplo.io/api/doc/public)

## Requirements

* node (6, 8 or 9)

## Installation

```
npm install --save shoplo-multi-client
```

## Resources

- application
- category
- channel
- channel_productstomer
- chart
- customer
- form
- notification
- order
- product
- search
- shop
- store
- tracking
- user


## Example

**Authentication using oauth 1.**
```js
const ShoploMultiClient = require('shoplo-multi-client');
const session = require('express-session');
const express = require('express');

const config = {
    "callbackUrl": "http://localhost:8080/callback",
    "clientKey": "CLIENT_KEY",
    "clientSecret": "CLIENT_SECRET",
    "scope": ['scope_read_order', 'scope_write_order', 'scope_read_customer', 'scope_write_customer', 'scope_read_product', 'scope_write_product']
};

const shoploMultiClient = new ShoploMultiClient(config);

const app = express();
app.use(session({
    secret: 'SOME_SECRET',
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req, res) => {

    res.redirect(shoploMultiClient.getAuthorizeUrl());
});

app.get('/callback', async (req, res) => {

    const rsp = await shoploMultiClient.getAccesToken(req.originalUrl);
    console.log(rsp.accessToken);
    res.send(rsp.accessToken);
});

app.get('/me', async (req, res) => {

    const rsp = await shoploMultiClient.getAccount();
    res.send(rsp.data);
});

app.listen(8080, () => console.log('Server is running'));
```

**Orders resource.**

```js
const config = {
    "callbackUrl": "http://localhost:8080/callback",
    "clientKey": "CLIENT_KEY",
    "clientSecret": "SECRET_KEY",
    "scope": ['scope_read_order', 'scope_write_order', 'scope_read_customer', 'scope_write_customer', 'scope_read_product', 'scope_write_product'],
    "accessToken": 'ACCESS_TOKEN',
    "refreshToken": 'REFRESH_TOKEN'
};

const shoploMultiClient = new ShoploMultiClient(config);

app.get('/orders', async (req, res) => {

    const orderResource = new OrderResource(shoploMultiClient);
    
    const rsp = await orderResource.getOrders();
    const rsp = await orderResource.getOrders(18, { "with": ['order.items', 'order.fulfillments', 'order.addresses'] });
    const rsp = await orderResource.getOrderTimeline(18);
    
    const updateOrder = {
        "note": "lorem ipsum dolor sit emet",
        "financial_status": "paid"
    };
    const rsp = await orderResource.updateOrder(18, updateOrder);

    const orderFulfillment = {
        "tracking_company": "DPD",
        "tracking_numbers": ["123456789"],
        "tracking_urls": ["https://tracktrace.dpd.com.pl/EN/parcelDetails?typ=1&p1=123456789"],
        "tracking_data": [],
        "status": "fulfilled"
    };
    
    const rsp = await orderResource.createOrderFulfillment(18, orderFulfillment);
    const rsp = await orderResource.updateOrderFulfillment(18, 112, orderFulfillment);
    const rsp = await orderResource.deleteOrderFulfillment(18, 112);

    res.send(rsp.data);
});
```

**Channel Products resource.**

```js
const config = {
    "callbackUrl": "http://localhost:8080/callback",
    "clientKey": "CLIENT_KEY",
    "clientSecret": "SECRET_KEY",
    "scope": ['scope_read_order', 'scope_write_order', 'scope_read_customer', 'scope_write_customer', 'scope_read_product', 'scope_write_product'],
    "accessToken": 'ACCESS_TOKEN',
    "refreshToken": 'REFRESH_TOKEN'
};
const shoploMultiClient = new ShoploMultiClient(config);

app.get('/channel-products', async (req, res) => {
    const channelProductResource = new ChannelProductResource(shoploMultiClient);
    const rsp = await channelProductResource.getChannelProducts(2266);

    const details = {
        "title":"Bulb lamp graphite",
        "description":"lorem ipsum"
    };
    
    const rsp = await channelProductResource.patchChannelProductDetails(2266, 10, details);

    const detailsData = {
        "title": "Bulb lamp metal",
        "data": {
            "short_description":"lorem ipsum",
            "url":"bulb-lamp-graphite",
            "width":"5",
            "height":"5",
            "depth":"5",
            "diameter":"5",
            "tax":"23",
            "vendor":null,
            "tags":[
                "test"
            ],
            "metadata":{
                "meta_title":null,
                "meta_description":null,
                "meta_keywords":null
            }
        }
    };
    
    const rsp = await channelProductResource.updateChannelProductDetails(2266, 10, detailsData);
    
    const image = {
        "src": "https://assets.shoplo.io/webpage/images/brandhub/logo@2.png",
        "position": "2"
    };

    const rsp = await channelProductResource.createChannelProductImage(10, image);

    res.send(rsp.data);
});
```