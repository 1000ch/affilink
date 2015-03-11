var gulp = require('gulp');

var SRC_FILES = './src/*.js';
var DIST_FILES = './lib/';

gulp.task('lint', function () {

  var eslint = require('gulp-eslint');

  gulp.src(SRC_FILES)
    .pipe(eslint({
      useEslintrc: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

});

gulp.task('build', function () {

  var babel  = require('gulp-babel');

  gulp.src(SRC_FILES)
    .pipe(babel({
      experimental : false
    }))
    .pipe(gulp.dest(DIST_FILES));

});

gulp.task('watch', function () {

  gulp.watch(SRC_FILES, function() {
    gulp.start('lint', 'build');
  });

});