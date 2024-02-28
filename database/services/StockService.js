'use strict';

const StockRepository = require('../repositories/StockRepository');

/**
 * A king of interface made to implement all advanced operations 
 * on Stocks before saving them in database
 */
class StockService {

    StockRepository;

    constructor() {
        this.StockRepository = new StockRepository();
    }

    async find(filter) {
        return await this.StockRepository.find(filter);
    }

    async create(requestBody) {
        return await this.StockRepository.create(requestBody)
    }

    async save(stockSymbol, like, ip) {
        
        let stockFound = await this.StockRepository.findBySymbol(stockSymbol);
        if (!stockFound) 
            return await this.create({ symbol: stockSymbol, likes: like? [ip]: ip });

        if (like && !stockFound.likes.includes(ip)) {
            stockFound.likes.push(ip);
            console.log('stockFound: ', stockFound);
            return await stockFound.save();
        }
        return stockFound;
    }

    async deleteAll() {
        await this.StockRepository.deleteAll();
    }

}

module.exports = StockService;