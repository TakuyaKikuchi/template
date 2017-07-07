'use strict';

/* -----------------------------------------
*
    JS
*
----------------------------------------- */
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const uglify = require("gulp-uglifyjs");
const notifier = require('node-notifier');
const stripDebug = require('gulp-strip-debug')
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

gulp.task('js', function() {
    gulp.src(config.docRoot.dev + config.js.files)
    .pipe(plumber({errorHandler:errormsg}))
    .pipe(stripDebug())
    .pipe(uglify({outSourceMap: true}))
    .pipe(gulp.dest(config.docRoot.pub))
    .on('finish', function(){
        console.log('            おめでとう!!!');
        console.log('  　(´・ω・`) 　C O M P I L E');
        console.log('＿(__つ /￣￣￣/ 　F I N I S H E D ★');
        console.log('   　＼/　　  /');
        console.log('       ￣￣￣');
    })
});