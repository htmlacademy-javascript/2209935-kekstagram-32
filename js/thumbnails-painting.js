import { createPosts } from './data.js'; // импортируем функцию создания массива постов
import { onThumbnailClick } from './full-post-painting.js'; // импортируем функцию для обработчика события клик по миниатюре

// записываем в переменные необходимые узлы DOM
const picturesContainer = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');

const posts = createPosts(); // генерируем массив постов

const postsFragment = document.createDocumentFragment();

// отрисовываем миниатюры постов и вешаем на каждую обработчик события клика по миниатюре
posts.forEach((postItem) => {
  const {url, description, likes, comments} = postItem;
  const post = postTemplate.cloneNode(true);
  const postPicture = post.querySelector('.picture__img');
  postPicture.src = url;
  postPicture.alt = description;
  post.querySelector('.picture__comments').textContent = comments.length;
  post.querySelector('.picture__likes').textContent = likes;
  post.addEventListener ('click', () => onThumbnailClick(postItem));
  postsFragment.appendChild(post);
});

picturesContainer.appendChild(postsFragment);
