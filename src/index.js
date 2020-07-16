// Babel polyfills
import 'core-js/stable'; // FIXME? On each build, Babel debug text (set it to true to see) says "Import of core-js was not found" (the error comes from other src files. I didn't think I had to import this for every file, just at the entry point like right here. What's going on? So far I'm not even using any core-js polyfills so haven't properly tested). NOTE: If I import these 2 lines at the top of each js file, the warning stops (Maybe only the corejs line is relevant but the docs seem to recommend them together).
import 'regenerator-runtime/runtime';

// local scripts
import { getPosts, getRandomElement } from './library.js';

// templates
import postsTemplate from './templates/partials/posts.hbs';
import activeThemeTemplate from './templates/partials/active-theme.hbs';

// styles
import './scss/main.scss';

// images
import './images/dog-importing-an-asset.jpg';

(() => {
  const main = function () {

    // TODO: make more deliberate choices about which funcs get arrows

    // TODO: Is there somewhere better to render things? Move these into helpers?
    const renderPosts = async () => {
      // get the data
      const posts = await getPosts();

      // find or create the parent element that will contain the data
      const prevSibling = document.querySelector('#themes');
      const postsContainer = document.createElement('div.posts-container');
      prevSibling.after(postsContainer);

      // place it in the container via template
      postsContainer.innerHTML += postsTemplate(posts);
    };

    const setTheme = () => {
      const themeOptions = [...document.querySelectorAll('#themes input[type=radio]')];

      const applyThemeStyles = (activeTheme) => {
      // cases must match radio option ids in the DOM
        switch (activeTheme) {
          case 'midnight':
            // TODO: set styles to midnight theme
            break;
          default:
            // TODO: set styles to daylight theme
            break;
        }
      };

      const updateTheme = (theme) => {
        const updateUI = () => {
          const activeThemeContainer = document.getElementById('active-theme');
          activeThemeContainer.innerHTML = activeThemeTemplate(`Active theme: ${theme}`);
        };

        applyThemeStyles(theme);
        updateUI();
      };

      const initUI = () => {
        const handleSelectTheme = function(event) {
          updateTheme(event.target.id);
          // TODO: Does a11y need us to explicitly show a state change in the DOM, or connect the 'active theme' text to the radio fieldset with something like aria-label?
        };
        
        // listen for the user to update the theme
        themeOptions.forEach(radioInput => {
          // Note: onchange fires when a radio button is selected, except in <IE9 where it fires when a radio button is UNselected
          // TODO: Consider adding <IE9 support
          radioInput.addEventListener('change', handleSelectTheme);
        });
      };

      const initTheme = () => {
        // if no options are checked (selected), check a random one
        if (!themeOptions.filter(radio => radio.checked).length) {
          const randomOption = getRandomElement(themeOptions);
          randomOption.checked = true; // display checked state to user
          randomOption.dispatchEvent(new Event('change')); // run the handler
        }
      };

      initUI();
      initTheme();
    };

    renderPosts(); // you don't have to use/unwrap the returned promise
    setTheme();
  };

  window.addEventListener('load', main);
})();
