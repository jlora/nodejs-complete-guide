//const products = [];
const fs = require('fs');
const path = require('path');
const Cart = require('./cart');
const productFile = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'products.json'
);
const getProductsFromFile = cb => {
    fs.readFile(productFile, (err, fileContent) => {
        err ? cb([]) : cb(JSON.parse(fileContent));
    });
};
module.exports = class Product {
    constructor(id, title, imageUrl, description, price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        getProductsFromFile(products => {
            if (this.id){
                const existingProductIndex = products.findIndex(item => item.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(productFile, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            }else{
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(productFile, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id){
        getProductsFromFile(products => {
            const product = products.find(item => item.id === id);
            const updateProducts = products.filter(item => item.id !== id);
            fs.writeFile(productFile, JSON.stringify(updateProducts) , err => {
                if (!err){
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(item => item.id === id);
            cb(product);
        });
    }
}