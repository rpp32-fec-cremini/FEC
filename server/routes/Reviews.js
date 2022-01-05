var express = require("express");
var router = express.Router();
var authorization = process.env.TOKEN;
var url = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/";
var axios = require("axios");

router.get("/", (req, res) => {
  // var exampleData = require("./ReviewsfakeData").fakeReviews;
  // res.send(JSON.stringify(exampleData))
  var count = 250;
  //limit to 10 reviews for speed
  axios.get(url + "reviews", { params: { ...req.query, count }, headers: { authorization }})
    .then(reviews => {
      res.end(JSON.stringify(reviews.data))
    })
    .catch(err => {
      console.log(err);
      res.end()
    })
})

router.get("/meta", (req, res) => {
  // var exampleData = require("./ReviewsfakeData").fakeMetaData;
  // res.send(JSON.stringify(exampleData))
  axios.get(url + "reviews/meta", { params: req.query, headers: { authorization }})
    .then(reviews => {
      res.end(JSON.stringify(reviews.data))
    })
    .catch(err => {
      console.log(err);
      res.end()
    })
})

router.post("/", (req, res) => {
  var data = req.body;
  console.log(data)
  axios.post(url + "reviews", data, { headers: { authorization } })
    .then((response) => res.end())
    .catch((error) => console.log(error))
})

router.post("/helpful", (req, res) => {
  axios.put(url + `reviews/${req.body.id}/helpful`, {}, { headers: { authorization } })
  res.end()
  //not in a then block because we want client to immediately update even before server request is fulfilled
})

router.post("/report", (req, res) => {
  axios.put(url + `reviews/${req.body.id}/report`, {}, { headers: { authorization } })
  res.end()
})

module.exports = router;