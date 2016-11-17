var requireDir = require('require-dir');
var devip = require('dev-ip');

// // TravisCI task
// gulp.task('dev-ci', function(callback) {
//   'use strict';
//   runSequence(
//     'clean:dev', ['sprites', 'lint:js', 'lint:scss'], ['sass', 'nunjucks'],
//     callback
//   );
// });

requireDir('./gulp/tasks');
