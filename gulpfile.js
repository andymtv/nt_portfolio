const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('reload', function() {
  browserSync.reload();
})

gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe( autoprefixer({
          overrideBrowserslist: ['last 10 versions']
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream())
})

gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    // .pipe(uglify())
    .pipe(gulp.dest('js/'))
})
gulp.task('watch', gulp.series(['sass', 'js'], function() {
  gulp.watch('src/js/**/*.js', gulp.series(['js']));
  gulp.watch('src/scss/**/*.scss', gulp.series(['sass']));
}));

gulp.task('build', gulp.series(['js', 'sass']));

gulp.task('default', gulp.series(['build']));