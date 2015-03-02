var gulp = require('gulp');
var xss = require('./');

gulp.task('default', function () {
    return gulp.src('src/app.js')
        .pipe(xss())
        .pipe(gulp.dest('dist'));
});