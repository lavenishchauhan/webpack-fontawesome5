const path = require('path');
var webpack = require('webpack');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');


var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var isProd = process.env.NODE_ENV === 'production' //true or false


/* start images Path */
var ProdImagesPath = 'file-loader?name=[name].[ext]&outputPath=../assets/images/&publicPath=assets/images/'
/* End images Path */

module.exports = {
    entry: './src/js/app.js',

    /*For only warinig*/
    devtool: 'inline-source-map',
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },


    /*Entry File Name*/
    output: {
        /*output File Path*/
        path: path.resolve(__dirname, 'assets'),
        filename: "js/[name].bundle.js",
    },

    mode: 'production',
    /*mode*/

    module: {
        rules: [{
                test: /\.(gif|png|jpe?g|svg|jpg|webp)$/i,
                use: [ProdImagesPath,
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.(ttf|svg|eot)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                    },
                }, ],
            },
            {
                test: /\.css$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader, 'css-loader'

                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['transform-class-properties']
                    }
                }
            } /*  babel-loader  */
        ],
    },
    plugins: [

        new MiniCssExtractPlugin({
            /*Make cssfile style.css in assets folder*/
            filename: '../style.[contenthash].css',
        }),

        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', path.join(process.cwd(), 'index.html*'), ],

            cleanOnceBeforeBuildPatterns: ['**/*', path.join(process.cwd(), 'style.*.css*'), ],
            /*clean any[foldername is = staticFiles] folder*/
        }), /*clean assets folder*/


        
        new HtmlWebpackPlugin({
            title: 'Home Page',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            hash: false,
            filename: './../index.html',
            template: 'src/index.html'
        }),


        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),

    ]
}