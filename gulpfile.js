// 共通
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');

// html
var htmlhint = require('gulp-htmlhint');

// Sass
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var ssi = require('connect-ssi');

// csscomb
var csscomb = require('gulp-csscomb');

// pug
var pug = require('gulp-pug');

// JSのminify
var uglify = require("gulp-uglify");

// babel
var babel = require("gulp-babel");

// image
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var pngquant  = require('imagemin-pngquant');

// del
var del = require('del');
var clean = require('gulp-clean');
var vinylPaths = require('vinyl-paths');

const path = {
  dist: 'htdocs/assets/',
  top: 'htdocs/',
  dev: 'htdocs_dev/assets/',
  pub: 'htdocs_dev/'
}

// BrowserSync
gulp.task("browserSync", () => {
  browserSync({
    notify: false,
    server: {
      baseDir: 'htdocs/'
    },
    startPath: '/',
    middleware: [
    ssi({
      baseDir: "htdocs/",
      ext: ".html"
    })
    ]
  });
  // htmlに変更があった時リロード
  gulp.watch(path.top + '**/*.html', function() {
    console.log('ブラウザリロード！');
    browserSync.reload();
  });
  // cssに変更があった時リロード
  gulp.watch(path.dist + '/css/**/*.css', function() {
    console.log('ブラウザリロード！');
    browserSync.reload();
  });
  // jsに変更があった時リロード
  gulp.watch(path.dist + '/js/**/*.js', function() {
    console.log('ブラウザリロード！');
    browserSync.reload();
  });
});

// html
gulp.task('html', () => {
  console.log('ok');
  gulp.src(path.pub + '**/*.html')
  .pipe(htmlhint())
  .pipe(gulp.dest(path.top + ''))
})

// Sass
gulp.task('scss', () => {
  gulp.src(path.dev + 'sass/**/*.scss')
  .pipe(plumber())
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
gulp.task('clean', () => {
  del([path.dist + 'img/**/*']);
});

// images
gulp.task('image', () => {
  gulp.src(path.dev + 'img/**/*')
  .pipe(changed(path.dev + 'img/**/*'))
  .pipe(imagemin({
    use: [pngquant()],
    progressive: true,
    interlaced: true
  }))
  .pipe(gulp.dest(path.dist + 'img'))
});

// JS
gulp.task('js', () => {
  gulp.src(path.dev + 'js/**/*.js')
  .pipe(plumber())
  .pipe(babel())
  .pipe(uglify())
  .pipe(gulp.dest(path.dist + 'js'));
});

pug
gulp.task('pug', () => {
  gulp.src(path.pub + 'pug/**/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest(path.top + ''));
});


gulp.task('copyDev', () => {
  gulp.src([path.dist + 'css/*'])
  .pipe(gulp.dest(path.top + 'css'));
  gulp.src([path.dist + 'image/*'])
  .pipe(gulp.dest(path.top + 'image'));
  gulp.src([path.dist + 'js/*'])
  .pipe(gulp.dest(path.top + 'js'));
});

gulp.task('watch', () => {
  gulp.watch(path.pub + '**/*.html',['html'])
  gulp.watch(path.pub + 'pug/**/*.pug',['pug']);
  gulp.watch(path.dev + 'sass/**/*.scss',['scss']);
  gulp.watch(path.dev + 'js/**/*.js',['js']);
  gulp.watch(path.dev + 'img/**/*',['image']);
});
gulp.task('default', ['watch', 'browserSync', 'clean', 'image']);