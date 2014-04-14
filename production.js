var express = require('express');
var app = express();
var port = process.env.PORT || 8000

app.use(express.logger());
app.use(express.compress());
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/public'));
app.listen(port);
