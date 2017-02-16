var gulp = require('gulp');

var src = './src/**/*.js';
gulp.task('umd', function() {
    var umdwrap = require('gulp-umd');
    gulp.src(src)
        .pipe(umdwrap())
        .pipe(gulp.dest('./dist/'));
});