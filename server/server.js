var express = require('express');
var app = express();
var port = 3000;

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json())

var reviewsRouter = require("./routes/Reviews");
app.use("/reviews", reviewsRouter);

var relatedRouter = require('./routes/Related');
app.use('/products', relatedRouter);

<<<<<<< HEAD
var overViewRouter = require('./routes/overviewRoutes/overviewProducts');
app.use('/overview', overViewRouter);
=======
var questionRouter = require('./routes/QaA');
app.use('/qa/questions', questionRouter);
>>>>>>> 2a128a08a4eea25d304838a747500c9732383f48

app.listen(port, () => {
  console.log('App listening on port: ', port);
})

