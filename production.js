var express = require('express');
var request = require('request');
var fs = require('fs')

var app = express();
var port = process.env.PORT || 8000

app.use(express.logger());
app.use(express.compress());
app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN));
app.use(express.static(__dirname + '/dist', { maxAge: 86400000 })); //cache one day
app.use(express.static(__dirname + '/public'));

// TODO DRY this up from the gulpfile
app.get('/pages/:page', function(req, res){
  var pageName = req.params.page;
  var options = {
    url: 'https://api.github.com/repos/southpolesteve/yahara/contents/app/pages/' + pageName + '.html',
    headers: {
      'User-Agent': 'Yahara'
    }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      content = new Buffer(JSON.parse(body).content, 'base64').toString('ascii')
      res.send({'html': content})
    }
    else {
      fs.readFile(__dirname +'/app/pages/'+ pageName +'.md', 'utf8', function (err, data) {
        if (err) {
            res.send(404)
        }
        else {
          res.send({'html': data})
        }
      });
    }
  })

});

app.get('/*', function(req, res){
  res.sendfile(__dirname + '/dist/index.html');
});

app.listen(port);
