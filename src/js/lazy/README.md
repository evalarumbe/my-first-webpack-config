# Lazy loaders

Each file in this dir does two jobs (on one line, using ES Module re-export syntax):

- Expose functions (or small groups of related functions) to the app, which can lazily load these small granular parts as dynamic imports.
- Allow unused functions to be tree-shaken.

The pipeline looks like this:

`app code` <--dynamic import-- `files in this dir` <--static import-- `source file with some unused exports`

If we didn't have this dir in the middle, Webpack wouldn't be able to give us dynamic imports _and_ tree shaking; we'd have to choose one or the other. This setup offers the best of both worlds.

Thanks to this blogger: [The unexpected impact of dynamic imports on tree shaking](https://medium.com/@christiango/the-unexpected-impact-of-dynamic-imports-on-tree-shaking-ddadeb135dd7)
