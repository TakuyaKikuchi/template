'use strict';

/* -----------------------------------------
*
    BrowserSync
*
----------------------------------------- */
const gulp = require('gulp');
const browserSync = require('browser-sync');
const ssi = require('connect-ssi');
const config = require('../../config');

gulp.task("browserSync", ()=> {
    browserSync({
        notify: true,
        server: {
            baseDir: config.docRoot.pub
        },
        open: 'external',
        startPath: '/',
        middleware: [
        ssi({
            baseDir: config.docRoot.pub,
            ext: ".html"
        })
        ]
    });
});