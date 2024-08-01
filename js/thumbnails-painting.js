import { onThumbnailClick } from './full-post-painting.js';
import { filterPosts } from './filtration.js';

const picturesContainer = document.querySelector('.pictures');

function setCurrentFilterButton (element) {
  const currentFilterButton = document.querySelector('.img-filters__button--active');
  currentFilterButton.classList.remove('img-filters__button--active');
  element.classList.add('img-filters__button--active');
}

function onPicturesContainerClickGenerator(elements) {
  return (evt) => {
    const target = evt.target.closest('.picture');
    if (target) {
      onThumbnailClick(elements[target.getAttribute('data-postid')]);
    }
  };
}

function paintPosts(elements, filter) { // отрисовывает миниатюры постов

  const onPicturesContainerClick = onPicturesContainerClickGenerator(elements);

  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((element) => element.remove());

  const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const postsFragment = document.createDocumentFragment();

  const filteredPosts = filterPosts (elements, filter);

  setCurrentFilterButton(document.querySelector(`.img-filters__button[id = ${filter}]`));

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

  return onPicturesContainerClick;
}

export {paintPosts, onPicturesContainerClickGenerator};
