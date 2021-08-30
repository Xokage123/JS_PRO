const { src, dest } = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    image = require('gulp-image'),
    svgmin = require('gulp-svgmin'),
    replace = require('gulp-replace'),
    changed = require('gulp-changed'),
    browserSync = require('browser-sync').get('main-server'),
    // Путь
    path = require('../path').default;

const svg__config = {
    mode: {
        symbol: {
            dest: 'svg',
            sprite: 'index'
        },
    }
}

const DESTINATION = "dist/images";

//svg
{
    const svgSprites__dev = () => {
        return src("src/images/svg/**/*.svg")
            .pipe(svgmin({
                js2svg: {
                    pretty: true
                }
            }))
            .pipe(replace('&gt;', '>'))
            .pipe(svgSprite(svg__config))
            .pipe(dest(DESTINATION))
    }

    const svgSprites__prod = () => {
        return src("src/images/svg/**/*.svg")
            .pipe(svgmin({
                js2svg: {
                    pretty: true
                }
            }))
            .pipe(replace('&gt;', '>'))
            .pipe(svgSprite(svg__config))
            .pipe(dest(DESTINATION))
    }

    exports.svg__tasks = {
        prod: svgSprites__prod,
        dev: svgSprites__dev
    }
}

//all
{
    const images__prod = () => {
        return src(path.image)
            .pipe(image())
            .pipe(dest(DESTINATION))
    }

    const images__dev = () => {
        return src(path.image)
            .pipe(changed(DESTINATION))
            .pipe(image())
            .pipe(dest(DESTINATION))
            .pipe(browserSync.stream())
    }
    exports.images__tasks = {
        prod: images__prod,
        dev: images__dev
    }
}
