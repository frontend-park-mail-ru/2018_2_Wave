const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');


module.exports = {
  entry: './src/app.js',

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.bundle.js',
  },

  watch: true,

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new HardSourceWebpackPlugin({
      cacheDirectory: '.cache/',
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/sw.js'),
    }),
  ],

  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader?name=music/[hash].[ext]',
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=favicon.ico',
      },
    ],
  },

};
