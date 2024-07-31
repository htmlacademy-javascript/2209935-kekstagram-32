import { getData } from './api.js';
import { paintPosts } from './thumbnails-painting.js';
import './full-post-painting.js';
import './validation-user-form.js';
import './user-form.js';
import './user-form-change-size-image.js';
import './image-effects.js';

let postsArray = [];

getData()
  .then((posts) => {
    postsArray = posts;
    paintPosts(posts);
  });
export {postsArray};
