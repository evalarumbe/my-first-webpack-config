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

export const getPosts = async function () {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data.slice(0,3);
};

