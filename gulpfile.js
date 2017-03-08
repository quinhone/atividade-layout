var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var del = require('del');
var sass = require('gulp-sass');

gulp.task('compilar-css', function () {

    gulp.src('./source/scss/style.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./dist/css'));

    gulp.src('./source/img/*')
        .pipe(gulp.dest('./dist/img'));
});
 
gulp.task('minify-html', function() {
  return gulp.src('./source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('del-dist-css', function(){
	del('./dist/**/*');
});

gulp.task('watch-dev', ['del-dist-css'], function () {
    gulp.start(
        'compilar-css', 'minify-html'
    );
    gulp.watch('./source/scss/*.scss', ['compilar-css']);
    gulp.watch('./source/*.html', ['minify-html']);
});