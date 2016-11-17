var gulp = require('gulp');

// require config
var config = require('../config');

// Copying fonts
gulp.task('fonts', function() {
  'use strict';
  return gulp.src(config.fonts.src)
  .pipe(gulp.dest(config.fonts.dest));
});
