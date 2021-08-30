const { src, dest } = require('gulp')
const htmlMin = require('gulp-htmlmin')
const concat = require('gulp-concat')
const pug = require('gulp-pug')
const browserSync = require('browser-sync').get('main-server');
// Пути
const path = require('../path').default


//HTML
{
    const htmlMinify__dev = () => {
        return src(path.html)
            .pipe(dest("dist"))
            .pipe(browserSync.stream())
    }

    const htmlMinify__prod = () => {
        return src(path.html)
            .pipe(htmlMin({
                collapseWhitespace: true
            }))
            .pipe(dest("dist"))
    }
    exports.html__tasks = {
        prod: htmlMinify__prod,
        dev: htmlMinify__dev
    }
}
//Pug
{
    const pug__prod = () => {
        return src(path.pug.prod)
            .pipe(pug({}))
            .pipe(dest('dist'))
    }
    const pug__dev = () => {
        return src(path.pug.dev)
            .pipe(pug({}))
            .pipe(dest('dist'))
            .pipe(browserSync.stream())
    }
    exports.pug__tasks = {
        prod: pug__prod,
        dev: pug__dev
    }
}
