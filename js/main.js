import { getData } from './api.js';
import { paintPosts } from './thumbnails-painting.js';
import './full-post-painting.js';
import './validation-user-form.js';
import './user-form.js';
import './user-form-change-size-image.js';
import './image-effects.js';

const filterContainer = document.querySelector('.img-filters');
const currentButton = filterContainer.querySelector('.img-filters__button--active');
filterContainer.classList.remove('img-filters--inactive');


const onFilterClick = (cb) => {
  filterContainer.addEventListener('click', (evt) => {
    const target = evt.target.closest('.img-filters__button');
    if (target) {
      cb(target.getAttribute('id'), target);
    }
  });
};

getData()
  .then((posts) => {
    paintPosts(posts, 'filter-default', currentButton);
    onFilterClick((filter, activeButton) => paintPosts(posts, filter, activeButton));
  });

