
const express = require('express');
const { fakeQaA } = require('./QaAFakeData');
const getProducts = require('../apiHelper/qandaAPI');
const router = express.Router();

router.get('/', (req, res) => {
  var endpoint = `?product_id=59555`;
  getProducts(endpoint)
  .then(question=> {
    res.send(JSON.stringify(question.data.results));
  })
})

router.get('/:question_id/answers', (req, res) => {

  var id = req.params.question_id;
    var endpoint = `/${id}/answers`;
  getProducts(endpoint)
  .then(question=> {
    res.send(JSON.stringify(question.data.results));
  })
})

module.exports = router;