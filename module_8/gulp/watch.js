const { watch } = require('gulp')
const path = require('./path').default
const sass__dev = require('./tasks/style__tasks').sass__task.dev
const css__dev = require('./tasks/style__tasks').css__tasks.dev
const svg__dev = require('./tasks/image__tasks').svg__tasks.dev
const image__dev = require('./tasks/image__tasks').images__tasks.dev
const html__dev = require('./tasks/html__tasks').html__tasks.dev
const pug__dev = require('./tasks/html__tasks').pug__tasks.dev
const js__dev = require('./tasks/scpirt__tasks').js__tasks.dev
const resources = require('./tasks/other__tasks').resources
const browserSync = require('browser-sync').get('main-server')

function watchStart() {
    // Обновляем, при любов изменении файлов в папке dist
    watch(path.html, html__dev);
    watch(path.pug.dev, pug__dev);
    watch(path.sass, sass__dev);
    watch(path.css, css__dev);
    watch(path.image, image__dev);
    watch(path.svg, svg__dev);
    watch(path.js.main, js__dev);
    watch(path.res, resources);
}

exports.default = watchStart;
