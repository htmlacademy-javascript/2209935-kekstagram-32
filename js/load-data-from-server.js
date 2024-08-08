import { getData } from './api.js';
import { debounce} from './utils.js';
import { onFilterClick, filterPosts } from './filtration-posts.js';
import { paintPosts } from './thumbnails-painting.js';
import { onThumbnailClick } from './full-post-painting.js';

const RERENDER_DELAY = 500;
const SHOW_ERROR_MESSAGE_TIME = 5000;

const bodyElement = document.querySelector('body');
const filterFormElement = document.querySelector('.img-filters');
const picturesContainerElement = document.querySelector('.pictures');

let currentFilter = 'filter-default';


const showMessageLoadDataFromServerError = () => { // обрабатывет ошибку загрузки данных с сервера
  const loadErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorMessage = loadErrorTemplate.cloneNode(true);
  bodyElement.appendChild(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, SHOW_ERROR_MESSAGE_TIME);
};

getData()
  .then((posts) => {
    filterFormElement.classList.remove('img-filters--inactive');
    paintPosts(posts, currentFilter);
    picturesContainerElement.addEventListener('click', (evt) => {
      const target = evt.target.closest('.picture');
      if (target) {
        onThumbnailClick(posts[target.getAttribute('data-postid')]);
      }
    });
    onFilterClick(debounce((filter) => {
      if (filter === 'filter-random' || filter !== currentFilter) {
        const filteredPosts = filterPosts (posts, filter);
        paintPosts(filteredPosts, filter);
        currentFilter = filter;
      }
    }, RERENDER_DELAY));
  })
  .catch(showMessageLoadDataFromServerError);
