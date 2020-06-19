// Babel polyfills
import 'core-js/stable'; // FIXME? On each build, Babel debug text says "Import of core-js was not found" (the error comes from other src files. I didn't think I had to import this for every file, just at the entry point like right here. What's going on? So far I'm not even using any core-js polyfills so haven't properly tested)
import 'regenerator-runtime/runtime';

// local scripts
import { library, getPosts } from './some-library.js';
import debug from './debug-script-for-some-library.js';

// templates
import postsTemplate from './templates/partials/posts.hbs';

// styles
import './scss/main.scss';

(() => {
  const main = function () {
    const doDomThings = function() {
      const locations = [...document.getElementById('locations').children];
      const randomLoc = Math.floor(Math.random() * locations.length);

      // Get something from the DOM at runtime (can't hard-code this into the bundle)
      const location = locations[randomLoc].innerText;
      
      // Call the debug script (second dependency)
      debug();
    };

    const doRandomConsoleThings = function() {
      // Use the DOM data to query the library
      console.log(`Random library: ${library(location)} in ${location}`);
      
      console.log('Do some more ES6 stuff with WeakSet');
      const weakSetStuff = new WeakSet([]);
      console.log(weakSetStuff);

      console.log(`Summoning posts from JSON Placeholder...`);
      posts();

      console.log(`3 ** 2? ${3 ** 2}`);
    };

    const doHandlebarsThings = async function() {
      // get the data
      const posts = await getPosts();

      // find or create the parent element that will contain the data
      const prevSibling = document.querySelector('#header');
      const container = document.createElement('div.post-container');
      prevSibling.after(container);

      // place it in the container via template
      container.innerHTML += postsTemplate(posts);
    };

    // doDomThings();
    // doRandomConsoleThings();
    doHandlebarsThings(); // you don't have to use/unwrap the returned promise
  };

  window.addEventListener('load', main);
})();
