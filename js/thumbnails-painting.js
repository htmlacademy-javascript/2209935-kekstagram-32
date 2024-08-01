import { onThumbnailClick } from './full-post-painting.js'; // импортируем функцию для обработчика события клик по контейнеру миниатюр
import { createRandomNumberFromRangeGenerator } from './utils.js';

const picturesContainer = document.querySelector('.pictures');

const filters = {
  'filter-default': {
    paint() {
      
    }
  }
}

function setCurrentFilterButton (element) {
  const currentFilterButton = document.querySelector('.img-filters__button--active');
  currentFilterButton.classList.remove('img-filters__button--active');
  element.classList.add('img-filters__button--active');
}

function paintPosts(elements, flag, button) { // отрисовывает миниатюры постов
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((element) => element.remove());

  const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const postsFragment = document.createDocumentFragment();

  function onPicturesContainerClick(evt) {
    const target = evt.target.closest('.picture');
    if (target) {
      onThumbnailClick(elements[target.getAttribute('data-postid')]);
    }
  }

  picturesContainer.removeEventListener('click', onPicturesContainerClick);
  let filteredPosts = [];

  if (flag === 'filter-random') {
    const randomNumber = createRandomNumberFromRangeGenerator(0, 24);
    for (let i = 0; i < 10; i++) {
      filteredPosts[i] = elements[randomNumber()];
    }
	console.log(filteredPosts);
  } else if (flag === 'filter-default') {
    filteredPosts = elements;
	console.log(filteredPosts);
  } else if (flag === 'filter-discussed') {
    filteredPosts = elements.slice().sort((a, b) => b.comments.length - a.comments.length);
	console.log(filteredPosts);
  }
  setCurrentFilterButton(button);

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

  picturesContainer.addEventListener('click', onPicturesContainerClick);
}

export {paintPosts};
