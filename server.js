//for Heroku live production to server angular app without api server
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/src'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/src/index.html'));
});

app.listen(process.env.PORT || 8081);