const express = require('express');
const { fakeQaA } = require('./QaAFakeData');
const {getProducts, postQuestion, postAnswer, questionHelpfulandReport, answerHelpfulandReport} = require('../apiHelper/qandaAPI');
// const postQuestion = require('../apiHelper/qandaAPI');
const router = express.Router();

router.get('/questions/:product_id', (req, res) => {
  var productId = req.params.product_id;
  var endpoint = `?product_id=${productId}`;
  getProducts(endpoint)
  .then(question=> {
    // res.send(JSON.stringify(fakeQaA.results));
    res.send(JSON.stringify(question.data.results));
  })
  .catch(err => {
    console.log(err.data);
    res.end()
  })
})

router.get('/questions/:question_id/answers', (req, res) => {

    var id = req.params.question_id;
    var endpoint = `/${id}/answers`;
    getProducts(endpoint)
    .then(question=> {
      res.send(JSON.stringify(question.data.results));
    })
    .catch(err => {
      console.log(err.data);
      res.end()
    })
})

router.post('/questions', (req, res) => {
  var questionBody = req.body;
  console.log('questionbody1', req.body);
    postQuestion(questionBody)
    .then(question=> {
      console.log('question post', question);
      console.log('question create', res.statusCode);
      res.end()
    })
    .catch((err) => {
      console.log('post question error', err);
      res.end()
    });
  // getProducts()
  // // console.log('help', getProducts())
  // console.log(config);
 /*  getProducts()
  .then(question=> {
    // console.log('data', question.data.results[0].answers);
    //res.send(JSON.stringify(question.data.results));
    console.log('Hello');
  })
  .catch(err => {
    console.log(err);
  }) */
  // .catch(err => {
  //   console.log('err', err)
  // })
  // console.log(getProducts(token))
  // let question = fakeQaA;
  // console.log('this is question', question.results);
  // res.send(JSON.stringify(question.results));
})

router.post('/questions/:question_id/answers', (req, res) => {

  // var id = 513735;
  var id = req.params.question_id;
  var endpoint = `/${id}/answers`;
  var questionBody = req.body;
  console.log('questionbody2', req.body, endpoint);
  // postAnswer(questionBody, endpoint)
  // .then(question=> {
  //     console.log('answer create', res.statusCode)
  //     res.end();
  // })
  // .catch((err) => {
  //   console.log('post answer error');
  //   res.end();
  // });
})

router.put('/questions/:question_id/helpful', (req, res) => {

  var id = req.params.question_id;
  // console.log(id)
  var endpoint = `/${id}/helpful`;
  questionHelpfulandReport(endpoint)
  .then(question=> {
      console.log('question create', res.statusCode)
      res.end();
  })
  .catch((err) => {
    console.log('post answer error');
    res.end();
  });

})

router.put('/questions/:question_id/report', (req, res) => {

  var id = req.params.question_id;
  // console.log(id)
  var endpoint = `/${id}/report`;
  questionHelpfulandReport(endpoint)
  .then(question=> {
      console.log('question create', res.statusCode)
      res.end();
  })
  .catch((err) => {
    console.log('post answer error');
    res.end();
  });

})

router.put('/answers/:answer_id/helpful', (req, res) => {

  var id = req.params.answer_id;
  var endpoint = `/${id}/helpful`;
  answerHelpfulandReport(endpoint)
  .then(answer=> {
      console.log('answer create', res.statusCode)
      res.end();
  })
  .catch((err) => {
    console.log('post answer error');
    res.end();
  });

})

router.put('/answers/:answer_id/report', (req, res) => {

  var id = req.params.answer_id;
  var endpoint = `/${id}/report`;
  answerHelpfulandReport(endpoint)
  .then(answer=> {
      console.log('answer create', res.statusCode)
      res.end();
  })
  .catch((err) => {
    console.log('post answer error');
    res.end();
  });

})

module.exports = router;