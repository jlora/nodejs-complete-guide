const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/edit-product', { 
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    //products.push({ title: req.body.title });
    //console.log(req.body);

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    /*const product = new Product(null, title, imageUrl, description, price);
    product.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
    */
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
    /*Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        userId: req.user.id
    })*/
    .then(result => {
        //console.log(result);
        console.log('Created Product');
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    req.user.getProducts({ where: { id: prodId }})
    //Product.findByPk(prodId)
        //.then(product => {
    .then(products => {
        const product = products[0];
        if (!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', { 
            pageTitle: 'Edit Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
    .catch(err => console.log(err));
    /*Product.findById(prodId, product => {
        if (!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', { 
            pageTitle: 'Edit Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });*/
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updateTitle = req.body.title;
    const updatePrice = req.body.price;
    const updateImageUrl = req.body.imageUrl;
    const updateDesc = req.body.description;
    //const updateProduct = new Product(prodId, updateTitle, updateImageUrl, updateDesc, updatePrice);
    //updateProduct.save();
    Product.findByPk(prodId)
    .then(product => {
        product.title = updateTitle;
        product.price = updatePrice;
        product.description = updateDesc;
        product.imageUrl = updateImageUrl;
        return product.save();
    })
    .then(result => {
        console.log('UPDATED PRODUCT !!!');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    req.user.getProducts()
    //Product.findAll()
    .then(products => {
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products'
        });
    })
    .catch(err => console.log(err));
    /*Product.fetchAll(products => {
        res.render('admin/products', { 
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products'
        });
    });*/
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    //Product.deleteById(prodId);
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            console.log('DESTROYED PRODUCT');
            console.log(result);
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
    
}
