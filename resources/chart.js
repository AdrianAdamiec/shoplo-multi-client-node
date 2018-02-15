'use strict';

class ChartResource {

    /**
     * Create a ChartResource instance.
     *
     * @param {Object} shoploMultiClient
     */
    constructor(shoploMultiClient) {
        this.shoploMultiClient = shoploMultiClient;
    }

    static getChartLineIncomePath() {
        return '/v1/public/chart/shop-channel/line-income';
    }

    static getChartPieIncomePath() {
        return '/v1/public/chart/shop-channel/pie-income';
    }

    static getChartTopProductsPath(shopChannelId) {
        return `/v1/public/chart/shop-channel/${shopChannelId}/top-products`;
    }

    static getChartTopReferralsPath(shopChannelId) {
        return `/v1/public/chart/shop-channel/${shopChannelId}/top-referrals`;
    }

    static getChartTrendsPath(shopChannelId) {
        return `/v1/public/chart/shop-channel/${shopChannelId}/trends`;
    }

    getDashboardChartLine(){
        return this.shoploMultiClient.get(ChartResource.getChartLineIncomePath());
    }

    getDashboardChartPie(){
        return this.shoploMultiClient.get(ChartResource.getChartPieIncomePath());
    }

    getTopProductsChartData(shopChannelId){
        return this.shoploMultiClient.get(ChartResource.getChartTopProductsPath(shopChannelId));
    }

    getTopReferralsChartData(shopChannelId){
        return this.shoploMultiClient.get(ChartResource.getChartTopReferralsPath(shopChannelId));
    }

    getTrendsChartData(shopChannelId){
        return this.shoploMultiClient.get(ChartResource.getChartTrendsPath(shopChannelId));
    }
}

module.exports = ChartResource;
