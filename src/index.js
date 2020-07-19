// Babel polyfills
import 'core-js/stable'; // FIXME? On each build, Babel debug text (set it to true to see) says "Import of core-js was not found" (the error comes from other src files. I didn't think I had to import this for every file, just at the entry point like right here. What's going on? So far I'm not even using any core-js polyfills so haven't properly tested). NOTE: If I import these 2 lines at the top of each js file, the warning stops (Maybe only the corejs line is relevant but the docs seem to recommend them together).
import 'regenerator-runtime/runtime';

// local scripts
import { renderPosts, setTheme } from './js/ui.js';

// document
import './index.html';

// styles
import './scss/main.scss';

// images
import './images/dog-importing-an-asset.jpg'; // TODO: is this necessary? other images were working fine without this

(() => {
  const main = function () {
    setTheme();
    renderPosts();
  };

  window.addEventListener('load', main);
})();
