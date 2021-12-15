var express = require("express");
var router = express.Router();
// require('dotenv').config();
var token = process.env.TOKEN;


router.get("/", (req, res) => {
  var exampleData = require("./ReviewsfakeData").fakeReviews;
  res.send(JSON.stringify(exampleData))
})

router.get("/meta", (req, res) => {
  var exampleData = require("./ReviewsfakeData").fakeMetaData;
  res.send(JSON.stringify(exampleData))
})

router.post("/", (req, res) => {
  res.send(JSON.stringify("posted"))
})

router.put("/:review_id/helpful", (req, res) => {
  var reviewId = req.params.review_id;
  res.send(JSON.stringify(reviewId + ' marked as helpful'))
})

router.put("/:review_id/report", (req, res) => {
  var reviewId = req.params.review_id;
  res.send(JSON.stringify(reviewId + ' reported'))
})

module.exports = router;