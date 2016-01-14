/* */ 
(function(process) {
  var gulp = require('gulp');
  var eslint = require('gulp-eslint');
  var gulpIf = require('gulp-if');
  var fix = false;
  function isFixed(file) {
    return file.eslint != null && file.eslint.fixed;
  }
  gulp.task('eslint:src', function() {
    return gulp.src(['src/**']).pipe(eslint({fix: fix})).pipe(eslint.format()).pipe(eslint.failAfterError()).pipe(gulpIf(isFixed, gulp.dest('src')));
  });
  gulp.task('eslint:docs', function() {
    return gulp.src(['docs/src/**/*.{js,jsx}']).pipe(eslint({fix: fix})).pipe(eslint.format()).pipe(eslint.failAfterError()).pipe(gulpIf(isFixed, gulp.dest('docs/src')));
  });
  gulp.task('eslint:test', function() {
    return gulp.src(['test/**/*.{js,jsx}']).pipe(eslint({fix: fix})).pipe(eslint.format()).pipe(eslint.failAfterError()).pipe(gulpIf(isFixed, gulp.dest('test')));
  });
})(require('process'));
