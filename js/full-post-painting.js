import { isPressedKeyEscape } from './utils.js'; // импортируем функцию проверки нажата ли клавиша ESC
import { posts } from './thumbnails-painting.js';

// записываем в переменные необходимые узлы DOM
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

// функция обработки закрытия поста клавишей esc
const onPostCloseButtonKeydown = (evt) => {
  if (isPressedKeyEscape(evt)) {
    evt.preventDefault();
    closePost();
  }
};

// функция обработки закрытия поста кнопкой крестиком
const onPostCloseButtonClick = (evt) => {
  evt.preventDefault();
  closePost();
};

// функция закрытия окна поста
function closePost () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPostCloseButtonKeydown);
  bigPictureCloseButton.removeEventListener('click', onPostCloseButtonClick);
  commentsList.innerHTML = '';

}

// функция отрисовывает комментарии
const paintComments = (comments) => {
  const commentFragment = document.createDocumentFragment();
  comments.forEach(({avatar, message, name}) => {
    const comment = commentTemplate.cloneNode(true);
    const commentPicture = comment.querySelector('.social__picture');
    commentPicture.src = avatar;
    commentPicture.alt = name;
    comment.querySelector('.social__text').textContent = message;
    commentFragment.appendChild(comment);
  });
  return commentFragment;
};

// функция отрисовки поста при клике на миниатюре
const onThumbnailClick = (id) => {
  const post = posts[--id];
  const {url, description, likes, comments} = post;

  bigPictureImage.src = url;
  postDescription.textContent = description;
  likesCount.textContent = likes;
  commentsTotalCount.textContent = comments.length;
  commentsShownCount.textContent = comments.length;

  const paintedComments = paintComments(comments);
  commentsList.appendChild(paintedComments);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPostCloseButtonKeydown); // обработчик закрытия окна по клавише esc

  bigPictureCloseButton.addEventListener('click', onPostCloseButtonClick); // обрабочик закрытия окна по кнопке;
};

export {onThumbnailClick};
