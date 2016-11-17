var gulp = require('gulp');
var browserSync = require('browser-sync');

// Browser Sync Dev
gulp.task('browserSync', function() {
  'use strict';
  browserSync({
    server: {
      baseDir: 'app'
    },
    host: '192.168.1.4',
    browser: ['firefox'],
    // open: false,
    // notify: false,
    // online: false,
  });
});

// Browser Sync Dist
gulp.task('browserSync:dist', function() {
  'use strict';
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });
});
