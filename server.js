//for Heroku live production to server angular app without api server
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist'));

console.log(__dirname);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(process.env.PORT || 8081);