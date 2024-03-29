const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }
    save() {
        const db = getDb();
        let dbOp;
        if (this._id){
            // update de product
            dbOp = db
                .collection('products')
                .updateOne({_id: this._id}, { $set: this });
        }else{
            dbOp = db
                .collection('products')
                .insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
                console.log('Created product');
            })
            .catch( err => {
                console.log(err);
            });
    }
    static fetchAll(){
        const db = getDb();
        return db
            .collection('products')
            .find()
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(id){
        const db = getDb();
        return db
            .collection('products')
            .find({ _id: new mongodb.ObjectId(id)})
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static deleteById(prodId){
        const db = getDb();
        db.collection('products')
        .deleteOne({_id: new mongodb.ObjectId(prodId)})
        .then(result => {
            console.log('Deleted Product started!!!');
            console.log(result);
            console.log('Deleted Product ended!!!');
        })
        .catch(err => {
            console.log(err);
        });
    }

}

module.exports = Product;