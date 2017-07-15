'use strict';

/* -----------------------------------------
*
    image
*
----------------------------------------- */
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const cached = require('gulp-cached');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const pngquant  = require('imagemin-pngquant');
const config = require('../../config.json');

const errormsg = function(error) {
    notifier.notify({
        message: error.message,
        time: 5000,
        sound: 'Pop',
        title: 'エラー',
        appIcon: __dirname + '/appIcon/icon.png'
    }, function() {
        console.log(error.message);
    });
};

gulp.task('image', function() {
    return gulp.src(config.docRoot.dev + config.image.files)
    .pipe(plumber({errorHandler:errormsg}))
    .pipe(cached('image'))
    .pipe(changed(config.docRoot.pub + config.image.files))
    .pipe(imagemin({
        use: [pngquant()],
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest(path.pub))
});