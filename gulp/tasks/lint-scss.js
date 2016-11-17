var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// require config
var config = require('../config');

// Linting SCSS
gulp.task('lint:scss', function() {
  'use strict';
  return gulp.src(config.sass.src)
  .pipe($.sassLint(config.sasslint))
  .pipe($.sassLint.format())
  .pipe($.sassLint.failOnError());
});
