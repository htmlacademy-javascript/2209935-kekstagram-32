import { getData } from './api.js';
import { paintPosts } from './thumbnails-painting.js';
import './full-post-painting.js';
import './validation-user-form.js';
import './user-form.js';
import './user-form-change-size-image.js';
import './image-effects.js';

const filterContainer = document.querySelector('.img-filters');
filterContainer.classList.remove('img-filters--inactive');

const onFilterClick = (cb) => {
  filterContainer.addEventListener('click', (evt) => {
    const target = evt.target.closest('.img-filters__button');
    console.log(target);
    if (target) {
      if (target.getAttribute('id') === 'filter-random') {
        const pictures = document.querySelectorAll('.picture');
        for (let i = 0; i < pictures.length; i++) {
          pictures[i].remove();
        }
        const posts = [2, 5, 6];
        console.log('есть');
        cb(posts);
      } else if (target.getAttribute('id') === 'filter-discussed') {
        const pictures = document.querySelectorAll('.picture');
        for (let i = 0; i < pictures.length; i++) {
          pictures[i].remove();
        }
        cb();
      }
    }
  });
};

getData()
  .then((posts) => {
    paintPosts(posts);
    onFilterClick((idPosts) => {
      const filteredPosts = [];
      for (let i = 0; i < idPosts.length; i++) {
        filteredPosts[i] = posts[idPosts[i]];
      }
      paintPosts(filteredPosts);
    });
  });

