import { painPosts } from './thumbnails-painting.js';

const bodyElement = document.querySelector('body');

let postsArray = [];

function loadDataFromServerError () {
  const loadErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorMessage = loadErrorTemplate.cloneNode(true);
  bodyElement.appendChild(errorMessage);
  setTimeout(() => {
    bodyElement.removeChild(errorMessage);
  }, 5000);
}

fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((posts) => {
    painPosts(posts);
    postsArray = posts;
  })
  .catch(loadDataFromServerError);

export {postsArray, bodyElement};
