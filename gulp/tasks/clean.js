var gulp = require('gulp');
var del = require('del');

// Clean dev
gulp.task('clean:dev', function() {
  'use strict';
  return del.sync([
    'app/css',
    'app/*.html',
  ]);
});

// Cleaning dist (with gulp-cache)
gulp.task('clean:dist', function() {
  'use strict';
  return del.sync(['dist']);
});

// Cleaning dist (with gulp-newer)
// gulp.task('clean:dist', function (callback) {
//   return del.sync([
//     'dist/**/*',
//     '!dist/images',
//     '!dist/images/**/*'
//   ])
// })
