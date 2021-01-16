console.log('Load ui.js');

// local scripts
import { getRandomElement } from './lib/utils.js';
import { getPosts } from './lib/placeholder-data.js';

// TODO: make more deliberate choices about which funcs get arrows
export const setTheme = () => {
  console.log('Run setTheme');
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
      activeThemeContainer.innerHTML = `Active theme: ${theme}`;
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
    // if no options are checked (selected), 
    // TODO: check if the user has a preference with matchMedia() https://web.dev/prefers-color-scheme
    // otherwise, check a random one
    if (!themeOptions.filter(radio => radio.checked).length) {
      const randomOption = getRandomElement(themeOptions);
      randomOption.checked = true; // display checked state to user
      randomOption.dispatchEvent(new Event('change')); // run the handler
    }
  };

  initUI();
  initTheme();
};

export const renderPosts = async () => {
  console.log('Run renderPosts');

  // get the data
  const posts = await getPosts();

  // find or create the parent element that will contain the data
  const postsContainer = document.querySelector('#posts-container');

  // create the list
  const postsList = document.createElement('ul');
  postsList.id = 'posts';
  
  // create list items
  posts.forEach(post => {
    const postItem = document.createElement('li');
    const heading = document.createElement('h3');
    const paragraph = document.createElement('p');
    
    heading.innerHTML = `${post.id}: ${post.title}`;
    paragraph.innerHTML = post.body;
    
    postItem.appendChild(heading);
    postItem.appendChild(paragraph);
    
    postsList.appendChild(postItem);
  });
  
  // place the list in the container
  postsContainer.appendChild(postsList);
};
