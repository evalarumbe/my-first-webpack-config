export const library = function (location) {
  switch (location) {
    case 'France':
      return 'Shakespeare & Co';
      break;
    case 'Egypt':
      return 'Alexandria';
      break;
    case 'Myst':
      return 'the tower';
      break;
  }
};

export const posts = function () {
  async function getPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
  }

  getPosts().then(retrievedPosts => console.log('Voilà your posts!', retrievedPosts));
};

