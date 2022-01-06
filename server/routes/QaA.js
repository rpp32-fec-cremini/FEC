const express = require('express');
const { fakeQaA } = require('./QaAFakeData');
const {getProducts, postQuestion, postAnswer} = require('../apiHelper/qandaAPI');
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
  // console.log('questionbody1', req.body);
  // postQuestion(questionBody)
  // .then(question=> {
  //     console.log('question create', res.statusCode)
  // })
  // .catch(() => {
  //   console.log('post question error');
  // });
})

router.post('/:question_id/answers', (req, res) => {

  // var id = 513735;
  var id = req.params.question_id;
  var endpoint = `/${id}/answers`;
  var questionBody = req.body;
  // console.log('questionbody2', req.body, endpoint);
  // postAnswer(questionBody, endpoint)
  // .then(question=> {
  //     console.log('question create', res.statusCode)
  // })
  // .catch((err) => {
  //   console.log('post question error');
  // });
  //   var endpoint = `/${id}/answers`;
  //   getProducts(endpoint)
  //   .then(question=> {
  //   res.send(JSON.stringify(question.data.results));
  // })
})

module.exports = router;