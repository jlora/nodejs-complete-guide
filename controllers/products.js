//const products = [];
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', { 
        pageTitle: 'Add Product', 
        path: '/admin/add-product', 
        formsCSS: true, 
        productCSS: true, 
        activeAddProduct: true 
    });
};

exports.postAddProduct = (req, res, next) => {
    //products.push({ title: req.body.title });
    //console.log(req.body);
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    //res.sendFile(path.join(__dirname, '../','views', 'shop.html'));
    //console.log('shop.js', adminData.products);
    //const products = adminData.products;
    //res.sendFile(path.join(rootDir,'views', 'shop.html'));

    // whit pug
    //res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' });
    Product.fetchAll(products => {
        res.render('shop', { 
            prods: products, 
            pageTitle: 'Shop', 
            path: '/', 
            hasProducts: products.length > 0, 
            activeShop: true, 
            productCSS: true 
        });
    });
}