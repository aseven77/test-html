const { src, dest, parallel, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const cssbeautify = require('gulp-cssbeautify');
const browserSync = require('browser-sync');
const csscomb = require('gulp-csscomb');
const gcmq = require('gulp-group-css-media-queries');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const svgstore = require('gulp-svgstore');
const cssnano = require('gulp-cssnano');
const listing = require('gulp-listing');


function browser_sync() {
    browserSync({
        server: {
            baseDir: "app/"
        },
        notify: false
    });
}

function pages() {
    return src('assets/page/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(dest('app/'))
        .pipe(browserSync.reload({ stream: true }));
}

function scss() {
    return src('assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(gcmq())
        .pipe(csscomb())
        .pipe(cssbeautify())
        .pipe(dest('app/style'))
        .pipe(browserSync.reload({ stream: true }));
}

function scripts() {
    return src([
        'assets/libs/noUiSlider-master/dist/nouislider.min.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'));
}

function jsscript() {
    return src([
        'assets/js/*.js'
    ])
        .pipe(dest('app/js'))
        .pipe(browserSync.reload({ stream: true }));
}

function css_libs() {
    return src([
        'node_modules/normalize.css/normalize.css',
        'assets/libs/noUiSlider-master/dist/nouislider.min.css'
    ])
        .pipe(cssnano())
        .pipe(concat('libs.min.css'))
        .pipe(dest('app/style'));
}

function svgSprites() {
    return src('assets/sprite/*.svg')
        .pipe(svgstore())
        .pipe(dest('app/images'));
}

function listing_file() {
    return src('app/*.html')
        .pipe(listing('index.html'))
        .pipe(dest('app/'));
}


function watchFiles() {
    watch([
        "assets/page/**/*",
        "assets/blocks/**/*.pug"
    ], pages);
    watch("assets/scss/**/*", scss);
    watch("assets/blocks/**/*.scss", scss);
    watch("assets/component/**/*.scss", scss);
    watch("assets/js/*.js", jsscript);
}

exports.default = parallel(watchFiles, scripts, css_libs, jsscript, browser_sync);
exports.svgSprites = svgSprites;
exports.listing_file = listing_file;