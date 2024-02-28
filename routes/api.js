'use strict';

const StockApi = require('../api/StockApi');
const StockService = require('../database/services/StockService');
const stockService = new StockService();

module.exports = function (app) {

  app.route('/api/stock-prices').get(async function (req, res) {
    const { stock, like } = req.query;

    if (Array.isArray(stock)) {
      const stockData = await Promise.all(stock.map(async (stockSymbol) => {
        const { symbol, latestPrice } = await StockApi.getStock(stockSymbol);
        const stockInfo = await stockService.save(stockSymbol, like, req.ip);

        return {
          stock: symbol,
          price: latestPrice,
          rel_likes: stockInfo.likes.length - stockInfo.likes.length
        };
      }));

      return res.json(stockData);
    }
    
    const { symbol, latestPrice } = await StockApi.getStock(stock);
    if (!symbol) {
      return res.json({ stockData: { likes: like ? 1 : 0 } });
    }

    const stockInfo = await stockService.save(symbol, like, req.ip);

    return res.json({
      stockData: {
        stock: symbol,
        price: latestPrice,
        likes: stockInfo.likes.length
      }
    });
  });

};
