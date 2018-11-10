const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const path = require('path');


module.exports = {
  entry: {
    app: './src/index.js',
  },

  output: {
    filename: 'dir/bundle.js',
    path: path.resolve(__dirname, 'public'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug',
    }),
    new HardSourceWebpackPlugin({
      cacheDirectory: 'node_modules/.cache/',
    }),
  ],

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
        loader: 'file-loader',
      },
    ],
  },

};
