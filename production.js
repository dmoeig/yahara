var express = require('express');
var app = express();
var port = process.env.PORT || 8000

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/public'));
app.use(express.logger());
app.listen(port);
