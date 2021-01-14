const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  context: path.resolve(__dirname), // Look in project root for all paths. Docs recommend including a context.
  entry: {
    main:  path.resolve(__dirname, 'src', './index.js'),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|webp)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash].[ext]',
          }
        }],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true }},
          { loader: 'postcss-loader', options: {
            ident: 'postcss',
            plugins: (loader) => [
              require('postcss-preset-env')(),
              require('cssnano')(),
            ],
            sourceMap: true,
          }},
          { loader: 'sass-loader', options: { sourceMap: true }},
        ],
      },
      {
        test: /\.(htm|html)$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'Eva\'s webpack config',
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    })
  ],
  // SplitChunksPlugin
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
