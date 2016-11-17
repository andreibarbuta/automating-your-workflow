// require modules
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// require config
var config = require('../config');

// Images (With Gulp-caches)
gulp.task('images', function() {
  'use strict';
  return gulp.src(config.images.src)
  .pipe($.cache($.imagemin(), config.images.options))
  .pipe(gulp.dest(config.images.dest));
});

// Clearing caches
gulp.task('cache:clear', function() {
  'use strict';
  return $.cache.clearAll();
});

// Images (With Gulp Newer)
gulp.task('images', function() {
  'use strict';
  return gulp.src(config.images.src)
    .pipe($.newer(config.images.dest))
    .pipe($.imagemin())
    .pipe(gulp.dest(config.images.dest));
});
