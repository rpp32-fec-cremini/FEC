var express = require('express');
var app = express();
var port = 3000;

app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, () => {
  console.log('App listening on port: ', port);
})