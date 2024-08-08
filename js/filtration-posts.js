import { createRandomNumberFromRangeGenerator } from './utils.js';

const RANDOM_POSTS_COUNT = 10;

const filterContainerElement = document.querySelector('.img-filters');

const filters = {
  'filter-default': (input) => input,
  'filter-random': (input) => {
    const getRandomNumber = createRandomNumberFromRangeGenerator(0, input.length - 1);
    const output = [];
    for (let i = 0; i < RANDOM_POSTS_COUNT; i++) {
      output[i] = input[getRandomNumber()];
    }
    return output;
  },
  'filter-discussed': (input) => input.slice().sort((a, b) => b.comments.length - a.comments.length),
};

const setCurrentFilterButton = (element) => { // установливает кнопку активного фильтра
  const currentFilterButton = document.querySelector('.img-filters__button--active');
  currentFilterButton.classList.remove('img-filters__button--active');
  element.classList.add('img-filters__button--active');
};

const onFilterClick = (cb) => { // обрабатывает клик по фильтру
  filterContainerElement.addEventListener('click', (evt) => {
    const target = evt.target.closest('.img-filters__button');
    if (target) {
      setCurrentFilterButton(target);
      cb(target.getAttribute('id'));
    }
  });
};

const filterPosts = (posts, filter) => filters[filter](posts); // фильтрует посты

export {onFilterClick, filterPosts};
