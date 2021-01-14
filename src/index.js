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
