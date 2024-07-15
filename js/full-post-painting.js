import { posts } from './thumbnails-painting.js';
import { isPressedKeyEscape } from './utils.js';

const thumbnails = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const addThumbnailClickHandler = (thumbnail, bigPhoto, likes) => { // функция вешает обработчики на миниатюры
  thumbnail.addEventListener('click', () => {
    bigPictureImage.src = bigPhoto;
    likesCount.textContent = likes;
    bigPicture.classList.remove('hidden');
  });
};

for (let i = 0; i < thumbnails.length; i++) { // в цикле навешиваем обработчики
  addThumbnailClickHandler(thumbnails[i], posts[i].url, posts[i].likes);
}

bigPictureCloseButton.addEventListener('click', (evt) => { // обрабочик закрытия окна по кнопке
  evt.preventDefault();
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => { // обработчик закрытия окна по клавише esc
  if (isPressedKeyEscape(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
});
