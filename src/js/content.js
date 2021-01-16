console.log('Load content.js');

import { getTopPosts, getTopPhotos } from './lib/placeholder-data.js';

export async function renderBlog() {
  console.log('Run renderBlog');

  // get the data
  const posts = await getTopPosts();

  // find or create the parent element that will contain the data
  const postsContainer = document.querySelector('#posts-container');

  // create the list of posts
  const postsList = document.createElement('ul');
  postsList.id = 'posts';
  
  // create list items
  posts.forEach(postWithComments => {
    // create elements for main post and comments
    const postItem = document.createElement('li');
    const postHeading = document.createElement('h3');
    const postBody = document.createElement('p');
    const commentsList = document.createElement('ul');
    
    // populate main post
    postHeading.innerHTML = `${postWithComments.post.id}: ${postWithComments.post.title}`;
    postBody.innerHTML = postWithComments.post.body;

    // populate comments
    commentsList.id = `comments-${postWithComments.post.id}`;

    postWithComments.comments.forEach(({ body, name }) => {
      // create comment elements
      const commentItem = document.createElement('li');
      const commentBody = document.createElement('small');
      const commentUser = document.createElement('em');
      
      // populate comment
      commentBody.innerHTML = body;
      commentUser.innerHTML = `&nbsp;&mdash;&nbsp;${name}`;
      
      // append comment to DOM
      commentBody.appendChild(commentUser);
      commentItem.appendChild(commentBody);

      commentsList.appendChild(commentItem);
    });
    
    // append main post and comments to DOM
    postItem.appendChild(postHeading);
    postItem.appendChild(postBody);
    postItem.appendChild(commentsList);
    
    postsList.appendChild(postItem);
  });
  
  // place the list in the container
  postsContainer.appendChild(postsList);
}

export async function renderGallery() {
  console.log('Run renderGallery');

  // get the data
  const photos = await getTopPhotos();

  // find or create the parent element that will contain the data
  const galleryContainer = document.querySelector('#gallery-container');

  // create the list of images
  const gallery = document.createElement('ul');
  gallery.id = 'gallery';
  
  // create list items
  photos.forEach(photo => {
    // create
    const imageItem = document.createElement('li');
    const image = document.createElement('img');
    
    // populate
    image.setAttribute('src', photo.thumbnailUrl);

    // append to DOM
    imageItem.appendChild(image);
    gallery.appendChild(imageItem);
  });

  galleryContainer.appendChild(gallery);
}

export function unusedContentFunc() {
  console.log('Hi, I am never called, I just wanna see if I get shaken out of content.js');
}
