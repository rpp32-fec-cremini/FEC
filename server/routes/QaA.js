const express = require('express');
const { fakeQaA } = require('./QaAFakeData');
const {getProducts, postQuestion} = require('../apiHelper/qandaAPI');
// const postQuestion = require('../apiHelper/qandaAPI');
const router = express.Router();

router.get('/', (req, res) => {
  // console.log('this is product', getProducts.getProducts());
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

router.post('/', (req, res) => {
  var questionBody = req.body;
  postQuestion(questionBody)
  .then(question=> {
      console.log('question create', res.statusCode)
  //   console.log('data', question.data.results[0].answers);
  //   res.send(JSON.stringify(question.data.results));
  })
  .catch(() => {
    console.log('post question error');
  });
  // console.log('result', req.body);
})

module.exports = router;