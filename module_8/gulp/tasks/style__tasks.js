const { src, dest } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const fonter = require('gulp-fonter');
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const sourceMaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').get('main-server')
    // Пути
const path = require('../path').default;

//sass
{
    const sass__prod = () => {
        return src(path.sass)
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('main.css'))
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(cleanCSS({
                level: 2
            }))
            .pipe(dest("dist/css"))
    }

    const sass__dev = () => {
        return src(path.sass)
            .pipe(sourceMaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('main.css'))
            .pipe(sourceMaps.write())
            .pipe(dest("dist/css"))
            .pipe(browserSync.stream())
    }

    exports.sass__task = {
        prod: sass__prod,
        dev: sass__dev
    }
}
//css
{
    const styles__dev = () => {
        return src(path.css)
            .pipe(dest("dist/css"))
            .pipe(browserSync.stream())
    }

    const styles__prod = () => {
        return src(path.css)
            .pipe(concat('main.css'))
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(cleanCSS({
                level: 2
            }))
            .pipe(dest("dist/css"))
    }
    exports.css__tasks = {
        prod: styles__prod,
        dev: styles__dev
    }
}
//fonts
{
    const fonts__prod = () => {
        return src(path.fonts)
            .pipe(fonter({
                formats: ['woff', 'woff2']
            }))
            .pipe(dest("dist/fonts"))
    }
    const fonts__dev = () => {
        return src(path.fonts)
            .pipe(fonter({
                formats: ['woff', 'woff2']
            }))
            .pipe(dest("dist/fonts"))
            .pipe(browserSync.stream())
    }
    exports.fonts__tasks = {
        prod: fonts__prod,
        dev: fonts__dev
    }
}