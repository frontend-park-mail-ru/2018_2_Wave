const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');


module.exports = {
  entry: './src/app.js',

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.bundle.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
    }),
    new HardSourceWebpackPlugin({
      cacheDirectory: 'node_modules/.cache/',
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
    ],
  },

};
