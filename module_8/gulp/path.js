const PATH = {
    dist: 'dist/**',
    sass: 'src/styles/scss/**/*.scss',
    css: 'src/styles/**/*.css',
    fonts: 'public/assets/fonts/*',
    svg: 'public/assets/svg/**/*.svg',
    image: [
        "src/images/**/*.jpg",
        "src/images/**/*.png",
        "src/images/*.svg",
        "src/images/**/*.jpeg",
    ],
    html: 'public/html/**/*.html',
    pug: {
        dev: 'public/pug/**/*.pug',
        prod: 'public/pug/index.pug'
    },
    js: {
        main: 'src/js/**/*.js',
        entry: './src/js/index.js'
    },
    res: 'src/resources/**'
}

exports.default = PATH;
