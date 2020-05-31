const path = require('path');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map', // TODO: why doesn't this seem to change anything? source mapping is sweet so far without it
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ]
  },
  plugins: [
    new MinifyPlugin({}, {
      comments: false
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
