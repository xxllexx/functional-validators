var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    replace = require('gulp-replace'),
    fs = require('fs'),
    karma = require('karma').server,
    rename = require('gulp-rename'),
    del = require('del'),
    wrapper = require('gulp-wrapper');

var header = "(function(mod) {\n"+
    "\tif (typeof exports === 'object' && typeof module === 'object')\n" +
    "\t\tmodule.exports = mod();\n" +
    "\telse if (typeof define === 'function' && define.amd)\n" +
    "\t\treturn define([], mod);\n" +
    "\telse\n" +
    "\t\tthis.V = mod();\n" +
    "})(function() {\n" +
    "\t'use strict';\n";

var footer = "\n\treturn initValidators(getBaseValidatorFunctions(), getValidators());\n});";


gulp.task('clean', function(cb) {
    del(['build'], cb);
});

gulp.task('lint', function() {
    return gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('build', ['test', 'lint'], function () {
    var DIST = 'dist';

    return gulp.src(['./src/**/*.js'])
        .pipe(concat('v.js'))
        .pipe(wrapper({
            header: header,
            footer: footer
        }))
        .pipe(gulp.dest(DIST))
        .pipe(uglify().on('error', function(e) {
            console.error('ERROR', e.message);
            process.exit(1);
        }))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(DIST));
});

gulp.task('default', ['build']);
