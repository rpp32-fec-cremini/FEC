const express = require('express');
const { fakeQaASevenQuestions } = require('./QaAFakeData');
const {getProducts, postQuestion, postAnswer, questionHelpfulandReport, answerHelpfulandReport} = require('../apiHelper/qandaAPI');
const router = express.Router();

router.get('/questions/:product_id', (req, res) => {

  var productId = req.params.product_id;
  var endpoint = `?product_id=${productId}`;
  getProducts(endpoint)
  .then(question=> {
    question.data.results.push({'CloundinaryAPI': process.env.CLOUDINARY});
    res.send(JSON.stringify(question.data.results));
  })
  .catch(err => {
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
      res.end()
    })

})

router.post('/questions', (req, res) => {

  var questionBody = req.body;
  postQuestion(questionBody)
  .then(question=> {
    console.log('questionBody', question)
    res.end()
  })
  .catch((err) => {
    res.end()
  });

})

router.post('/questions/:question_id/answers', (req, res) => {

  var id = req.params.question_id;
  var endpoint = `/${id}/answers`;
  var questionBody = req.body;
  postAnswer(questionBody, endpoint)
  .then(question=> {
      res.end();
  })
  .catch((err) => {
    res.end();
  });

})

router.put('/questions/:question_id/helpful', (req, res) => {

  var id = req.params.question_id;
  var endpoint = `/${id}/helpful`;
  questionHelpfulandReport(endpoint)
  .then(question=> {
    res.end();
  })
  .catch((err) => {
    res.end();
  });

})

router.put('/questions/:question_id/report', (req, res) => {

  var id = req.params.question_id;
  var endpoint = `/${id}/report`;
  questionHelpfulandReport(endpoint)
  .then(question=> {
    res.end();
  })
  .catch((err) => {
    res.end();
  });

})

router.put('/answers/:answer_id/helpful', (req, res) => {

  var id = req.params.answer_id;
  var endpoint = `/${id}/helpful`;
  answerHelpfulandReport(endpoint)
  .then(answer=> {
    res.end();
  })
  .catch((err) => {

    res.end();
  });

})

router.put('/answers/:answer_id/report', (req, res) => {

  var id = req.params.answer_id;
  var endpoint = `/${id}/report`;
  answerHelpfulandReport(endpoint)
  .then(answer=> {
      res.end();
  })
  .catch((err) => {
    // console.log('post answer error');
    res.end();
  });

})

module.exports = router;