var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var serve = require('gulp-serve');

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

var docs = require('./src/docs.json');

function buildIndex(files, metalsmith, done) {
    var metadata = metalsmith.metadata();
    metadata.index = {};
    var key;
    for (key in docs) {
        metadata.index[key] = docs[key].title;
    }
    done();
}

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
        .use(collections(docs))
        .use(buildIndex)
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

// Dist.
gulp.task('dist', function(done) {
    metalsmith({}, done);
});

// Default.
gulp.task('default', ['preview']);

// Preview.
gulp.task('preview', ['preview-docs', 'preview-server'], function() {
    gulp.watch([
        root + '/src/**',
        root + '/templates/**'
    ], ['preview-docs']);
});

// Preview.
gulp.task('preview-docs', function(done) {
    metalsmith({
        destination: 'preview',
        meta: 'meta.preview.yaml'
    }, done);
});

// Preview.
gulp.task('preview-server', serve({
    root: root + '/preview',
    port: 4321
}));

// Vendor.
gulp.task('vendor', ['vendorJS', 'vendorCSS']);

// Vendor.
gulp.task('vendorJS', function() {
    return gulp
        .src([
            root + '/bower_components/jquery/dist/jquery.js',
            root + '/bower_components/bootstrap/js/scrollspy.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(root + '/src/assets'));
});

// Vendor.
gulp.task('vendorCSS', function() {
    return gulp
        .src([
            root + '/bower_components/normalize-css/normalize.css'
        ])
        .pipe(concat('vendor.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(root + '/src/assets'));
});
