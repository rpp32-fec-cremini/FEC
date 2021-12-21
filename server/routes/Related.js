const express = require('express');
const axios = require('axios');
const { fakeProducts, fakeProductStyles, fakeRelated } = require('./RelatedFakeData');
const router = express.Router();
require('dotenv').config();
const authorization = process.env.TOKEN;



router.get('/', (req, res) => {
  let products = fakeProducts;

  axios.get("https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products", { headers: { authorization } })
    .then(products => {
      res.send(JSON.stringify(products.data));
    })
    .catch(err => {
      console.log(err);
      res.end()
    })
})

router.get('/:product_id', (req, res) => {
  let products = fakeProducts;
  let id = parseInt(req.params.product_id);
  let product = fakeProducts.find(el => el.id === id);
  // console.log(product);

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`, { headers: { authorization } })
    .then(product => {
      res.send(JSON.stringify(product.data));
    })
    .catch(err => {
      console.log(err);
      res.end()
    })
})

router.get('/:product_id/related', (req, res) => {
  let id = parseInt(req.params.product_id);

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/related`, { headers: { authorization } })
    .then(products => {
      // console.log('RELATED PRODUCTS: ', products);
      res.send(JSON.stringify(products.data));
    })
    .catch(err => {
      console.log(err);
      res.end()
    })
})

module.exports = router;