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
        //console.log('getProductsFromFile err :', err);
        //console.log('getProductsFromFile fileContent :', fileContent);
        err ? cb([]) : cb(JSON.parse(fileContent));
    });
};
module.exports = class Product {
    constructor(title){
        this.title = title;
    }

    save(){
        getProductsFromFile(products => {
            products.push(this);
            //console.log('getProductsFromFile product: ', product);
            //console.log('getProductsFromFile JSON.stringify(products) :', JSON.stringify(products));
            fs.writeFile(product, JSON.stringify(products), err => {
                console.log(err);
            });
        });
        //fs.readFile(product, (err, fileContent) => {});
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }
}