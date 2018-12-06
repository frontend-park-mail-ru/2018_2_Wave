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
        test: /\.css$/,
        use: [
          'style-loader',
          'postcss-loader',
          // { loader: 'css-loader', options: { importLoaders: 1 } },
        ],
      },
      {
        test: /\.pcss$/,
        use: [
          'style-loader',
          'postcss-loader',
          // { loader: 'css-loader', options: { importLoaders: 1 } },
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
