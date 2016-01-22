var gulp = require('gulp');
var stylus = require('gulp-stylus');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');

gulp.task('style', function() {
  gulp.src('./styl/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./css'));

});

gulp.task('compress', function() {
  return gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('./styl/*.styl',['style'])
})

gulp.task('default', ['style'])
