const { src, dest } = require('gulp'),
    // concat = require('gulp-concat'),
    // babel = require('gulp-babel'),
    uglify = require('gulp-uglify-es').default,
    webpack = require('webpack-stream'),
    rename = require("gulp-rename"),
    notify = require('gulp-notify'),
    sourceMaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').get('main-server'),
    log = require('gulplog');
// Пути
const path = require('../path').default;


//js
{
    const js__dev = () => {
        return src(path.js.main)
            .pipe(sourceMaps.init())
            .pipe(webpack(require('../../config/webpack/dev.js')))
            .pipe(sourceMaps.write())
            .pipe(dest('dist/js'))
            .pipe(notify({ title: "Success", message: "Well Done!", sound: "Glass" }))
            .pipe(browserSync.stream())
    }

    const js__prod = () => {
        return src(path.js.main)
            .pipe(webpack(require('../../config/webpack/prod.js')))
            .pipe(dest('dist/js'))
    }
    exports.js__tasks = {
        prod: js__prod,
        dev: js__dev
    }
}
