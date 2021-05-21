const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = callback => {
    const url = 'mongodb+srv://andreslora:Nf7wqZUOQowkUBEl@cluster0.5nl6s.mongodb.net/shop?retryWrites=true&w=majority';

    MongoClient.connect(url)
    .then(client => {
        console.log('connected');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;