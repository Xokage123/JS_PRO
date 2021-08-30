const paths = require('../paths.js')

const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const babelLoader = {
    loader: 'babel-loader',
    options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-runtime'
        ]
    }
}

module.exports = {
    entry: `${paths.src}\\index.js`,
    output: {
        filename: 'main.js',
    },
    externals: {
        paths: paths
    },
    resolve: {
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            // JavaScript, React
            {
                test: /\.m?jsx?$/i,
                exclude: /node_modules/,
                use: babelLoader
            },
            // TypeScript
            {
                test: /.tsx?$/i,
                exclude: /node_modules/,
                use: [babelLoader, 'ts-loader']
            },
            // CSS, SASS
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1, sourceMap: true }
                    },
                    'sass-loader'
                ]
            },
            // Pug
            {
                test: /\.pug$/i,
                include: paths.public,
                loader: 'pug-loader',
            },
            // MD
            {
                test: /\.md$/i,
                use: ['html-loader', 'markdown-loader']
            },
            // Fonts
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            // static files
            {
                test: /\.(jpe?g|png|gif|svg|eot|ttf|woff2?)$/i,
                type: 'webassembly/experimental'
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),

        // new CopyWebpackPlugin({
        //     patterns: [{
        //         from: `${paths.public}/assets`
        //     }]
        // }),

        new webpack.ProvidePlugin({
            React: 'react'
        }),

        // new Dotenv({
        //     path: './config/.env'
        // }),

        // new HtmlWebpackPlugin({
        //     template: `${paths.public}/index.html`,
        //     filename: 'index.html',
        //     templateParameters: {
        //         title: 'Test Maks',
        //     },
        //     inject: true
        // }),
    ]
}
