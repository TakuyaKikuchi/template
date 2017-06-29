/* -----------------------------------------
共通
----------------------------------------- */
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var notify = require("gulp-notify");
var rename = require("gulp-rename")
var gutil = require('gulp-util');

/* -----------------------------------------
html
----------------------------------------- */
var htmlhint = require('gulp-htmlhint');
var pug = require('gulp-pug');
/* -----------------------------------------
Sass
----------------------------------------- */
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var ssi = require('connect-ssi');
var pleeease = require('gulp-pleeease');
var csscomb = require('gulp-csscomb');
var rename = require('gulp-rename');
/* -----------------------------------------
JS
----------------------------------------- */
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");
/* -----------------------------------------
image
----------------------------------------- */
var clean = require('gulp-clean');
var vinylPaths = require('vinyl-paths');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var pngquant  = require('imagemin-pngquant');
var cached = require('gulp-cached');
var del = require('del');
/* -----------------------------------------
root path
----------------------------------------- */
var path = {
  pub: 'htdocs/',
  dev: 'htdocs_dev/'
}
/* -----------------------------------------
*
    BrowserSync
*
----------------------------------------- */
gulp.task("browserSync", function () {
  browserSync({
    notify: true,
    server: {
      baseDir: 'htdocs/'
    },
    open: 'external',
    startPath: '/',
    middleware: [
    ssi({
      baseDir: "htdocs/",
      ext: ".html"
    })
    ]
  });
});
/* -----------------------------------------
*
    reload
*
----------------------------------------- */
gulp.task('reload', function(){
  browserSync.reload();
});
/* -----------------------------------------
*
    pug
*
----------------------------------------- */
gulp.task('pug', function(){
  return gulp.src(path.dev + '**/*.pug')
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(pug({
    pretty: true
  }))
  .pipe(rename(function (path) {
    path.dirname = path.dirname.replace(/pug/g, '/');
  }))
  .pipe(gulp.dest(path.pub))
  .on('end', function(){
    console.log('            おめでとう!!!');
    console.log('  　(´・ω・`) 　C O M P I L E');
    console.log('＿(__つ /￣￣￣/ 　F I N I S H E D ★');
    console.log('   　＼/　　  /');
    console.log('       ￣￣￣');
  })
});
/* -----------------------------------------
*
    Sass
*
----------------------------------------- */
gulp.task('scss', function() {
  return gulp.src(path.dev + '**/*.scss')
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(csscomb())
  .pipe(sass())
  .pipe(rename(function (path) {
    path.dirname = path.dirname.replace(/scss/g, 'css');
  }))
  .pipe(autoprefixer({
    browsers: ["last 2 versions", "Android >= 4","ios_saf >= 8", "ie >= 9"]
  }))
  .pipe(minify())
  .pipe(gulp.dest(path.pub))
  .on('end', function(){
    console.log('            おめでとう!!!');
    console.log('  　(´・ω・`) 　C O M P I L E');
    console.log('＿(__つ /￣￣￣/ 　F I N I S H E D ★');
    console.log('   　＼/　　  /');
    console.log('       ￣￣￣');
  })
});
/* -----------------------------------------
*
    del
*
----------------------------------------- */
gulp.task('clean', function() {
  del([path.dev + '**/images/*']);
});
/* -----------------------------------------
*
    images
*
----------------------------------------- */
gulp.task('image', function() {
  return gulp.src(path.dev + '**/images/*')
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(cached('image'))
  .pipe(changed(path.pub + '**/images/*'))
  .pipe(imagemin({
    use: [pngquant()],
    progressive: true,
    interlaced: true
  }))
  .pipe(gulp.dest(path.pub))
});
/* -----------------------------------------
*
    JS
*
----------------------------------------- */
gulp.task('js', function() {
  return gulp.src(path.dev + '**/*.js')
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(uglify())
  .pipe(gulp.dest(path.pub))
  .on('end', function(){
    console.log('            おめでとう!!!');
    console.log('  　(´・ω・`) 　C O M P I L E');
    console.log('＿(__つ /￣￣￣/ 　F I N I S H E D ★');
    console.log('   　＼/　　  /');
    console.log('       ￣￣￣');
  })
});
/* -----------------------------------------
*
    watch
*
----------------------------------------- */
gulp.task('watch', function() {
  gulp.watch(path.dev + '**/*.pug',['reload', 'pug']);
  gulp.watch(path.dev + '**/*.scss',['reload', 'scss']);
  gulp.watch(path.dev + '**/*.js',['reload', 'js']);
  gulp.watch(path.dev + '**/images/*',['image']);
});

gulp.task('default', ['watch', 'browserSync']);