import { createPosts } from './data.js';

const picturesContainer = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');

const posts = createPosts();

const postsFragment = document.createDocumentFragment();

posts.forEach(({url, description, likes, comments}) => {
  const post = postTemplate.cloneNode(true);
  const postPicture = post.querySelector('.picture__img');
  postPicture.src = url;
  postPicture.alt = description;
  post.querySelector('.picture__comments').textContent = comments.length;
  post.querySelector('.picture__likes').textContent = likes;
  postsFragment.appendChild(post);
});

picturesContainer.appendChild(postsFragment);
