const express = require('express');
const router = express.Router();
const { data, styles, meta, product } = require('./dummyData');
require('dotenv').config();
const token = process.env.TOKEN;


router.get('/', (req, res) => {
   let dummyData = data;
   console.log(dummyData);
   res.send(dummyData);

})

router.get('products/:product_id', (req, res) => {
   let dummyData = data;
   console.log(dummyData);
   res.send(dummyData);

})

router.get('review/meta/:product_id', (req, res) => {
   let dummyMeta =  meta;
   console.log(dummyMeta);
   res.send(dummyMeta);

})

//:product_id  add this to style route when implementing API!

router.get('/styles', (req, res) => {
   let dummyStyles = styles;
   console.log(dummyStyles);
   res.send(dummyStyles);
})


module.exports = router;