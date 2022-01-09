var express = require('express');
var app = express();
var port = 3000;
var axios = require('axios');

require('dotenv').config();
var authorization = process.env.TOKEN;
var url = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/";

app.use(express.static(__dirname + '/../client/dist'));

app.use(express.json())

var reviewsRouter = require("./routes/Reviews");
app.use("/reviews", reviewsRouter);

var relatedRouter = require('./routes/Related');
app.use('/products', relatedRouter);

var overViewRouter = require('./routes/overviewRoutes/overviewProducts');
app.use('/overview', overViewRouter);

var questionRouter = require('./routes/QaA');
app.use('/qa/questions', questionRouter);

app.post('/interactions', (req, res) => {
  var data = req.body;
  // console.log(data);
  res.end()
  // axios.post(url + "interactions", data, { headers: { authorization } })
  //   .then((response) => res.end())
  //   .catch((error) => console.log(error))
})

app.listen(port, () => {
  console.log('App listening on port: ', port);
})

