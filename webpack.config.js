/*
 * @Descripttion: 
 * @version: 
 * @Author: Charles Guo
 * @Date: 2021-12-13 23:04:09
 * @LastEditors: Charles Guo
 * @LastEditTime: 2021-12-14 16:48:44
 */
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const merge = require('webpack-merge')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ENTRY_PATH = path.resolve(__dirname, 'entries')

console.log(ENTRY_PATH);

function entriess() { 
    const entryFiles = glob.sync(ENTRY_PATH + '/*/*.js')
    const map = {}
    entryFiles.forEach(filePath => {
        const filename = filePath.replace(/.*\/(\w+)\/\w+(\.html|\.js)$/, (rs, $1) => $1)
        map[filename] = filePath
    })
    return map
}

function htmlPlugin() { 
    let entryHtml = glob.sync(ENTRY_PATH + '/*/*.html')
    let arr = []
    entryHtml.forEach(filePath => {
        let filename = filePath.replace(/.*\/(\w+)\/\w+(\.html|\.js)$/, (rs, $1) => $1)
        let conf = {
            template: filePath,
            filename: filename + '.html',
            chunks: [filename],
            inject: true
        }
        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                chunks: ['manifest', 'vendor'],
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            })
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr
}

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, './'),
    entry: entriess(),
    output: {
        clean: true,
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        pathinfo: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.vue$/,
            exclude: /node_modules/,
            use: {
                loader: 'vue-loader'
            }
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        // new HtmlWebpackPlugin({
        //     template: './index.html',
        //     filename: 'entry.html',
        //     chunks: ['app'],
        //     inject: true
        // }),
        // new HtmlWebpackPlugin({
        //     template: './index.html',
        //     filename: 'entry2.html',
        //     chunks: ['app2'],
        //     inject: true
        // })
    ].concat(htmlPlugin()),
    devServer: {
        port: 8080,
        open: true,
        hot: false,
        liveReload: true,
        historyApiFallback: {
            rewrites: [
                {
                    from: /^.*/,
                    to: path.join('/', 'index.html')
                }
            ]
        }
    }
}