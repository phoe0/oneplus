let gulp = require('gulp');
let sass = require('gulp-sass');
let watch = require('gulp-watch');

// 定义任务，将sass转化为css；
gulp.task('sass', function () {
    return gulp.src('./sass/*.scss').pipe(sass()).pipe(gulp.dest('./css/'));
});

// 定义监听任务
gulp.task('watch-sass', function (done) {
    // 监听 sass目录下的scss文件的改变，然后执行sass任务；
    watch('./sass/*.scss', gulp.parallel('sass'));
    done();
})