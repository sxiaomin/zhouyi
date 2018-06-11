// 下载 引入
var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var clean = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var url = require('url');
var path = require('path');
var fs = require('fs');

// 起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            middleware: function(req, res, next) {
                // var pathname = url.parse(req.url).pathname;
                // if (pathname === '/favicon.ico') {
                //     return false;
                // }
                // pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')))
            }
        }))
});

// 编译scss合并压缩
gulp.task('sass', function() {
    gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(concat('concat.scss'))
        .pipe(clean())
        .pipe(gulp.dest('bulid/scss'))
});
// 合并压缩js
gulp.task('uglify', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('concat.js'))
        .pipe(uglify())
        .pipe(gulp.dest('bulid/js'))
});