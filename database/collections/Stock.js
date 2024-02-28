'use strict';

const mongoose = require('mongoose');

// MongoDB collection for Stocks
class Stock {
    static _model;

    constructor(collectionName) {
        this._collectionName = collectionName || 'Stock';
        this._model = mongoose.model(this._collectionName, this._schema);
    }

    _schema = new mongoose.Schema({
        symbol: {
            type: String,
            require: true
        },
        likes: {
            type: [String],
            default: []
        },
    })
}

module.exports = Stock;