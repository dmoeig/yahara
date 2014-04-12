var express = require('express');
var app = express();
var port = process.env.PORT || 8000

app.use('/vendor', express.static(__dirname + '/vendor'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/build'));
app.use(express.logger());
app.listen(port);
