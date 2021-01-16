// document
import './index.html';

// styles
import './scss/main.scss';

// images
import './images/dog-importing-an-asset.jpg'; // TODO: is this necessary? other images were working fine without this

(() => {
  async function main() {
    // Check the console and the network tab to see load / running order
    const { setTheme } = await import(/* webpackMode: "eager" */ './js/ui.js');
    const { renderPosts } = await import(/* webpackPreload: true */ './js/ui.js');

    setTheme();
    renderPosts();
  }

  main().then(callback => {
    window.addEventListener('load', callback);
  }).catch(error => console.log(error.message, 'An error occurred (caught at the top level)'));

})();
