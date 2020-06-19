const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'), // Look in src for all paths. Docs recommend including this.
  entry: {
    main: './index.js',
  },
  module: {
    rules: [
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
        test: /\.(hbs|handlebars)$/,
        use: [{
          loader:'handlebars-loader',
          options: {
            // helperDirs: path.resolve(__dirname, 'src', 'templates', 'helpers'),
          },
        }],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'Eva\'s webpack config',
    }),
    new CleanWebpackPlugin({
      // Recommendation to self: Use both cleanOnceBeforeBuildPatterns and cleanAfterEveryBuildPatterns with the same values, so all builds (first and watched) behave consistently
      cleanOnceBeforeBuildPatterns: [ // on first build, delete everything (*) except (!) html (*.html)
        '*', // must have a positive pattern here because a negative alone doesn't work
        '!*.html', // negative means "remove this from matching results of first pattern"
      ],
      cleanAfterEveryBuildPatterns: [ // on watched builds, delete everything except html
        '*',
        '!*.html',
      ],
    }),
  ],
  optimization: { // code splitting without duplicates
    splitChunks: {
      chunks: 'all',
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
