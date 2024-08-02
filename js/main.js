import { getData } from './api.js';
import { paintPosts } from './thumbnails-painting.js';
import { onThumbnailClick } from './full-post-painting.js';
import './validation-user-form.js';
import './user-form.js';
import './user-form-change-size-image.js';
import './image-effects.js';
import { debounce} from './utils.js';
import { onFilterClick } from './filtration-posts.js';

const RERENDER_DELAY = 500;

const filterForm = document.querySelector('.img-filters');
const currentButton = filterForm.querySelector('.img-filters__button--active');
const picturesContainer = document.querySelector('.pictures');

getData()
  .then((posts) => {
    filterForm.classList.remove('img-filters--inactive');
    paintPosts(posts, currentButton.getAttribute('id'));
    picturesContainer.addEventListener('click', (evt) => {
      const target = evt.target.closest('.picture');
      if (target) {
        onThumbnailClick(posts[target.getAttribute('data-postid')]);
      }
    });
    onFilterClick(debounce((filter) => {
      paintPosts(posts, filter);
    }, RERENDER_DELAY));
  });

