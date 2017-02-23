var
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create(),
  cached = require('gulp-cached'),
  cleanCSS = require('gulp-clean-css'),
  del = require('del'),
  gulp = require('gulp'),
  newer = require('gulp-newer'),
  paths,
  rename = require('gulp-rename'),
  run = require('gulp-run'),
  runSequence = require('run-sequence'),
  sass = require('gulp-sass'),
  sassLint = require('gulp-sass-lint'),
  sourceMaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify');

paths = new (function paths() {
  this.src = './src';
  this.dist = './dist';

  this.stylesSrc = this.src + '/';
  this.stylesDist = this.dist + '/css';
})();

gulp.task( 'sass:main', function sassMain() {
  return gulp
    .src( paths.stylesSrc + '/main.scss' )
      .pipe( sourceMaps.init() )
    .pipe( sass({ outputStyle: 'compressed' }) )
    .pipe( cleanCSS() )
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe( sourceMaps.write('.') )
    .pipe( rename({ suffix: '.min' }) )
    .pipe( gulp.dest( paths.stylesDist ) );
});

gulp.task( 'watch', function watch() {
  gulp.watch( paths.stylesSrc + '/vendor.scss', ['sass:vendor'] );

  gulp.watch([
    paths.stylesSrc + '/main.scss',
    paths.stylesSrc + '/*/*.scss',

  ], ['sass:main'] );

  gulp.watch( paths.scriptsSrc + '/**/*.js', ['js:main'] );
});

gulp.task( 'default', ['watch'] );
