var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function() {
  'use strict';
  runSequence(
    ['clean:dev', 'clean:dist'],
    ['sprites', 'lint:js', 'lint:scss'],
    ['sass', 'nunjucks'],
    ['useref', 'images', 'fonts', 'test']
  );
});
