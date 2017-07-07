'use strict';

/* -----------------------------------------
*
    Sass
*
----------------------------------------- */
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const csscomb = require('gulp-csscomb');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify-css');
const notifier = require('node-notifier');
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

gulp.task('scss', ()=> {
    gulp.src(config.docRoot.dev + config.scss.files)
    .pipe(plumber({errorHandler:errormsg}))
    .pipe(csscomb())
    .pipe(sass())
    .pipe(rename(function(path){path.dirname = path.dirname.replace(/scss/g, 'css')}))
    .pipe(autoprefixer({browsers: ["last 2 versions", "Android >= 4","ios_saf >= 8", "ie >= 9"]}))
    .pipe(minify())
    .pipe(gulp.dest(config.docRoot.pub))
    .on('finish', function(){
        console.log('            おめでとう!!!');
        console.log('  　(´・ω・`) 　C O M P I L E');
        console.log('＿(__つ /￣￣￣/ 　F I N I S H E D ★');
        console.log('   　＼/　　  /');
        console.log('       ￣￣￣');
    })
});