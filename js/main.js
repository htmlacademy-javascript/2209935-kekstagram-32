import './thumbnails-painting.js';
import './full-post-painting.js';
import './validation-user-form.js';
import './user-form.js';
import './user-form-change-size-image.js';
import './image-effects.js';
import { getData } from './api.js';
import { painPosts } from './thumbnails-painting.js';

const bodyElement = document.querySelector('body');

let postsArray = [];
const SHOW_ERROR_MESSAGE_TIME = 5000;

function loadDataFromServerError () {
  const loadErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorMessage = loadErrorTemplate.cloneNode(true);
  bodyElement.appendChild(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, SHOW_ERROR_MESSAGE_TIME);
}

getData(loadDataFromServerError)
  .then((posts) => {
    painPosts(posts);
    postsArray = posts;
  });

export {postsArray};
