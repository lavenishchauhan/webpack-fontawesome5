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
var DevImagesPath = 'file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/';
/* End images Path */



var CleanProd = ['**/*', path.join(process.cwd(), 'index.html*')];


module.exports = {
  entry: './src/js/app.js',
  /*Entry File Name*/
  output: {
    /*output File Path*/
    path: path.resolve(__dirname, 'assets'),
    filename: "js/[name].bundle.js",
  },

  mode: isProd ? 'production' : 'development',
  /*mode*/
  devServer: {
    /* devServer Setting */
    publicPath: "/",
    compress: true,
    stats: 'errors-only',
    hot: true,
    open: true
  },
  module: {
    rules: [{
        test: /\.(gif|png|jpe?g|svg|jpg|webp)$/i,
        use: [isProd ? ProdImagesPath : DevImagesPath,
          'image-webpack-loader'
        ]
      },
      {
        test: /\.(ttf|svg|eot|woff|woff2)$/i,
        // test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './fonts/',
            publicPath: isProd ? './assets/fonts/' : '',
          },
        }, ],
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ]

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
      filename: '../style.css?v=[contenthash]',
      allChunks: true
    }),


    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: isProd ? CleanProd : [],
      /*clean any[foldername is = staticFiles] folder*/
    }), /*clean assets folder*/


    new HtmlWebpackPlugin({
      title: 'Home',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      hash: false,
      filename: 'index.html',
      template: 'src/index.html'
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),

  ]
}