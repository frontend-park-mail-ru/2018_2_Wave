module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('postcss-import'),
    require('precss'),
    require('postcss-preset-env'),
    require('postcss-google-font'),
    require('postcss-strip-inline-comments'),
    // require('cssnano'),
  ],
};
