var gulp = require('gulp');
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

gulp.task('default', function(callback) {
  return sequence('clean', ['templates', 'javascript', 'css', 'html'], 'server', 'watch', callback);
});

gulp.task('server', function () {
  var app = express();

  app.use('/vendor', express.static(__dirname + '/vendor'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/build'));
  app.use(express.logger());
  app.use(express.urlencoded());
  if (util.env.e !== 'production') {
    apiStub(app);
  }
  app.listen(8000);
  lr.listen(35729);
});

gulp.task('clean', function() {
  return gulp.src('build/', {read: false})
    .pipe(clean());
});

gulp.task('css', function () {
  return gulp.src('app/styles/yahara.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest('build'));
});

gulp.task('javascript', ['jshint'], function() {
  var env = util.env.e || "development"

  return gulp.src([
      'app/environments/' + env + '.js',
      'app/app.js',
      'app/router.js',
      'app/adapters/*.js',
      'app/components/*.js',
      'app/models/*.js',
      'app/controllers/*.js',
      'app/views/*.js',
      'app/helpers/*.js',
      'app/routes/**/*.js'
    ])
    .pipe(concat('yahara.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('templates', function(){
  return gulp.src(['app/templates/**/*.hbs'])
    .pipe(handlebars({
      outputType: 'browser'
     }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('jshint', function() {
  return gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('html', function() {
  return gulp.src('app/index.html')
    .pipe(gulp.dest('build/'));
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