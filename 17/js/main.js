import { getData } from './api.js';
import { paintPosts } from './thumbnails-painting.js';
import './full-post-painting.js';
import './validation-user-form.js';
import './user-form.js';
import './user-form-change-size-image.js';
import './image-effects.js';
import { debounce, onFilterClick } from './utils.js';

const RERENDER_DELAY = 500;

const filterContainer = document.querySelector('.img-filters');
const currentButton = filterContainer.querySelector('.img-filters__button--active');
filterContainer.classList.remove('img-filters--inactive');
const picturesContainer = document.querySelector('.pictures');

getData()
  .then((posts) => {
    let eventFunction = paintPosts(posts, 'filter-default', currentButton);
    onFilterClick(debounce((filter, activeButton) => {
      picturesContainer.removeEventListener('click', eventFunction);
      eventFunction = paintPosts(posts, filter, activeButton);
    }, RERENDER_DELAY));
  });

