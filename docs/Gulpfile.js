var gulp = require('gulp');
var serve = require('gulp-serve');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

var Metalsmith = require('metalsmith');
var collections = require('metalsmith-collections');
var ignore = require('metalsmith-ignore');
var markdown = require('metalsmith-markdown');
var metadata = require('metalsmith-metadata');
var sass = require('metalsmith-sass');
var templates = require('metalsmith-templates');

var highlight = require('highlight.js');

var path = require('path');
var root = path.resolve(__dirname);

// Metalsmith.
function metalsmith(options, done) {
    Metalsmith(root)
        .destination(options.destination || 'build')
        .use(metadata({
            meta: options.meta || 'meta.yaml'
        }))
        .use(sass({
            outputStyle: 'compressed'
        }))
        .use(collections({
            api: {
                pattern: 'api/*.md',
                sortBy: 'weight'
            }
        }))
        .use(markdown({
            gfm: true,
            highlight: function(code, lang) {
                if (lang) return highlight.highlight(lang, code).value;
                return highlight.highlightAuto(code).value;
            }
        }))
        .use(templates('jade'))
        .use(ignore([
            '**/_*',
            '*.yaml'
        ]))
        .build(done);
}

// Vendor.
gulp.task('vendor', function() {
    return gulp
        .src([
            root + 'bower_components/normalize-css/normalize.css'
        ])
        .pipe(concat('vendor.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(root + '/src/assets'));
});

// Docs.
gulp.task('docs', function(done) {
    metalsmith({}, done);
});

// Preview.
gulp.task('preview', ['preview-docs', 'preview-server'], function() {
    gulp.watch([
        root + '/src/**',
        root + '/templates/**'
    ], ['preview-docs']);
});

// Docs.
gulp.task('preview-docs', function(done) {
    metalsmith({
        destination: 'preview',
        meta: 'meta.preview.yaml'
    }, done);
});

// Server.
gulp.task('preview-server', serve(root + '/preview'));
