export const getPosts = async function () {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data.slice(0,3);
};

// TODO: are these the kinds of utils that lodash is good for?
export const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}
