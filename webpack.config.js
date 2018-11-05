const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const path = require('path');


module.exports = {
  entry: {
    app: './src/app.js',
  },

  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'public'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug',
    }),
    new HardSourceWebpackPlugin(),
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
    ],
  },

};
