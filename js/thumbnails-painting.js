import { filterPosts } from './filtration-posts.js';

const picturesContainer = document.querySelector('.pictures');

function paintPosts(elements, filter) { // отрисовывает миниатюры постов

  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((element) => element.remove());

  const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const postsFragment = document.createDocumentFragment();

  const filteredPosts = filterPosts (elements, filter);

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
}

export {paintPosts};
