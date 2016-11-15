var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var spritesmith = require('gulp.spritesmith');
var gulpIf = require('gulp-if');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var fs = require('fs');
var del = require('del');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var sassLint = require('gulp-sass-lint');
// var csscomb = require('gulp-csscomb');
var Server = require('karma').Server;
var gutil = require('gulp-util');

var devip = require('dev-ip');

gulp.task('hello', function() {
  'use strict';
  console.log('Hello Andrei');
});

// Custom Plumber function for catching errors
function customPlumber(errTitle) {
  'use strict';
  if (process.env.CI) {
    return plumber({
      errorHandler: function(err) {
        throw Error(gutil.colors.red(err.message));
      }
    });
  } else {
    return plumber({
      errorHandler: notify.onError({
        // Customizing error title
        title: errTitle || 'Error running Gulp',
        message: 'Error: <%= error.message %>',
      })
    });
  }
}

// Browser Sync
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

// Compiles Sass to CSS
gulp.task('sass', function() {
  'use strict';
  return gulp.src('app/scss/**/*.scss')
  .pipe(customPlumber('Error Running Sass'))
  .pipe(sourcemaps.init())
  .pipe(sass({
    precision: 2,
    includePaths: [
      'app/bower_components',
      'node_modules'
    ]
  }))
  .pipe(autoprefixer())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

// Sprites
gulp.task('sprites', function() {
  'use strict';
  gulp.src('app/images/sprites/**/*')
  .pipe(spritesmith({
    cssName: '_sprites.scss',
    imgName: 'sprites.png',
    imgPath: '../images/sprites.png',
    retinaSrcFilter: 'app/images/sprites/*@2x.png',
    retinaImgName: 'sprites@2x.png',
    retinaImgPath: '../images/sprites@2x.png'
  }))
  .pipe(gulpIf('*.png', gulp.dest('app/images')))
  .pipe(gulpIf('*.scss', gulp.dest('app/scss')));
});

// Watchers files for changes
gulp.task('watch', function() {
  'use strict';
  gulp.watch('app/scss/**/*.scss', ['sass'], ['lint-scss']);
  gulp.watch('app/js/**/*.js', ['lint:js']);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  // gulp.watch('app/*.html', browserSync.reload); // Not needed when using a templating engine
  gulp.watch([
    'app/pages/**/*.+(html|nunjucks)',
    'app/templates/**/*',
    'app/data.json'
  ], ['nunjucks']);
});

// Templating
gulp.task('nunjucks', function() {
  'use strict';
  return gulp.src('app/pages/**/*.+(html|nunjucks)')
  .pipe(customPlumber('Error Running Nunjucks'))
  .pipe(data(function() {
    return JSON.parse(fs.readFileSync('./app/data.json'));
  }))
  .pipe(nunjucksRender({
    path: ['app/templates']
  }))
  .pipe(gulp.dest('app'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

// Lint Javascript
gulp.task('lint:js', function() {
  'use strict';
  return gulp.src('app/js/**/*.js')
  .pipe(customPlumber('JSHint Error'))
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail', {
    ignoreWarning: true,
    ignoreInfo: true
  }))
  .pipe(jscs({
    fix: true,
    configPath: '.jscsrc'
  }))
  .pipe(gulp.dest('app/js'));
});

// Lint SCSS with gulp-sass-lint
gulp.task('lint:scss', function() {
  'use strict';
  return gulp.src('app/scss/**/*.s+(a|c)ss')
  .pipe(sassLint({
    // options: {
    //   formatter: 'stylish'
    // },
    files: {
      ignore: ([
        'app/scss/_sprites.scss',
        // 'app/scss/print.scss',
      ])
    },
    configFile: '.sass-lint.yml'
  }));
  // .pipe(sassLint.format())
  // .pipe(sassLint.failOnError());
});

// Lint SCSS with gulp-csscomb : It's better to run CSSComb in the IDE
// gulp.task('lint:scss', function() {
//   'use strict';
//   return gulp.src('app/scss/**/*.s+(a|c)ss')
//   .pipe(csscomb())
//   .pipe(gulp.dest('app/scss'));
// });

// Karma
gulp.task('test', function(done) {
  'use strict';
  new Server({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

// Clean
gulp.task('clean:dev', function() {
  'use strict';
  return del.sync([
    'app/css',
    'app/*.html',
  ]);
});

// Consolidated dev phase task
gulp.task('default', function(callback) {
  'use strict';
  runSequence(
    'clean:dev', ['sprites', 'lint:js', 'lint:scss'], ['sass', 'nunjucks'], ['browserSync', 'watch'],
    callback
  );
});

// TravisCI task
gulp.task('dev-ci', function(callback) {
  'use strict';
  runSequence(
    'clean:dev', ['sprites', 'lint:js', 'lint:scss'], ['sass', 'nunjucks'],
    callback
  );
});
