'use strict';

/* -----------------------------------------
*
    watch
*
----------------------------------------- */
const gulp = require('gulp');
const config = require('../../config.json');

gulp.task('watch', ()=> {
  gulp.watch(config.docRoot.dev + config.watch.pug,['pug' ,'reload']);
  gulp.watch(config.docRoot.dev + config.watch.scss,['scss' ,'reload']);
  gulp.watch(config.docRoot.dev + config.watch.js,['js' ,'reload']);
  gulp.watch(config.docRoot.dev + config.watch.img,['image' ,'reload']);
});