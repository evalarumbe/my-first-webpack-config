import library from './some-library.js';
import debug from './debug-script-for-some-library.js';

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
  };

  window.addEventListener('load', main);
})();
