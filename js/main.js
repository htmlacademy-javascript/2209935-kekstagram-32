import { debounce} from './utils.js';
import { onFilterClick } from './filtration-posts.js';
import { getData } from './api.js';
import { paintPosts } from './thumbnails-painting.js';
import { onThumbnailClick } from './full-post-painting.js';
import './user-form-change-size-image.js';
import './image-effects.js';
import { onEditImagePopupChange } from './user-form.js';
import './validation-user-form.js';

const RERENDER_DELAY = 500;
const SHOW_ERROR_MESSAGE_TIME = 5000;

const bodyElement = document.querySelector('body');
const filterForm = document.querySelector('.img-filters');
const currentButton = filterForm.querySelector('.img-filters__button--active');
const picturesContainer = document.querySelector('.pictures');
const imageUploadButton = document.querySelector('.img-upload__input');


imageUploadButton.removeAttribute('disabled');
imageUploadButton.addEventListener('change', onEditImagePopupChange);

function loadDataFromServerError () {
  const loadErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorMessage = loadErrorTemplate.cloneNode(true);
  bodyElement.appendChild(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, SHOW_ERROR_MESSAGE_TIME);
}

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
  })
  .catch(loadDataFromServerError);

