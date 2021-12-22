const express = require('express');
const router = express.Router();
const { data, styles, meta, product } = require('./dummyData');
<<<<<<< HEAD
const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
require('dotenv').config();
=======
// require('dotenv').config();
>>>>>>> fa393e6325c525ac39d9d92d932b14ac82a81cba
const token = process.env.TOKEN;


router.get('/', (req, res) => {
   let dummyData = data;
   console.log(dummyData);
   res.send(dummyData);

})

router.get('products/:product_id', (req, res) => {
   let dummyData = data;
   res.send(dummyData);

})

router.get('review/meta/:product_id', (req, res) => {
<<<<<<< HEAD
   let dummyMeta =  meta;
=======
   let dummyMeta = meta;
   console.log(dummyMeta);
>>>>>>> fa393e6325c525ac39d9d92d932b14ac82a81cba
   res.send(dummyMeta);

})

//:product_id  add this to style route when implementing API!

router.get('/styles', (req, res) => {
   let dummyStyles = styles;
   res.send(dummyStyles);
})


module.exports = router;