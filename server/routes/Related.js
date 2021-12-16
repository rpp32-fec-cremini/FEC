const express = require('express');
const { fakeProducts, fakeProductStyles, fakeRelated } = require('./RelatedFakeData');
const router = express.Router();
require('dotenv').config();
const token = process.env.TOKEN;

router.get('/', (req, res) => {
  let products = fakeProducts;
  res.send(JSON.stringify(products));
})

router.get('/:product_id', (req, res) => {
  let products = fakeProducts;
  let id = parseInt(req.params.product_id);
  let product = fakeProducts.find(el => el.id === id);
  console.log(product);
  res.send(JSON.stringify(product));
})

module.exports = router;