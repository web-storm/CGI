//dependecies
var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var filter = require('gulp-filter');
var htmlminify = require('gulp-minify-html');
var mainBowerFiles = require('main-bower-files');
var $ = require("gulp-load-plugins")({
    lazy: true,
    pattern: [
        "gulp-*",
        "gulp.*",
        "main-bower-files"
    ]
});

//paths
var basePaths = {
    src: 'src/',
    dest: 'build/',
    bower: 'bower_components/'
};
var paths = {
    js: {
        src: basePaths.src + 'js/',
        devDest: basePaths.dest + 'development/js/',
        prodDest: basePaths.dest + 'production/js/'
    },
    styles: {
        src: basePaths.src + 'css/',
        devDest: basePaths.dest + 'development/css/',
        prodDest: basePaths.dest + 'production/css/'
    },
    html: {
        src: basePaths.src,
        devDest: basePaths.dest + 'development/',
        prodDest: basePaths.dest + 'production/'
    }
};

//development and production cleaning up
gulp.task('build-dev-clean', function() {
    return del.sync([paths.js.devDest, paths.styles.devDest, paths.html.devDest]);
});
gulp.task('build-prod-clean', function() {
    return del.sync([paths.js.prodDest, paths.styles.prodDest, paths.html.prodDest]);
});

//development build
gulp.task('build-bower-dev', function() {
    var jsFilter = $.filter('*.js', {restore: true});
    var cssFilter = $.filter('*.css', {restore: true});

    return gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(gulp.dest(paths.js.devDest))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(gulp.dest(paths.styles.devDest));
});
gulp.task('build-js-dev', function() {
    return gulp.src(paths.js.src+'*.js')
        .pipe($.jshint())// - улучшение js
        .pipe(gulp.dest(paths.js.devDest));
});
gulp.task('build-css-dev', function() {
    return gulp.src(paths.styles.src+'*.css')
        .pipe(gulp.dest(paths.styles.devDest));
});
gulp.task('build-html-dev', function() {
    return gulp.src(paths.html.src+'*.html')
        .pipe(gulp.dest(paths.html.devDest));
});
gulp.task('build-dev', function() {
    runSequence('build-dev-clean',
        ['build-js-dev', 'build-css-dev', 'build-bower-dev'],
        'build-html-dev');
});

//production build
gulp.task('build-bower-prod', function() {
    var jsFilter = $.filter('*.js', {restore: true});
    var cssFilter = $.filter('*.css', {restore: true});
    return gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe($.concat('all.min.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(paths.js.prodDest))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.uncss({ html: [paths.html.src+'index.html'] }))
        .pipe($.csso())
        .pipe($.rename('bootstrap.min.css'))
        .pipe(gulp.dest(paths.styles.prodDest));
});
gulp.task('build-js-prod', function() {
    return gulp.src(paths.js.src+'*.js')
        .pipe($.jshint())// - улучшение js
        .pipe($.uglify())
        .pipe($.rename('script.min.js'))
        .pipe(gulp.dest(paths.js.prodDest));
});
gulp.task('build-css-prod', function() {
    return gulp.src(paths.styles.src+'*.css')
        .pipe($.uncss({ html: [paths.html.src+'index.html'] }))
        .pipe($.csso())
        .pipe($.rename('style.min.css'))
        .pipe(gulp.dest(paths.styles.prodDest));
});
gulp.task('build-html-prod', function() {
    return gulp.src(paths.html.src+'*.html')
        .pipe($.processhtml({}))
        .pipe(htmlminify({}))
        .pipe(gulp.dest(paths.html.prodDest));
});
gulp.task('build-prod', function() {
    runSequence('build-prod-clean',
    ['build-js-prod', 'build-css-prod', 'build-bower-prod',
    'build-html-prod']);
});

//default actions
gulp.task('default', function() {
    runSequence('build-dev', 'build-prod');
});

gulp.task('watch', function() {
    gulp.watch(paths.styles.src + "*.css", ['build-css-dev']);
    gulp.watch(paths.html.src + "*.html", ['build-html-dev']);
    gulp.watch(basePaths.bower, ['build-bower-dev']);
});
