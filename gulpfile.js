var gulp = require('gulp');
var http = require('http');
var es = require("event-stream")
var express = require('express');
var namespace = require('express-namespace');
var concat = require('gulp-concat');
var handlebars = require('gulp-ember-handlebars');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var apiStub = require('./api-stub/server');
var url = require('url')
var proxy = require('proxy-middleware')
var util = require('gulp-util');
var stylish = require('jshint-stylish');
var sequence = require('run-sequence');
var lr = require('tiny-lr')();
var htmlreplace = require('gulp-html-replace');
var gulpif = require('gulp-if')
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify')
var rename = require('gulp-rename');
var fs = require('fs');
var markdown = require('markdown').markdown;
var request = require('request');

var env = process.env.NODE_ENV || "development"
var production = false
var build_dir = "build/"
var dist_dir = "dist/"

gulp.task('default', function(callback) {
  return sequence('clean', 'build', 'server', 'watch', callback);
});

gulp.task('dist', function(callback) {
  return sequence('clean-production', 'build-production', callback);
});

gulp.task('build', ['templates', 'javascript', 'css', 'html']);
gulp.task('build-production', ['javascript-production','css-production', 'html-production']);

gulp.task('server', function () {

  var app = express();

  app.use('/vendor', express.static(__dirname + '/vendor'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/build'));
  app.use(express.logger());
  app.use(express.urlencoded());

  app.get('/pages/:page', function(req, res){
    var pageName = req.params.page;
    var options = {
      url: 'https://api.github.com/repos/southpolesteve/yahara/contents/app/pages/' + pageName + '.md',
      headers: {
        'User-Agent': 'Yahara'
      }
    };

    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        content = new Buffer(JSON.parse(body).content, 'base64').toString('ascii')
        res.send({'html': markdown.toHTML(content)})
      }
      else {
        fs.readFile(__dirname +'/app/pages/'+ pageName +'.md', 'utf8', function (err, data) {
          if (err) {
              res.send(404)
          }
          else {
            res.send({'html': markdown.toHTML(data)})
          }
        });
      }
    })

  });

  if (env !== 'production') {
    apiStub(app);
  }

  app.get('/*', function(req, res){
    res.sendfile(__dirname + '/build/index.html');
  });

  app.listen(8000);
  lr.listen(35729);
});

gulp.task('clean', function() {
  return gulp.src(build_dir, {read: false})
    .pipe(clean());
});

var cssFiles = 'app/styles/yahara.scss'

gulp.task('css', function () {
  return gulp.src(cssFiles)
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest(build_dir));
});

gulp.task('css-production', function () {
  return gulp.src(cssFiles)
    .pipe(sass({errLogToConsole: true}))
    .pipe(minifyCSS())
    .pipe(rename('yahara.min.css'))
    .pipe(gulp.dest(dist_dir));
});

var appJsFiles = [
    'app/ember-extensions.js',
    'app/environments/' + env + '.js',
    'app/app.js',
    'app/router.js',
    'app/adapters/*.js',
    'app/components/*.js',
    'app/models/*.js',
    'app/controllers/**/*.js',
    'app/views/*.js',
    'app/helpers/*.js',
    'app/routes/**/*.js'
  ];

var vendorJsFiles = [
  "vendor/jquery/dist/jquery.js",
  "vendor/soundmanager2/script/soundmanager2-nodebug.js",
  "vendor/handlebars/handlebars.runtime.js",
  "vendor/ember/ember.prod.js",
  "vendor/ember-model/ember-model.js",
  "vendor/ic-ajax/dist/globals/main.js"
  ];

gulp.task('javascript', ['jshint'], function() {
  return gulp.src(appJsFiles)
    .pipe(concat('yahara.js'))
    .pipe(gulp.dest(build_dir));
});

gulp.task('javascript-production', function() {
  return gulp.src(vendorJsFiles.concat(templateFiles).concat(appJsFiles))
    .pipe(gulpif(/[.]hbs$/, handlebars({
      outputType: 'browser'
    })))
    .pipe(concat('yahara.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist_dir));
});

var templateFiles = 'app/templates/**/*.hbs';

gulp.task('templates', function(){
  return gulp.src(templateFiles)
    .pipe(handlebars({
      outputType: 'browser'
     }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('build/'));
});

jsHintFiles = ['app/**/*.js', '!app/app.js', '!app/environments/*.js']

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
        "window"
      ],
      "trailing": true,
      "undef": true
    }))
    .pipe(jshint.reporter(stylish));
});

var htmlFiles = 'app/index.html'

gulp.task('html', function() {
  return gulp.src(htmlFiles)
    .pipe(gulp.dest(build_dir));
});

gulp.task('html-production', function() {
  return gulp.src(htmlFiles)
    .pipe(htmlreplace({
        'css': 'yahara.min.css',
        'js': 'yahara.min.js'
    }))
    .pipe(gulp.dest(dist_dir));
});

gulp.task('watch', function () {
  gulp.watch('app/pages/**/*.md', ['markdown']);
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
