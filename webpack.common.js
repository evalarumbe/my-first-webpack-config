const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
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
    ],
  },
  plugins: [
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
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
