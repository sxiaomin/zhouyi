// 引入
var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
// 引入内置模块
var url = require('url');
var fs = require('fs');
var path = require('path');

// 编译sass 及压缩
gulp.task('sass', function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest('src/css'))
})

// 起服务
gulp.task('server', ['sass'], function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }
        }))
})