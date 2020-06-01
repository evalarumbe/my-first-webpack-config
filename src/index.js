// import 'core-js-bundle';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import { library, posts } from './some-library';
import debug from './debug-script-for-some-library';

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
})();
