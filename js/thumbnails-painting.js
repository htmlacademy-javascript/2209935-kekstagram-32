import { onThumbnailClick } from './full-post-painting.js'; // импортируем функцию для обработчика события клик по контейнеру миниатюр

// записываем в переменные необходимые узлы DOM
const picturesContainer = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');

function paintPosts(elements) { // отрисовывает миниатюры постов
  const postsFragment = document.createDocumentFragment();

  elements.forEach(({id, url, description, likes, comments}) => {
    const element = postTemplate.cloneNode(true);
    const postPicture = element.querySelector('.picture__img');
    element.setAttribute('data-postid', id);
    postPicture.src = url;
    postPicture.alt = description;
    element.querySelector('.picture__comments').textContent = comments.length;
    element.querySelector('.picture__likes').textContent = likes;
    postsFragment.appendChild(element);
  });
  picturesContainer.appendChild(postsFragment);

  // вешаем обработчик события клик на контейнере миниатюр
  picturesContainer.addEventListener('click', (evt) => {
    const target = evt.target.closest('.picture');
    if (target) {
      onThumbnailClick(elements[target.getAttribute('data-postid')]);
    }
  });

}

export {paintPosts};
