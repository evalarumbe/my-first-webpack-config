console.log('Load ui.js');

import { getRandomElement } from './lib/utils.js';

export function setTheme() {
  console.log('Run setTheme');
  const themeOptions = [...document.querySelectorAll('#themes input[type=radio]')];

  function applyThemeStyles(activeTheme) {
  // cases must match radio option ids in the DOM
    switch (activeTheme) {
      case 'midnight':
        // TODO: set styles to midnight theme
        break;
      default:
        // TODO: set styles to daylight theme
        break;
    }
  }

  function updateTheme(theme) {
    function updateUI() {
      const activeThemeContainer = document.getElementById('active-theme');
      activeThemeContainer.innerHTML = `Active theme: ${theme}`;
    }

    applyThemeStyles(theme);
    updateUI();
  }

  function initUI() {
    function handleSelectTheme(event) {
      updateTheme(event.target.id);
      // TODO: Does a11y need us to explicitly show a state change in the DOM, or connect the 'active theme' text to the radio fieldset with something like aria-label?
    }
    
    // listen for the user to update the theme
    themeOptions.forEach(radioInput => {
      // Note: onchange fires when a radio button is selected, except in <IE9 where it fires when a radio button is UNselected
      radioInput.addEventListener('change', handleSelectTheme);
    });
  }

  function initTheme() {
    // if no options are checked (selected), 
    // TODO: check if the user has a preference with matchMedia() https://web.dev/prefers-color-scheme
    // otherwise, check a random one
    if (!themeOptions.filter(radio => radio.checked).length) {
      const randomOption = getRandomElement(themeOptions);
      randomOption.checked = true; // display checked state to user
      randomOption.dispatchEvent(new Event('change')); // run the handler
    }
  }

  initUI();
  initTheme();
}
