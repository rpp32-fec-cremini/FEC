var express = require('express');
var app = express();
var port = 3000;

require('dotenv').config();

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

app.listen(port, () => {
  console.log('App listening on port: ', port);
})

