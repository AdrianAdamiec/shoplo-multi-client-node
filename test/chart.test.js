describe('Shoplo Multi chart resource', () => {
    'use strict';

    const expect = require('chai').expect;

    const fixtures = require('./fixtures/chart');
    const base = require('./base');
    const ChartResource = require('../resources/chart');

    const shoploMulti = base.shoploMulti;
    const shopMultiClient = base.shoploMultiClient;
    const chartResource = new ChartResource(shopMultiClient);

    it('should return proper chart path', () => {
        expect(ChartResource.getChartPieIncomePath()).to.equal('/v1/public/chart/shop-channel/pie-income');
        expect(ChartResource.getChartLineIncomePath()).to.equal('/v1/public/chart/shop-channel/line-income');
        expect(ChartResource.getChartTopProductsPath(2266)).to.equal('/v1/public/chart/shop-channel/2266/top-products');
        expect(ChartResource.getChartTopReferralsPath(2266)).to.equal('/v1/public/chart/shop-channel/2266/top-referrals');
        expect(ChartResource.getChartTrendsPath(2266)).to.equal('/v1/public/chart/shop-channel/2266/trends');
    });

    it('gets a pie chart data', () => {
        const output = fixtures.res.pie_list;

        shoploMulti
            .get('/v1/public/chart/shop-channel/pie-income')
            .reply(200, output);

        return chartResource.getDashboardChartPie()
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets a line chart data', () => {
        const output = fixtures.res.line_list;

        shoploMulti
            .get('/v1/public/chart/shop-channel/line-income')
            .reply(200, output);

        return chartResource.getDashboardChartLine()
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets a top products chart data', () => {
        const output = fixtures.res.top_products;

        shoploMulti
            .get('/v1/public/chart/shop-channel/2266/top-products')
            .reply(200, output);

        return chartResource.getTopProductsChartData(2266)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets a top referrals chart data', () => {
        const output = fixtures.res.top_referrals;

        shoploMulti
            .get('/v1/public/chart/shop-channel/2266/top-referrals')
            .reply(200, output);

        return chartResource.getTopReferralsChartData(2266)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });

    it('gets a trends chart data', () => {
        const output = fixtures.res.trends;

        shoploMulti
            .get('/v1/public/chart/shop-channel/2266/trends')
            .reply(200, output);

        return chartResource.getTrendsChartData(2266)
            .then(rsp => expect(rsp.data).to.deep.equal(output));
    });
});
