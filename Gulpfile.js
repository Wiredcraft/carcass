process.env.NODE_ENV = 'test';
process.env.DEBUG = 'carcass:*';
require('should');

var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var coffeelint = require('gulp-coffeelint');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

// Files.
var src = 'src/**/*.coffee';
var tests = 'test/*.mocha.js';

// Compile coffee scripts.
gulp.task('coffee', function() {
    return gulp.src(src)
        .pipe(coffeelint({
            max_line_length: {
                value: 100
            },
            indentation: {
                value: 4
            }
        }))
        .pipe(coffeelint.reporter())
        .pipe(coffee({
            bare: true
        }).on('error', gutil.log))
        .pipe(gulp.dest('lib'));
});

// Run jshint.
gulp.task('jshint', function() {
    return gulp.src(['Gulpfile.js', tests])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Run tests.
gulp.task('mocha', ['coffee', 'jshint'], function() {
    return gulp.src(tests)
        .pipe(mocha({
            reporter: 'spec'
        }));
});

// Run benchmark.
gulp.task('bm', ['coffee', 'jshint'], function() {
    return gulp.src('benchmark/*.js')
        .pipe(mocha({
            timeout: 120000,
            reporter: 'spec'
        }));
});

gulp.task('default', ['coffee', 'jshint', 'mocha']);

// Docs.
require('./docs/Gulpfile');
