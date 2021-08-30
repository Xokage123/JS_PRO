const { series } = require('gulp')
    // Для локального развертывания
const browserSync = require('browser-sync').create('main-server')
    // Таски для конфигурации
const pug__dev = require('./gulp/tasks/html__tasks').pug__tasks.dev
const pug__prod = require('./gulp/tasks/html__tasks').pug__tasks.prod
const sass__dev = require('./gulp/tasks/style__tasks').sass__task.dev
const sass__prod = require('./gulp/tasks/style__tasks').sass__task.prod
const fonts__dev = require('./gulp/tasks/style__tasks').fonts__tasks.dev
const fonts__prod = require('./gulp/tasks/style__tasks').fonts__tasks.prod
const svg__dev = require('./gulp/tasks/image__tasks').svg__tasks.dev
const svg__prod = require('./gulp/tasks/image__tasks').svg__tasks.prod
const image__dev = require('./gulp/tasks/image__tasks').images__tasks.dev
const image__prod = require('./gulp/tasks/image__tasks').images__tasks.prod
const js__dev = require('./gulp/tasks/scpirt__tasks').js__tasks.dev
const js__prod = require('./gulp/tasks/scpirt__tasks').js__tasks.prod
const clear = require('./gulp/tasks/other__tasks').clear
const resources = require('./gulp/tasks/other__tasks').resources
    // Watch-функция за тасками
const watchOn = require('./gulp/watch').default

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
    watchOn();
}

exports.dev__config = series(clear, resources, sass__dev, pug__dev, js__dev, svg__dev, image__dev, fonts__dev, watchFiles);
exports.prod__config = series(clear, sass__prod, pug__prod, js__prod, svg__prod, image__prod, fonts__prod);
