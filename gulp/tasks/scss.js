// scss.js
// required modules
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

// require custom modules
var customPlumber = require('../custom-modules/plumber');

// require config
var config = require('../config');

// Compiles SCSS to CSS
gulp.task('sass', function() {
  'use strict';
  return gulp.src(config.sass.src)
  .pipe(customPlumber('Error Running Sass'))
  .pipe($.sourcemaps.init())
  .pipe($.sass(config.sass.options))
  .pipe($.autoprefixer())
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(config.sass.dest))
  .pipe(browserSync.reload({
    stream: true
  }));
});
