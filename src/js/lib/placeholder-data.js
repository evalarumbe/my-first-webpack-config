console.log('Load placeholder-data.js');

export async function getTopPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  const posts = data.slice(0, 3);

  const postsWithComments = posts.map(async post => {
    const postWithComments = {
      post: post,
      comments: await getTopComments(post.id)
    }

    return postWithComments;
  });

  // since we're passing an async callback into map,
  // we need to unwrap the resulting array of promises
  return Promise.all(postsWithComments);
}

export async function getTopComments(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  const data = await response.json();

  return data.slice(0, 3);
}

export async function getTopPhotos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/photos');
  const data = await response.json();
  return data.slice(0, 3);
}

export function unusedDataFunc() {
  console.log('Hi, I am never called, I just wanna see if I get shaken out of placeholder-data.js');
}
