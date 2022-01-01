var express = require("express");
var router = express.Router();
var authorization = process.env.TOKEN;
var url = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/";
var axios = require("axios");

router.get("/", (req, res) => {
  var exampleData = require("./ReviewsfakeData").fakeReviews;
  res.send(JSON.stringify(exampleData))
  // var count = 4;
  // axios.get(url + "reviews", { params: { ...req.query, count }, headers: { authorization }})
  //   .then(reviews => {
  //     console.log(reviews.data)
  //     res.end(JSON.stringify(reviews.data.results))
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.end()
  //   })
})

router.get("/meta", (req, res) => {
  var exampleData = require("./ReviewsfakeData").fakeMetaData;
  res.send(JSON.stringify(exampleData))
})

router.post("/", (req, res) => {
  var data = req.body;
  axios.post(url + "reviews", data, { headers: { authorization } })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
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