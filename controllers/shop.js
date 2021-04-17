const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    //res.sendFile(path.join(__dirname, '../','views', 'shop.html'));
    //console.log('shop.js', adminData.products);
    //const products = adminData.products;
    //res.sendFile(path.join(rootDir,'views', 'shop.html'));

    // whit pug
    //res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' });
    Product.fetchAll(products => {
        res.render('shop/product-list', { 
            prods: products, 
            pageTitle: 'All Products', 
            path: '/products'
        });
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', { 
            product: product, 
            pageTitle: product.title, 
            path: '/products'
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', { 
            prods: products, 
            pageTitle: 'Shop', 
            path: '/'
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart', 
        path: '/cart'
    })
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders', 
        path: '/orders'
    })
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout', 
        path: '/checkout'
    })
};