const {src, dest, series } = require('gulp');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');

const sass = require('gulp-sass')(require('sass'));

function streamHtml(){
    return src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(dest('dest'));
}
function streamSass(){
    return src('css/style.sass')
    .pipe(
        sass({
            outputStyle: "compressed"
        }).on('error', sass.logError)
    )
    .pipe(dest('dest/css'));
} 
function copyJSFiles(){
    return src('js/*.js')
    .pipe(gulpIf('js/*.js', uglify()))
    .pipe(minify())
    .pipe(dest('dest/js'));
}
function copyImages(){
    return src('images/*.png')
    .pipe(dest('dest/images'));
}
exports.groupMethod = series(streamHtml,streamSass,copyJSFiles,copyImages);