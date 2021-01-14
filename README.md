# Eva's Webpack Config

![Webpack Logo](./webpack-logo.gif  )

## Disclaimer (here be dragons)

This config is an ongoing work in progress, built as a self-guided exercise to learn [Webpack](https://webpack.js.org/).

### Goals 🎯

- Learn how popular JS frameworks bundle things for performance
- Consider rolling my own boilerplate for vanilla HTML / SCSS / JS projects

### The state of things 🚧 

I chip away at this repo between projects, so a lot of things are broken. I wouldn't recommend that anybody run this as it stands.

**At the moment this repo's main function is documentation - so this Readme is the best bit.**

The audience at the moment is mostly just myself (for when I pick this back up having forgotten everything), but I'm incrementally cleaning it up so it can be more useful to others someday.

#### Features

- [Asset Management](https://webpack.js.org/guides/asset-management/)
- [Output Management](https://webpack.js.org/guides/output-management/)
- [Development](https://webpack.js.org/guides/development/)
- [Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/)
- [Production](https://webpack.js.org/guides/production/)
- [Code splitting](https://v4.webpack.js.org/guides/code-splitting/) (to the end of the SplitChunksPlugin section)

#### Up next

- [Lazy loading](https://v4.webpack.js.org/guides/lazy-loading/)
- [Tree Shaking](https://webpack.js.org/guides/tree-shaking/)

## File structure

| Path                      | But why |
| :------------------------ | :------- |
| `.gitignore`              | List files or dirs that should not be commited to the repo. |
| `package.json`            | Info about this project. List dependencies and scripts used to run Webpack. |
| `package-lock.json`       | Describe exactly which versions of dependencies are installed. |
| `babel.config.json`       | Configure options specific to Babel, which is loaded via Webpack. See below for details. |
| `webpack.dev.js`          | Configs that are only relevant in development (prioritize developer experience) |
| `webpack.prod.js`         | Configs that are only relevant in production (prioritize user experience) |
| `webpack.common.js`       | Configs that are common to both development and production environments |
| `dist/`                   | Files to distribute to the browser. Webpack's output. Can also contain hand-coded files, like it used to in this repo before commit [92b4ff1](https://github.com/evalarumbe/my-first-webpack-config/commit/92b4ff12bfe86bf20d330f03fa7f1fe27057d621#diff-b9cfc7f2cdf78a7f4b91a753d10865a2) |
| `src/`                    | Source code. Webpack's input. |
| `src/scss/`               | Sass source files |

## Packages used

### Browser support

| Package                   | But why |
| :------------------------ | :------ |
| `browserslist`            | Let `package.json` specify which browsers to support. Used by many tools, such as Babel and Autoprefixer. |

### JavaScript

[Babel](https://babeljs.io/) lets us write modern JS while exporting cross-compatible code for older browsers that can't handle the heat.

| Package                   | But why |
| :------------------------ | :------ |
| `babel-loader`            | Enable Webpack to run `@babel/core`. |
| `@babel/core`             | This is Babel! But it's useless without plugins or presets (which are collections of plugins). |
| `@babel/preset-env`       | Preset based on [caniuse](https://caniuse.com/). I decide which syntax to change depending on the project's supported browsers. |
| `core-js`                 | Provide polyfills for new js features that add functionality (more than just new syntax). ** Install as a _dependency_, not a devDependency** |

### CSS

These work as a pipeline: [Sass](https://sass-lang.com/) => CSS => add prefixes => minify => inject into style tags.
In the Webpack config, you'll notice the pipeline runs from bottom to top, but here I'll list them in reading order. The freaky config syntax for postcss plugins came from [the postcss-loader docs](https://webpack.js.org/loaders/postcss-loader/#plugins)

| Package                   | But why |
| :------------------------ | :------ |
| `sass-loader`             | Enable Webpack to run `sass`. |
| `sass`                    | Compile SCSS syntax into CSS. |
| `fibers`                  | Make SCSS compilation faster as recommended in [the docs](https://webpack.js.org/loaders/sass-loader/). |
| `postcss-loader`          | Enable CSS to run through plugins before it hits `dist/`. |
| `postcss-preset-env`      | Plugin used by postcss. Includes [Autoprefixer](http://autoprefixer.github.io/). |
| `cssnano`                 | Plugin used by postcss. Minifies CSS. |
| `css-loader`              | Enable CSS to be piped to `style-loader`. |
| `mini-css-extract-plugin` | Generate static CSS files so users without JS still have a stylish time. |

### HTML

In this project, hand-coded HTML in `src/` gets processed and output to `dist/`.

| Package                   | But why |
| :------------------------ | :------ |
| `html-webpack-plugin`     | Generate HTML with relative paths converted between `src/` and `dist/` |
| `html-loader`             | Parses HTML so we can hand code some to start from. |

### Assets

| Package                   | But why |
| :------------------------ | :------ |
| `file-loader`             | Bundle images and other static assets. |
| `webpack.config.prod.js`  | A pre-build script to generate WebP images in `src/` before they're bundled. Useful for markup that comes from `src/` (such as hand-coded HTML or Handlebars templates). The product of much research, experimentation, weeping and ultimately triumph. Details in the comments. |

### Webpack

Webpack lets us bundle source files into distributed files according to rules set in the Webpack config files.

| Package                   | But why |
| :------------------------ | :------ |
| `webpack`                 | I am Webpack. Hear me roar. |
| `webpack-cli`             | A required helper for Webpack. |
| `webpack-merge`           | Enable split config files for dev and prod purposes (and common configs to both). |
| `webpack-dev-server`      | Look ma, no hands! Enable a no-refresh dev experience, including [hot module replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/). |
| `clean-webpack-plugin`    | Clean out old unused files from `dist/` on every build. Handy to keep `dist/` free of unused temp files generated by HMR when webpack-dev-server is set to write to `dist/`. |

## Learnings

Notes-to-self on things things discovered through experimentation and research. Would love to hear about it if you have other ideas! Researched in June 2020. Things change though.

### Things I learned about Webpack

#### How to register dependencies

If `src/index.js` has a dependency, it's enough to:

- include the dependency file in `src/`
- import it at the top of `src/index.js` (Webpack will then smoosh the dependency logic into your main bundle)

Therefore it's not necessary to:

- add the dependency to `webpack.config.js`
- add the dependency to `dist/index.html`

#### How to split code for cache optimization

In `webpack.common.js`, `optimization.splitChunks` is also known as the [SplitChunksPlugin](https://v4.webpack.js.org/plugins/split-chunks-plugin/), and is recommended for Webpack v4, which this project uses.

Without code splitting, separate entry points would each load their own version of dependencies (e.g. if we have 2 entry point files that each depend on lodash, we get 2 bundles per 1 sad user, because each of them contains lodash).

To do code splitting in Webpack v4, we use SplitChunksPlugin, which is an improvement on CommonChunkPlugin from Webpack v3: CommonChunkPlugin would extract common dependencies to a new file (a chunk). Since we are likely to update third-party dependencies less frequently than we update our own code, these dependencies could be cached longer, and the user would only need to download our lighter custom app code whenever we make an update, not all of the bundled third-party deps.

Still, this v3 architecture meant that if one of these deps in the cached Common Chunk file has to be updated, then all of the deps would have to be updated.

When configured the general recommended way `optimization.splitChunks { chunks: 'all' }` SplitChunksPlugin seems to behave similarly to CommonChunkPlugin, but it can be additionally configured to allow each of these chunked dependencies to be split up and cached individually, offering more flexibility / fine control for the developer to selectively update dependencies, while minimizing download time for the user.

*Thank you to this YouTuber: [Step By Step: Split Chunks Plugin #9 - Webpack 4](https://www.youtube.com/watch?v=sX_6ezKfvn0&ab_channel=ExcitonInteractiveLLC)*

### Things I learned about Babel

See `babel.config.json`. Since comments aren't supported in JSON, I'll explain here.

Babel has an optional `debug` flag that shows detailed output in the CLI when building (handy to see which decisions Babel is making under the hood).

- `@babel/core` does nothing alone. It needs plugins and presets.
- `@babel/preset-env` is one such preset. It does nothing alone. It needs `useBuiltIns` to be set (by default it's set to `false`. It can be set to either `usage` or `entry`, more detail below).
- `useBuiltIns` needs the corejs version to be specified ([minor version recommended](https://youtu.be/YXtQms2msZQ?t=1075), though I couldn't find that in the docs).

- Setting `useBuiltIns` to `entry` means Babel will decide which polyfills to use based on which import statements it finds in the entry file. This means we need to manually run:
```console
$ npm install -S <packages to be imported>
```

  e.g. To support Promises:
  ```
  $npm i --save regenerator-runtime core-js
  ```

  Once only, in index.js
  ```js
  import 'regenerator-runtime';
  import 'core-js/stable';
  ```

- Setting `useBuiltIns` to `usage` is [recommended by this YouTuber](https://www.youtube.com/watch?v=YXtQms2msZQ&ab_channel=SwashbucklingwithCode). Babel will look through project files and browserslist config to automatically determine which polyfills to include, so we DON'T need to manually install or import packages as above . [This is only suitable for projects using a bundler](https://babeljs.io/docs/en/babel-preset-env#usebuiltins-usage) (like webpack here, because it's configured to load each dependency only once), but not in standalone non-bundled projects.

References:
- [preset-env docs](https://babeljs.io/docs/en/babel-preset-env) - Babel documentation
- [How to get polyfills with Babel 7 and Webpack](https://www.youtube.com/watch?v=YXtQms2msZQ&ab_channel=SwashbucklingwithCode) - YouTube
- [Thread clarifying the Babel docs (npm i core-js regenerator-runtime)](https://stackoverflow.com/questions/55748204/babel-7-x-cant-resolve-core-js-modules-es-array-concat) - Stack Overflow

<!-- TODO: [Try different bundle analyzers](https://v4.webpack.js.org/guides/code-splitting/#bundle-analysis) -->

<!-- TODO: [Lessons Learned From a Year of Fighting With Webpack and Babel](https://levelup.gitconnected.com/lessons-learned-from-a-year-of-fighting-with-webpack-and-babel-ce3b4b634c46) -->

<!-- TODO: [Maximally optimizing image loading for the web in 2021
](https://www.industrialempathy.com/posts/image-optimizations/) -->
