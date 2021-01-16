export async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data.slice(0,3);
}

export function unusedFunc() {
  console.log('Hi, I am never called, I just wanna see if I get shaken out');
}
