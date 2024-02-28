const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

const StockRepository = require('../database/repositories/StockRepository');

chai.use(chaiHttp);

suite('Functional Tests', function () {

    this.timeout(10000);

    const CollectionRepository = new StockRepository();

    this.beforeEach(async function () {
        await CollectionRepository.deleteAll();
    });

    this.afterEach(async function () {
        await CollectionRepository.deleteAll();
    });

    test('Viewing one stock: GET request to /api/stock-prices/', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/stock-prices?stock=Tsla')
            .end(function (err, res) {
                assert.equal(res.status, 200);

                assert.isOk(res.body);
                assert.property(res.body, 'stockData');
                assert.property(res.body.stockData, 'stock');
                assert.equal(res.body.stockData.stock, 'TSLA');
                assert.property(res.body.stockData, 'price');
                assert.isNumber(res.body.stockData.price);

                done();
            });
    });

    test('Viewing one stock and liking it: GET request to /api/stock-prices/', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/stock-prices?stock=GOLD&like=true')
            .end(function (err, res) {
                assert.equal(res.status, 200);

                assert.isOk(res.body);
                assert.property(res.body, 'stockData')
                const ticker = res.body.stockData;
                assert.isNumber(ticker.price);
                assert.isNumber(ticker.likes);
                assert.isString(ticker.stock);
                assert.equal(ticker.stock, 'GOLD');
                assert.equal(ticker.likes, 1);

                done();
            })
    });

    test('Viewing the same stock and liking it again: GET request to /api/stock-prices/', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/stock-prices?stock=GOLD&like=true')
            .end(function (err, res) {
                assert.equal(res.status, 200);

                assert.isOk(res.body);
                assert.property(res.body, 'stockData')
                const ticker = res.body.stockData;
                assert.isNumber(ticker.price);
                assert.isNumber(ticker.likes);
                assert.isString(ticker.stock);
                assert.equal(ticker.stock, 'GOLD');
                assert.equal(ticker.likes, 1);

                done();
            })
    });

    test('Viewing two stocks: GET request to /api/stock-prices/', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/stock-prices?stock=AMZN&stock=T')
            .end(function (err, res) {
                assert.equal(res.status, 200);

                assert.isOk(res.body);
                const ticker = res.body;
                assert.isArray(ticker);
                assert.equal(ticker.length, 2);
                assert.property(ticker[0], 'stock');
                assert.property(ticker[1], 'stock');
                assert.equal(ticker[0].stock, 'AMZN');
                assert.equal(ticker[1].stock, 'T');
                assert.property(ticker[0], 'rel_likes');
                assert.property(ticker[1], 'rel_likes');

                done();
            });
    });

    test('Viewing two stocks and liking them: GET request to /api/stock-prices/', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/stock-prices?stock=AMZN&stock=T&like=true')
            .end(function (err, res) {
                assert.equal(res.status, 200);

                assert.isOk(res.body);
                const ticker = res.body;
                assert.isArray(ticker);
                assert.equal(ticker.length, 2);
                assert.property(ticker[0], 'stock');
                assert.property(ticker[1], 'stock');
                assert.equal(ticker[0].stock, 'AMZN');
                assert.equal(ticker[1].stock, 'T');
                assert.property(ticker[0], 'rel_likes');
                assert.property(ticker[1], 'rel_likes');

                done();
            });
    });

});
