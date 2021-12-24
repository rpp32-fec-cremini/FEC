const express = require('express');
const { fakeQaA } = require('./QaAFakeData');
const getProducts = require('../apiHelper/qandaAPI');
const router = express.Router();

router.get('/', (req, res) => {
  var endpoint = `?product_id=59553`;
  getProducts(endpoint)
  .then(question=> {
    console.log('data', question.data.results);
    res.send(JSON.stringify(question.data.results));
  })
})

router.get('/:question_id/answers', (req, res) => {

  var id = req.params.question_id;
  console.log('this is id', req.params);
    var endpoint = `/${id}/answers`;
  getProducts(endpoint)
  .then(question=> {
    console.log('this is answer', question.data.results)
    res.send(JSON.stringify(question.data.results));
  })
})

module.exports = router;