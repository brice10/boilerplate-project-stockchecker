'use strict';

const Stock = require('../collections/Stock');

/**
 * A king of interface made to implement all Basics operations 
 * on Stocks in database
 */
class StockRepository {
    static model = new Stock()._model;

    constructor() { }

    async find(filter) {
        return await StockRepository.model.find(filter);
    }

    async create(item) {
        return await (new StockRepository.model(item)).save();
    }

    async update(item) {
        item.markModified('likes');
        return await (new StockRepository.model(item)).save();
    }

    async findBySymbol(_symbol) {
        return await StockRepository.model.findOne({ symbol: _symbol }).exec();
    }

    async deleteAll() {
        return await StockRepository.model.deleteMany({});
    }

}

module.exports = StockRepository;