// Babel polyfills
import 'core-js/stable'; // FIXME? On each build, Babel debug text says "Import of core-js was not found" (the error comes from other src files. I didn't think I had to import this for every file, just at the entry point like right here. What's going on? So far I'm not even using any core-js polyfills so haven't properly tested)
import 'regenerator-runtime/runtime';

// local imports
import { library, posts } from './some-library.js';
import debug from './debug-script-for-some-library.js';

// styles
import './scss/main.scss';

(() => {
  const main = function () {

    const locations = [...document.getElementById('locations').children];
    const randomLoc = Math.floor(Math.random() * locations.length);

    // Get something from the DOM at runtime (can't hard-code this into the bundle)
    const location = locations[randomLoc].innerText;
    
    // Call the debug script (second dependency)
    debug();

    // Use the DOM data to query the library
    console.log(`I log therefore I am chilling at ${library(location)} in ${location}`);
    
    console.log('Do some more ES6 stuff with WeakSet');
    const weakSetStuff = new WeakSet([]);
    console.log(weakSetStuff);

    console.log(`Behold all these posts: ${posts()}`);

    console.log(`3 ** 2? ${3 ** 2}`);
  };

  window.addEventListener('load', main);
  console.log('degular?');
})();
