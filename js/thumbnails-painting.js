import { onThumbnailClick } from './full-post-painting.js'; // импортируем функцию для обработчика события клик по контейнеру миниатюр
import { createRandomNumberFromRangeGenerator } from './utils.js';

// записываем в переменные необходимые узлы DOM
const picturesContainer = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');

function setCurrentFilterButton (element) {
  const currentFilterButton = document.querySelector('.img-filters__button--active');
  currentFilterButton.classList.remove('img-filters__button--active');
  element.classList.add('img-filters__button--active');
}

const getMostDiscussed = (array) => {
  
}

function paintPosts(elements, flag, button) { // отрисовывает миниатюры постов
  const postsFragment = document.createDocumentFragment();

  const pictures = document.querySelectorAll('.picture');
  let filteredPosts = [];

  if (flag === 'filter-random') {
    const randomNumber = createRandomNumberFromRangeGenerator(0, 24);
    for (let i = 0; i < 10; i++) {
      filteredPosts[i] = elements[randomNumber()];
    }
  } else if (flag === 'filter-default') {
    filteredPosts = elements;
  } else if (flag === 'filter-discussed') {
    filteredPosts = getMostDiscussed(elements);
  }
  setCurrentFilterButton(button);

  for (let i = 0; i < pictures.length; i++) {
    pictures[i].remove();
  }

  filteredPosts.forEach(({id, url, description, likes, comments}) => {
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
      onThumbnailClick(filteredPosts[target.getAttribute('data-postid')]);
    }
  });

}

export {paintPosts};
