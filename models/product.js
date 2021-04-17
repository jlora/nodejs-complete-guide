//const products = [];
const fs = require('fs');
const path = require('path');
const product = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'products.json'
);
const getProductsFromFile = cb => {
    fs.readFile(product, (err, fileContent) => {
        err ? cb([]) : cb(JSON.parse(fileContent));
    });
};
module.exports = class Product {
    constructor(title, imageUrl, description, price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(product, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }
}