const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLESS = new ExtractTextPlugin('../css/[name].css');

module.exports = {
    entry: {
        login: path.resolve(__dirname, './webfront/service/auth/login.js')
    },
    devtool: 'inline-source-map',
    output: {
        filename: "[name].js",
        path: __dirname + '/build/service',
        publicPath: "/build/service/",
        chunkFilename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules|bower_components)/,
                options: {
                    presets: ['react', 'es2015'],
                    "plugins": [
                        ["import", { "libraryName": "antd", "style": true }],
                        ["transform-class-properties", { "spec": true }]
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=../image/[name]-[hash:8].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 4,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 3,
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        extractLESS,
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './webfront/view/login.html'),
            filename: path.resolve(__dirname, './build/login.html')
        })
    ]
}

