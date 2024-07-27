import { painPosts } from './thumbnails-painting.js';

let postsArray = [];

fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((posts) => {
    painPosts(posts);
    postsArray = posts;
  });

export {postsArray};
