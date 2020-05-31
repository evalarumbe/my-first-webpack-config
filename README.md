# Basic-ass Webpack

Where it's difficult to fuck anything up.

## Findings

If `src/index.js` has a dependency, it's enough to:

- include the dependency file in `src/`
- import it at the top of `src/index.js` (webpack will then smoosh the dependency logic into your main bundle)

Therefore it's not necessary to:

- add the dependency to `webpack.config.js`
- add the dependency to `dist/index.html`
