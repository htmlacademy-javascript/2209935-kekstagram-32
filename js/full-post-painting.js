import { isPressedKeyEscape } from './utils.js'; // импортируем функцию проверки нажата ли клавиша ESC
import { posts } from './thumbnails-painting.js';

const SHOWN_COMMENTS_PERIOD = 5;
let shownCommentsCount = 0;

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
  shownCommentsCount = 0;
  commentsList.innerHTML = '';
  commentsLoaderButton.classList.remove('hidden');
}

// функция отрисовывает комментарии
const paintComments = (comments) => {
  const commentFragment = document.createDocumentFragment();
  const workVersionComments = structuredClone(comments);
  let currentCommentsCount = 0;
  return () => {
    if (workVersionComments.length < SHOWN_COMMENTS_PERIOD) {
      currentCommentsCount = workVersionComments.length;
    } else {
      currentCommentsCount = 5;
    }
    shownCommentsCount += currentCommentsCount;
    commentsShownCount.textContent = shownCommentsCount;
    const partComments = workVersionComments.splice(0, currentCommentsCount);
    partComments.forEach(({avatar, message, name}) => {
      const comment = commentTemplate.cloneNode(true);
      const commentPicture = comment.querySelector('.social__picture');
      commentPicture.src = avatar;
      commentPicture.alt = name;

      if (workVersionComments.length === 0) {
        commentsLoaderButton.classList.add('hidden');
      }

      comment.querySelector('.social__text').textContent = message;
      commentFragment.appendChild(comment);
    });
    return commentFragment;
  };
};

// функция отрисовки поста при клике на миниатюре
const onThumbnailClick = (id) => {
  const post = posts[--id];
  const {url, description, likes, comments} = post;

  bigPictureImage.src = url;
  postDescription.textContent = description;
  likesCount.textContent = likes;
  commentsTotalCount.textContent = comments.length;

  const paintedComments = paintComments(comments);
  let paintedCommentsPart = paintedComments();
  commentsList.appendChild(paintedCommentsPart);

  commentsShownCount.textContent = shownCommentsCount;

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  commentsLoaderButton.addEventListener('click', () => {
    paintedCommentsPart = paintedComments();
    commentsList.appendChild(paintedCommentsPart);
  });

  document.addEventListener('keydown', onPostCloseButtonKeydown); // обработчик закрытия окна по клавише esc

  bigPictureCloseButton.addEventListener('click', onPostCloseButtonClick); // обрабочик закрытия окна по кнопке;
};

export {onThumbnailClick};
