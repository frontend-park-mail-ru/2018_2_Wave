const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
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

  module: {
    rules: [
      {
        test: /\.pcss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true,
            },
          },
          'postcss-loader',
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
      {
        test: /\.(eot|woff|woff2|ttf|otf|svg|png|jpg)$/,
        // loader: 'url-loader?limit=30000&name=./[name]-[hash].[ext]',
        loader: 'url-loader?limit=30000&name=./[name].[ext]',
      },
    ],
  },

};
