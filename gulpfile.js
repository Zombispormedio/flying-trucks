const gulp = require('gulp')
const webpack = require('webpack-stream')
const mjml = require('gulp-mjml')
const gulpHtmlToEs6 = require("./gulp-html-to-es6")
const del = require("del")
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence')
const sourcemaps = require('gulp-sourcemaps');

gulp.task('mail', function () {
    return gulp.src('./src/mailer/template/*.mjml')
        .pipe(mjml())
        .pipe(gulpHtmlToEs6({
            concat: 'index.js'
        }))
        .pipe(gulp.dest('./src/mailer/template'))
})

gulp.task('webpack', function () {
    return gulp.src('.')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('build/'))
})

gulp.task('uglify', function () {
    return gulp.src('build/*.js')
    .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('build/min/'))
})

gulp.task('clean', function () {
    return del(['build', 'db.json', './src/mailer/template/*.js']);
})

gulp.task('default', function (cb) {
    runSequence(
        'clean',
        'mail',
        'webpack',
        'uglify',
        cb);
})