import { getPosts } from './lib/placeholder-data.js';

export async function renderPosts() {
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
}
