var gulp = require('gulp');
var es = require("event-stream")
var express = require('express');
var namespace = require('express-namespace');
var concat = require('gulp-concat');
var handlebars = require('gulp-ember-handlebars');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var revall = require('gulp-rev-all');
var apiStub = require('./api-stub/server');
var url = require('url');
var util = require('gulp-util');
var stylish = require('jshint-stylish');
var sequence = require('run-sequence');
var lr = require('tiny-lr')();
var htmlreplace = require('gulp-html-replace');
var gulpif = require('gulp-if')
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify')
var rename = require('gulp-rename');
var request = require('request');
var fs = require('fs');
var Judo = require('judo');

var env = process.env.NODE_ENV || "development"
var build_dir = "build/"
var dist_dir = "dist/"
var temp_dir = "tmp/"
var destination = build_dir

var production = function (){
  return env === "production"
}

gulp.task('default', function(callback) {
  return sequence('clean', 'build', 'server', 'watch', callback);
});

gulp.task('beforetest', function(callback) {
  return sequence('clean', 'build', 'server', callback);
});

gulp.task('dist', function(callback) {
  env = "production"
  destination = temp_dir
  return sequence('clean-dist', 'build-production', 'sitemap', 'rev', callback);
});

gulp.task('build', ['templates', 'javascript', 'css', 'html']);
gulp.task('build-production', [ 'javascript-app','javascript-vendor','css','html']);

gulp.task('rev', function() {
  return gulp.src('tmp/**')
    .pipe(revall({ ignore: ['.html'] }))
    .pipe(gulp.dest(dist_dir))
});

gulp.task('server', function() {
  var app = express();

  app.use('/vendor', express.static(__dirname + '/vendor'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/build'));
  app.use(express.static(__dirname + '/dist'));
  app.use(express.logger());
  app.use(express.urlencoded());

  app.get('/pages/:page', function(req, res){
    var pageName = req.params.page;
    var options = {
      url: 'https://api.github.com/repos/therabble/yahara/contents/app/pages/' + pageName + '.html',
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
        fs.readFile(__dirname +'/app/pages/'+ pageName +'.html', 'utf8', function (err, data) {
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

  apiStub(app);

  app.get('/*', function(req, res){
    res.sendfile(__dirname + '/build/index.html');
  });

  app.get('/sitemap.xml', function(req, res) {
    res.sendfile(__dirname + '/dist/sitemap.xml');
  });

  app.listen(8000);
  lr.listen(35729);
});

cleanFiles = [build_dir, temp_dir]

gulp.task('clean', function() {
  return gulp.src(cleanFiles, {read: false})
    .pipe(clean());
});

gulp.task('clean-dist', function() {
  return gulp.src(dist_dir, {read: false})
    .pipe(clean());
});

var cssFiles = 'app/styles/yahara.scss'

gulp.task('css', function () {
  return gulp.src(cssFiles)
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulpif(production(), minifyCSS()))
    .pipe(gulp.dest(destination));
});

var appJsFiles = function(){
  return [
      'app/environments/' + env + '.js',
      'app/app.js',
      'app/mixins/*.js',
      'app/router.js',
      'app/adapters/*.js',
      'app/components/*.js',
      'app/models/*.js',
      'app/controllers/**/*.js',
      'app/views/**/*.js',
      'app/helpers/*.js',
      'app/routes/**/*.js'
    ]
}

gulp.task('javascript', ['jshint'], function() {
  return gulp.src(appJsFiles())
    .pipe(concat('yahara.js'))
    .pipe(gulp.dest(build_dir));
});

gulp.task('javascript-vendor', function() {
  var vendorJsFiles = [
    "vendor/jquery/dist/jquery.js",
    "vendor/soundmanager2/script/soundmanager2-nodebug.js",
    "vendor/handlebars/handlebars.runtime.js",
    "vendor/ember/ember.prod.js",
    "vendor/ember-model/ember-model.js",
    "vendor/ic-ajax/dist/globals/main.js"
    ];

  return gulp.src(vendorJsFiles)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(temp_dir));
});

gulp.task('javascript-app', function() {
  return gulp.src(templateFiles.concat(appJsFiles()))
    .pipe(gulpif(/[.]hbs$/, handlebars({
      outputType: 'browser'
    })))
    .pipe(concat('yahara.js'))
    .pipe(uglify())
    .pipe(gulp.dest(temp_dir));
});

var templateFiles = ['app/templates/**/*.hbs'];

gulp.task('templates', function(){
  return gulp.src(templateFiles)
    .pipe(handlebars({
      outputType: 'browser'
     }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(destination));
});

var jsHintFiles = ['app/**/*.js', '!app/app.js', '!app/environments/*.js']

gulp.task('jshint', function() {
  return gulp.src(jsHintFiles)
    .pipe(jshint({
      "curly": true,
      "eqeqeq": true,
      "eqnull": true,
      "expr": true,
      "latedef": true,
      "noarg": true,
      "node": true,
      "predef": [
        "Yahara",
        "Ember",
        "ic",
        "localStorage",
        "soundManager",
        "ENV",
        "$",
        "window",
        "escape",
        "ga"
      ],
      "trailing": true,
      "undef": true
    }))
    .pipe(jshint.reporter(stylish));
});

var htmlFiles = 'app/index.html'

gulp.task('html', function() {
  return gulp.src(htmlFiles)
    .pipe(gulpif(production(), htmlreplace({
        'css': '/yahara.css',
        'js': ['/vendor.js','/yahara.js']
    })))
    .pipe(gulp.dest(destination));
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.js', ['javascript']);
  gulp.watch('app/**/*.hbs', ['templates']);
  gulp.watch('app/**/*.scss', ['css']);
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('build/*', function (event){

    var fileName = require('path').relative(__dirname, event.path);

    lr.changed({
      body: {
        files: [fileName]
      }
    });
  });
});

gulp.task('sitemap', function() {
  var urlConfig = {
    baseUrl: 'http://www.yaharamusic.org/',
    siteMapPath: 'dist/sitemap.xml',
    urls: [
      {
        url: '/',
        siteMap: {}
      },
      {
        url: '/about',
        siteMap: {}
      },
      {
        url: '/team',
        siteMap: {}
      }
    ]
  }

  var api = "https://yahara-api.herokuapp.com/";

  request(api + "catalog/yahara", function(error, response, body) {
    if (!error && response.statusCode == 200) {
      bodyJSON = JSON.parse(body);

      for (var i = 0; i < bodyJSON.length; i++) {
        urlConfig.urls.push({ url: 'album/' + bodyJSON[i].slug, siteMap: {} });
        urlConfig.urls.push({ url: bodyJSON[i].artist_url.substring(api.length), siteMap: {} });
      };
    } else {
      console.log("Error querying api", error);
    }
    judo = new Judo();
    judo.updateSiteMap(urlConfig, function(err) {
      if (err) {
        console.log("Error generating sitemap", err);
      };
    });
  })
});
