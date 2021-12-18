const express = require('express');
const { fakeQaA } = require('./QaAFakeData');
const router = express.Router();
require('dotenv').config();
const token = process.env.TOKEN;

router.get('/', (req, res) => {
  console.log(fakeQaA);
  let question = fakeQaA;
  res.send(JSON.stringify(question.results));
})

router.get('/:question_id/answers', (req, res) => {
  let answer = fakeQaA.answers;
  res.send(JSON.stringify(answer));
})

module.exports = router;