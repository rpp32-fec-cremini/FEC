var express = require("express");
var router = express.Router();
var authorization = process.env.TOKEN;
var url = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/";
var axios = require("axios");

router.get("/", (req, res) => {
  // var exampleData = require("./ReviewsfakeData").fakeReviews;
  // res.send(JSON.stringify(exampleData))
  var count = 4;
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

router.post("/helpful", (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.body.id}/helpful`, {}, { headers: { authorization } })
  res.end()
  //not in a then block because we want client to immediately update even before server request is fulfilled
})

router.post("/report", (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.body.id}/report`, {}, { headers: { authorization } })
  res.end()
})

module.exports = router;