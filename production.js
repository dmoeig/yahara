var express = require('express');
var app = express();
var port = process.env.PORT || 8000
var user = process.env.USER || 'yahara'
var password = process.env.PASSWORD || 'notset'

app.use(express.logger());
app.use(express.compress());
app.use(express.basicAuth(user, password));
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/public'));
app.listen(port);
