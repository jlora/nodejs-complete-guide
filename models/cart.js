const fs = require('fs');
const path = require('path');
const cartFile = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'cart.json'
);

module.exports = class Cart {
    /*constructor() {
        this.products = [];
        this.totalPrice = 0;
    }*/

    static addProduct(id, productPrice){
        // Fetch the previous cart
        fs.readFile(cartFile, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err){
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => Find 
            const existingProductIndex = cart.products.findIndex(item => item.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add new product/ increase quantity
            if (existingProduct){
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }else{
                updatedProduct = { id: id, qty: 1};
                cart.products = [ ...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(cartFile, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }
}