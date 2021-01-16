// document
import './index.html';

// styles
import './scss/main.scss';

// images
import './images/dog-importing-an-asset.jpg'; // TODO: is this necessary? other images were working fine without this

(() => {
  async function main() {
    // Check the console and the network tab to see load / running order
    const { setTheme } = await import(/* webpackMode: "eager" */ './js/ui.js'); // TODO: consider exposing a lazy-loadable version but that might be overkill for right now
    const { renderBlog } = await import(/* webpackPreload: true */ './js/lazy/content-blog.js');
    
    setTheme();
    renderBlog();

    // Lazy-load on user input
    const galleryButton = document.getElementById('load-gallery');
    galleryButton.addEventListener('click', function() {
      import(/* webpackPreload: true */ './js/lazy/content-gallery.js')
        .then(({ renderGallery }) => {
          renderGallery();
        });
    });
  }

  main().then(callback => {
    window.addEventListener('load', callback);
  }).catch(error => console.log(error.message, 'An error occurred (caught at the top level)'));
})();
