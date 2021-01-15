export const getPosts = async function () {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data.slice(0,3);
};

export const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}

export const unusedFunc = () => {
  console.log('Hi, I am never called, I just wanna see if I get shaken out');
};
