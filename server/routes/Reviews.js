var express = require("express");
var aws = require('aws-sdk');
var router = express.Router();
var authorization = process.env.TOKEN;
var url = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/";
var axios = require("axios");
var multer = require('multer');
var multerS3 = require('multer-s3');
var uuid = require('uuid').v4;
var path = require('path');
// var accessKey = process.env.AWS_ACCESSKEY;
// var secretAccessKey = process.env.AWS_SECRETACCESSKEY;

var s3 = new aws.S3({ apiVersion: '2006-03-01' })

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'fec-image-urls',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      var ext = path.extname(file.originalname);
      cb(null, `${uuid()}-${ext}`);
    }
  })
});



router.get("/", (req, res) => {
  var count = 250;
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
  axios.get(url + "reviews/meta", { params: req.query, headers: { authorization }})
    .then(reviews => {
      res.end(JSON.stringify(reviews.data))
    })
    .catch(err => {
      console.log(err);
      res.end()
    })
})

router.post("/images", upload.array('image'), async (req, res) => {
  res.send(req.files);
})

router.post("/", (req, res) => {
  var data = req.body;
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