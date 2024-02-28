'use strict';

require('dotenv').config();
const fetch = require('node-fetch');

// A sample helper class to fetch stock in stock API
class StockApi {

    constructor(){}

    static async getStock(stock) {
        const response = await fetch(
            `${process.env.STOCK_API_URL}${stock.toLowerCase()}/quote`
        );
        const { symbol, latestPrice } = await response.json();
        return { symbol, latestPrice };
    }

}

module.exports = StockApi;