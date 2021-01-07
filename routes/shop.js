const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
  //res.sendFile(path.join(__dirname, '../','views', 'shop.html'));
  console.log('shop.js', adminData.products);
  const products = adminData.products;
  //res.sendFile(path.join(rootDir,'views', 'shop.html'));
  res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' });
 });
module.exports = router;
