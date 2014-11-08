process.env.NODE_ENV = 'test';
process.env.DEBUG = 'carcass:*';
require('should');

var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var coffeelint = require('gulp-coffeelint');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var coverage = require('gulp-coverage');

// Files.
var src = 'src/**/*.coffee';
var tests = 'test/*.mocha.js';

// Compile coffee scripts.
gulp.task('coffee', function() {
    return gulp.src(src)
        .pipe(coffee({
            bare: true
        }).on('error', gutil.log))
        .pipe(gulp.dest('lib'));
});

// Lint (or hint as an alias).
gulp.task('lint', ['coffeelint', 'jshint']);
gulp.task('hint', ['coffeelint', 'jshint']);
gulp.task('coffeelint', function() {
    return gulp.src(src)
        .pipe(coffeelint())
        .pipe(coffeelint.reporter());
});
gulp.task('jshint', function() {
    return gulp.src(['Gulpfile.js', tests, 'benchmark/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Run tests.
gulp.task('mocha', ['coffee'], function() {
    return gulp.src(tests)
        .pipe(coverage.instrument({
            pattern: ['lib/**/*.js'],
            debugDirectory: 'test/debug'
        }))
        .pipe(mocha({
            reporter: 'spec'
        }))
        .pipe(coverage.report({
            outFile: 'test/coverage.html'
        }));
});

// Run benchmark.
gulp.task('bm', ['coffee'], function() {
    return gulp.src('benchmark/*.js')
        .pipe(mocha({
            timeout: 120000,
            reporter: 'spec'
        }));
});

gulp.task('default', ['coffeelint', 'jshint', 'coffee', 'mocha']);
