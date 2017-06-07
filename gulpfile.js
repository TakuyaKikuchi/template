// 共通
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var notify = require("gulp-notify");
// html
var htmlhint = require('gulp-htmlhint');
var pug = require('gulp-pug');
// Sass
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var ssi = require('connect-ssi');
var pleeease = require('gulp-pleeease');
var csscomb = require('gulp-csscomb');
// JS
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");
// image
var clean = require('gulp-clean');
var vinylPaths = require('vinyl-paths');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var pngquant  = require('imagemin-pngquant');
var cached = require('gulp-cached');
var del = require('del');

var path = {
  dist: 'htdocs/assets/',
  top: 'htdocs/',
  dev: 'htdocs_dev/assets/',
  pub: 'htdocs_dev/'
}

// BrowserSync
gulp.task("browserSync", function() {
  browserSync({
    notify: false,
    server: {
      baseDir: path.pub,
    },
    open: 'external',
    startPath: '/',
    middleware: [
    ssi({
      baseDir: path.pub,
      ext: ".html"
    })
    ]
  });
  gulp.watch(path.pub + '**/*', function() {
    browserSync.reload();
  });
});

// html
gulp.task('html', function() {
  console.log('ok');
  gulp.src(path.pub + '**/*.html')
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(htmlhint())
  .pipe(gulp.dest(path.top + ''))
})

// Sass
gulp.task('scss', function() {
  gulp.src(path.dev + 'sass/**/*.scss')
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(cached('scss'))
  .pipe(csscomb())
  .pipe(sass({
    outputStyle: 'expanded'
  }))
  .pipe(autoprefixer({
    browsers: ["last 2 versions", "Android >= 4","ios_saf >= 8", "ie >= 9"]
  }))
  .pipe(gulp.dest(path.dev + 'css'))
  .pipe(minify())
  .pipe(gulp.dest(path.dist + 'css'))
});

// del
gulp.task('clean', function() {
  del([path.dist + 'img/**/*']);
});

// images
gulp.task('image', function() {
  gulp.src(path.dev + 'img/**/*')
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(cached('image'))
  .pipe(changed(path.dist + 'img/**/*'))
  .pipe(imagemin({
    use: [pngquant()],
    progressive: true,
    interlaced: true
  }))
  .pipe(gulp.dest(path.dist + 'img'))
});

// JS
gulp.task('js', function() {
  gulp.src(path.dev + 'js/**/*.js')
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(babel())
  .pipe(uglify())
  .pipe(gulp.dest(path.dist + 'js'))
});

// pug
gulp.task('pug', function() {
  gulp.src(path.pub + 'pug/**/*.pug')
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest(path.top + ''));
});

gulp.task('copyDev', function() {
  gulp.src([path.dist + 'css/*'])
  .pipe(gulp.dest(path.top + 'css'));
  gulp.src([path.dist + 'image/*'])
  .pipe(gulp.dest(path.top + 'image'));
  gulp.src([path.dist + 'js/*'])
  .pipe(gulp.dest(path.top + 'js'));
});

gulp.task('watch', function() {
  gulp.watch(path.pub + '**/*.html',['html'])
  gulp.watch(path.pub + 'pug/**/*.pug',['pug']);
  gulp.watch(path.dev + 'sass/**/*.scss',['scss']);
  gulp.watch(path.dev + 'js/**/*.js',['js']);
  gulp.watch(path.dev + 'img/**/*',['image']);
});
gulp.task('default', ['watch', 'browserSync', 'clean', 'image']);