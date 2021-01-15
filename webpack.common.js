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
  // Split everything real small for better caching (HTTP requests are ok on HTTP/2 these days, esp on small sites under a few hundred requests)
  // Thanks to this blogger: https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // make one file per package
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
