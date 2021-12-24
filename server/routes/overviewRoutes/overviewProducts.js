const express = require('express');
const axios =  require('axios');
const router = express.Router();
const {getProducts, getStyle, getSingleProduct, getMeta} = require('./overviewAPIHelpers/overviewAPI')
const { data, styles, meta, product } = require('./dummyData');
const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
require('dotenv').config();
const token = process.env.TOKEN;


router.get('/', (req, res) => {

   //let dummyData = data;
   getProducts()
   .then((data) => {
      //console.log(data)
      res.send(data.data);
   })
   .catch(error => {
      console.log('REE ERROR ' , error);
    })
   //console.log(dummyData)

});

router.get('products/:product_id', (req, res) => {
   //var id = req.params.product_id;
   getSingleProduct()
   .then((data) => {
      console.log(data.data)
   })
   .catch(error => {
      console.log('REEE ERROR HERE ', error);
   })
   //let dummyData = data;
   res.send(dummyData);

})

router.get('review/meta/:product_id', (req, res) => {
   //var id = req.params.product_id;
   let dummyMeta =  meta;
   res.send(dummyMeta);

})

//:product_id  add this to style route when implementing API! >_>

router.get('products/styles', (req, res) => {
   console.log('Double bruh ', req)
   console.log("Bruh ", id);
   var id = req.query.product_id;
   getStyle(id)
   .then((data) => {
      /* console.log('What is the data? ', data.data) */
      res.send(data);
   })
   .catch(error => {
      console.log('REEEE ERROR ', error)
   })
})


module.exports = router;