// deploy.js
// required modules
var gulp = require('gulp');
var gutil = require('gulp-util');
var fs = require('fs');
var $ = require('gulp-load-plugins')();
var ftp = require('vinyl-ftp');

// require config
var config = require('../config');

//
if (!process.env.CI) {
  var creds = JSON.parse(fs.readFileSync('./secrets.json'));

  var conn = ftp.create({
    host: creds.server,
    user: creds.username,
    password: creds.password,
    port: 21,
    parallel: 5,
    maxConnections: 10,
    // secure: true,
    log: gutil.log
  });

  var globs = [
    'dist/**/*'
    // 'src/**',
    // 'css/**',
    // 'js/**',
    // 'fonts/**',
    // 'index.html',
    // '!test-gulp2/**',
    // 'test-gulp/**',
    // '../test-theme.html',
    // '../../../../test-root.html',
    // '../../../../*.*',
    // '!../../../../wp-config.development.php',
    // '!../../../../wp-config.env.php',
    // '!wp-admin{,/**}',
    // '!wp-content{,/**}',
    // '!wp-includes{,/**}',
    // '!../../../../../local.rural.ro/wiki{,/**}',
    // '!../rural-app/node_modules{,/**}',
    // '!vinylConfig.js',
    // '../../../../**/*',
  ];

  // Transfer newer files to remote host
  gulp.task('ftp', function() {
    'use strict';
    return gulp.src( globs, {
      // base: '.',
      buffer: true,
    })
    .pipe(conn.newer(''))
    .pipe(conn.dest(''));
  });

  // Wipe remote host
  gulp.task('ftp-wipe', function() {
    'use strict';
    conn.rmdir('.', function (err) {
      if (err) {
        console.log(err);
      }
    });
  });

  // Clean remote host of extra files *not working
  gulp.task('ftp-clean', function() {
    'use strict';
    conn.clean( './', 'dist/**/*', function (err) {
      if (err) {
        console.log(err);
      }
    });
  });

}
