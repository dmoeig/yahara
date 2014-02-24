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

gulp.task('default', ['clean', 'server', 'watch']);

gulp.task('server', ['templates', 'javascript', 'css'], function () {
  var app = express();

  app.use('/vendor', express.static(__dirname + '/vendor'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/build'));

  if (util.env.e === 'production') {
    app.use('/api', proxy(url.parse('https://yahara-api.herokuapp.com/')));
  }
  else {
    apiStub(app);
  };

  app.listen(8000);
});


gulp.task('clean', function() {
  gulp.src('build/', {read: false})
      .pipe(clean());
});

gulp.task('css', function () {
  gulp.src('app/styles/yahara.scss')
    .pipe(sass())
    .pipe(gulp.dest('build'));
});

gulp.task('javascript', ['jshint'], function() {
  gulp.src(['app/app.js',
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
    .pipe(gulp.dest('build'))
});

gulp.task('templates', function(){
  gulp.src(['app/templates/**/*.hbs'])
    .pipe(handlebars({
      outputType: 'browser'
     }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('jshint', function() {
  gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.js', ['javascript']);
  gulp.watch('app/**/*.hbs', ['templates']);
  gulp.watch('app/**/*.scss', ['css']);
});

// TODO: API Proxy https://www.npmjs.org/package/proxy-middleware