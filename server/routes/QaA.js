const express = require('express');
const { fakeQaA } = require('./QaAFakeData');
// const { token } = require('../apiHelper/qandaAPI');
require('dotenv').config();
var token = process.env.TOKEN;
// const { token } = require('../apiHelper/qandaAPI');
const router = express.Router();
// require('dotenv').config();
// const token = process.env.TOKEN;


router.get('/', (req, res) => {
  // getProducts()
  // .then(question=> {
  //   // console.log('data', question.data.results[0].answers);
  //   res.send(JSON.stringify(question.data.results));
  // })
  console.log('token', token)
})

router.get('/:question_id/answers', (req, res) => {
  getProducts()
  .then(question=> {
    res.send(JSON.stringify(question.data.results));
  })
  // getProductsQuestions()
  // .then(question=> {
  //   // res.send(JSON.stringify(question.results));
  //   let answer = fakeQaA.answers;
  //   res.send(JSON.stringify(answer));
  // })
})

module.exports = router;