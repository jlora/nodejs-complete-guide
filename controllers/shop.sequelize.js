const Product = require('../models/product');
//const Cart = require('../models/cart');
//const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    //res.sendFile(path.join(__dirname, '../','views', 'shop.html'));
    //console.log('shop.js', adminData.products);
    //const products = adminData.products;
    //res.sendFile(path.join(rootDir,'views', 'shop.html'));

    // whit pug
    //res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' });
    //Product.fetchAll(products => {
    //    res.render('shop/product-list', { 
    //        prods: products, 
    //        pageTitle: 'All Products', 
    //        path: '/products'
    //    });
    //});
    /*Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/product-list', { 
            prods: rows, 
            pageTitle: 'All Products', 
            path: '/products'
        });
    })
    .catch(err => console.log(err));*/
    Product.findAll()
    .then(products =>{
        res.render('shop/product-list', {
            prods: products, 
            pageTitle: 'All Products', 
            path: '/products'
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then(product => {
        res.render('shop/product-detail', { 
            product: product, 
            pageTitle: product.title, 
            path: '/products'
        });
    })
    .catch(err => console.log(err));
    
    /*Product.findAll({ where: {id: prodId }})
        .then(products => {
            res.render('shop/product-detail', { 
                product: products[0], 
                pageTitle: products[0].title, 
                path: '/products'
            });
        })
        .catch(err => console.log(err));*/
    /*Product.findById(prodId)
        .then(([product]) => {
            res.render('shop/product-detail', { 
                product: product[0], 
                pageTitle: product[0].title, 
                path: '/products'
            });
        })
        .catch(err => console.log(err));*/
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products =>{
            res.render('shop/index', { 
                prods: products, 
                pageTitle: 'Shop', 
                path: '/'
            });
        })
        .catch(err => {
            console.log(err);
        })
    /*Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index', { 
                prods: rows, 
                pageTitle: 'Shop', 
                path: '/'
            });
        })
        .catch(err => console.log(err));*/
};

exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cart
                .getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        pageTitle: 'Your Cart', 
                        path: '/cart',
                        products: products
                    });
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    /*Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products){
                const cartProductData = cart.products.find(item => item.id === product.id);
                if (cartProductData){
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            console.log(cartProducts);
            res.render('shop/cart', {
                pageTitle: 'Your Cart', 
                path: '/cart',
                products: cartProducts
            });
        });
    });*/
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId }});
        })
        .then(products => {
            let product;
            if (products.length > 0){
                product = products[0];
            }
            if (product){
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(prodId)
        })
        .then(product => {
            return fetchedCart.addProduct(product, { 
                through: { quantity: newQuantity } 
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
    /*const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');*/
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: prodId }});
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    /*Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });*/
    
};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user.createOrder()
                .then(order => {
                    return order.addProducts(
                        products.map(product => {
                            product.orderItem = { quantity: product.cartItem.quantity };
                            return product;
                        })
                    );
                })
                .catch(err => console.log(err));
        })
        .then(result => {
            return fetchedCart.setProducts(null);
        })
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    req.user.getOrders({include: ['products']})
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: 'Your Orders', 
                path: '/orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout', 
        path: '/checkout'
    })
};