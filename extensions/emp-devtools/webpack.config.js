const path = require('path');
// const webpack = require('webpack');

module.exports = {
  entry: {
    background: './src/background.js',
    devtools: './src/devtools.js',
    'devtools-background': './src/devtools-background.js',
    'content-scripts': './src/content-scripts.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
