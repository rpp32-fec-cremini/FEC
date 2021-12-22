const express = require('express');
const { fakeQaA } = require('./QaAFakeData');
const { getProducts } = require('../apiHelper/qandaAPI');
// const { token } = require('../apiHelper/qandaAPI');
const router = express.Router();
// require('dotenv').config();
// const token = process.env.TOKEN;


router.get('/', (req, res) => {
  // getProducts()
  // // console.log('help', getProducts())
  // console.log(config);
  getProducts()
  .then(question=> {
    // console.log('data', question.data.results[0].answers);
    res.send(JSON.stringify(question.data.results));
  })
  // .catch(err => {
  //   console.log('err', err)
  // })
  // console.log(getProducts(token))
  // let question = fakeQaA;
  // console.log('this is question', question.results);
  // res.send(JSON.stringify(question.results));
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