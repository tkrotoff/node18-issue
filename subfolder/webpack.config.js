const path = require('node:path');

const config = {
  entry: './index.js',

  output: {
    path: path.join(__dirname, 'build'),
    clean: true
  },

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.js$/,

        // [Babel should not transpile core-js](https://github.com/zloirock/core-js/issues/514#issuecomment-476533317)
        exclude: /node_modules\/core-js/,

        loader: 'babel-loader'
      }
    ]
  }
};

module.exports = config;
