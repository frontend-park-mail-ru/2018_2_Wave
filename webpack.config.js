const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
  entry: {
    app: './public/js/app.js',
  },

  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Demo',
      template: './public/index.pug',
    }),
  ],

};
