const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const path = require('path');


const config = {
  entry: './src/app.js',

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'public'),
    filename: 'app.bundle.js',
  },

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
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {},
        },
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
        test: /\.(img|jpeg|jpg|png)$/,
        loader: 'file-loader?name=img/[name].[ext]',
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=favicon.ico',
      },
      {
        test: /\.(eot|woff|woff2|ttf|otf)$/,
        loader: 'url-loader?limit=30000&name=fonts/[name].[ext]',
      },
    ],
  },
};


module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.output.path = path.resolve(__dirname, 'public');
  } else {
    config.output.path = path.resolve(__dirname, '../public');
  }

  return config;
};
