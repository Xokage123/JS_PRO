const { src, dest } = require('gulp'),
    del = require('del'),
    browserSync = require('browser-sync').get('main-server')
    // Пути
const path = require('../path').default;

// Очистка директории
const clear = () => {
    return del([
        'dist',
        'dist/images'
    ])
}

// Отправка ресурсов и всего прочего
const resources = () => {
    return src(path.res)
        .pipe(dest('dist/library'))
        .pipe(browserSync.stream())
}

exports.clear = clear;
exports.resources = resources;
