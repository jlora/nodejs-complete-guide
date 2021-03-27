const express = require('express');
//const path = require('path');
//const rootDir = require('../util/path');
const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
  //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true });
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  //console.log(req.body);
  res.redirect('/');
});

//module.exports = router;

exports.routes = router;
exports.products = products;