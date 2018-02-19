describe('Shoplo Multi search resource', () => {
    'use strict';

    const expect = require('chai').expect;

    const fixtures = require('./fixtures/search');
    const base = require('./base');
    const SearchResource = require('../resources/search');

    const shoploMulti = base.shoploMulti;
    const shopMultiClient = base.shoploMultiClient;
    const searchResource = new SearchResource(shopMultiClient);

    it('should return proper search path', () => {
        expect(SearchResource.getSearchPath()).to.equal('/v1/public/search');
        expect(SearchResource.getSavedQueriesPath()).to.equal('/v1/public/search/saved-queries');
    });

    it('gets a search result list', () => {
        const output = fixtures.res.list;

        shoploMulti
            .get('/v1/public/search')
            .reply(200, output);

        return searchResource.search()
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets a search queries list', () => {
        const output = fixtures.res.list_queries;

        shoploMulti
            .get('/v1/public/search/saved-queries')
            .reply(200, output);

        return searchResource.getSavedQueries()
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('creates a search query', () => {
        const input = fixtures.req.create_query;
        const output = {};

        shoploMulti
            .post('/v1/public/search/saved-queries', input)
            .reply(200, output);

        return searchResource.createSavedQuery(input)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });
});
