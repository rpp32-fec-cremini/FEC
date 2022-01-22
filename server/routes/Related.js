const express = require('express');
const axios = require('axios');
const { fakeProducts, fakeProductStyles, fakeOutfits, fakeOutfitFeatures } = require('./RelatedFakeData');
const router = express.Router();
// require('dotenv').config();
const authorization = process.env.TOKEN;



router.get('/', (req, res) => {
  let products = fakeProducts;

  axios.get("https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products", { headers: { authorization } })
    .then(products => {
      res.send(JSON.stringify(products.data));
    })
    .catch(err => {
      console.log('All products request Failed ', res.status);
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
      console.log('Single product request Failed ', res.status);
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
      console.log('Related products request Failed ', res.status);
      res.end()
    })
})

router.get('/:product_id/styles', (req, res) => {
  let id = parseInt(req.params.product_id);

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/styles`, { headers: { authorization } })
    .then(styles => {
      res.send(JSON.stringify(styles.data));
    })
    .catch(err => {
      console.log('Styles request Failed ', res.status);
      res.end()
    })
})

router.get('reviews/meta', (req, res) => {
  let id = parseInt(req.params.product_id);

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta`, { params: req.query, headers: { authorization } })
    .then(reviews => {
      res.send(JSON.stringify(reviews.data));
    })
    .catch(err => {
      console.log('Reviews request Failed ', res.status);
      res.end()
    })
})

router.get('/:user_id/outfits', (req, res) => {
  let user = parseInt(req.params.user_id);
  res.send(JSON.stringify(fakeOutfits));
})

module.exports = router;