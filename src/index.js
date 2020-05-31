import library from './some-library.js';

(() => {
  const main = function () {
    console.log(`I log therefore I am chilling at ${library.name}`);
  };

  window.addEventListener('load', main);
})();
