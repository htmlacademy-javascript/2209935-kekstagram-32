import { createPosts } from './data.js'; // импортируем функцию создания массива постов
import { onThumbnailClick } from './full-post-painting.js'; // импортируем функцию для обработчика события клик по контейнеру миниатюр

// записываем в переменные необходимые узлы DOM
const picturesContainer = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');

const posts = createPosts(); // генерируем массив постов

const postsFragment = document.createDocumentFragment();

// отрисовываем миниатюры постов
posts.forEach(({id, url, description, likes, comments}) => {
  const post = postTemplate.cloneNode(true);
  const postPicture = post.querySelector('.picture__img');
  post.setAttribute('postId', id);
  postPicture.src = url;
  postPicture.alt = description;
  post.querySelector('.picture__comments').textContent = comments.length;
  post.querySelector('.picture__likes').textContent = likes;
  postsFragment.appendChild(post);
});

picturesContainer.appendChild(postsFragment);

// вешаем обработчик события клик на контейнере миниатюр
picturesContainer.addEventListener('click', (evt) => {
  const target = evt.target.closest('.picture');
  if (target) {
    onThumbnailClick(target.getAttribute('postid'));
  }
});

export {posts};
