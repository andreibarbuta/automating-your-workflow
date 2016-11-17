var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

// Consolidated dev phase task
gulp.task('default', function() {
  'use strict';
  runSequence(
    'clean:dev',
    ['sprites', 'lint:js', 'lint:scss'],
    ['sass', 'nunjucks'],
    ['browserSync', 'watch']
  );
});
