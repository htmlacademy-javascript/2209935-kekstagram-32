import { posts } from './thumbnails-painting.js';
import { isPressedKeyEscape } from './utils.js';

const thumbnails = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsTotalCount = commentCount.querySelector('.social__comment-total-count');
const commentsShownCount = commentCount.querySelector('.social__comment-shown-count');
const postDescription = bigPicture.querySelector('.social__caption');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');

const onClosePostKeydown = (evt) => { // функция обработки закрытия поста клавишей esc
  if (isPressedKeyEscape(evt)) {
    evt.preventDefault();
    closePost();
  }
};

const onClosePostClick = (evt) => { // функция обработки закрытия поста кнопкой крестиком
  evt.preventDefault();
  closePost();
};

function closePost () { // функция закрытия окна поста
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onClosePostKeydown);
  bigPictureCloseButton.removeEventListener('click', onClosePostClick);
}

const addThumbnailClickHandler = (thumbnail, bigPhoto, likes, comments, description) => { // функция отрисовки поста при клике
  thumbnail.addEventListener('click', () => {

    const commentFragment = document.createDocumentFragment();
    bigPictureImage.src = bigPhoto;
    postDescription.textContent = description;
    likesCount.textContent = likes;
    commentsTotalCount.textContent = comments.length;
    commentsShownCount.textContent = comments.length;

    comments.forEach(({avatar, message, name}) => {
      const comment = commentTemplate.cloneNode(true);
      const commentPicture = comment.querySelector('.social__picture');
      commentPicture.src = avatar;
      commentPicture.alt = name;
      comment.querySelector('.social__text').textContent = message;
      commentFragment.appendChild(comment);
    });

    commentsList.appendChild(commentFragment);
    commentCount.classList.add('hidden');
    commentsLoaderButton.classList.add('hidden');
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onClosePostKeydown); // обработчик закрытия окна по клавише esc

    bigPictureCloseButton.addEventListener('click', onClosePostClick); // обрабочик закрытия окна по кнопке;
  });
};

for (let i = 0; i < thumbnails.length; i++) { // в цикле навешиваем обработчики
  addThumbnailClickHandler(thumbnails[i], posts[i].url, posts[i].likes, posts[i].comments, posts[i].description);
}
