const express = require('express');
const router = express.Router();
const data = require('./dummyData.js');
require('dotenv').config();
const token = process.env.TOKEN;


router.get('/', (req, res) => {
   let dummyData = data;
   console.log(dummyData);
   res.send(dummyData);

})

router.get('/:product_id', (req, res) => {
   let dummyData = data;
   console.log(dummyData);
   res.send(dummyData);

})


module.exports = router;