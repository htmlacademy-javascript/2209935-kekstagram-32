import { isPressedKeyEscape, isArrayEmpty } from './utils.js';

const SHOWN_COMMENTS_COUNT = 5; // число выводимых комментариев за один раз

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const bigPictureCloseButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsTotalCountElement = commentCountElement.querySelector('.social__comment-total-count');
const commentsShownCountElement = commentCountElement.querySelector('.social__comment-shown-count');
const postDescriptionElement = bigPictureElement.querySelector('.social__caption');
const commentTemplateElement = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderButtonElement = bigPictureElement.querySelector('.social__comments-loader');

let paintComments;

const onPostCloseButtonKeydown = (evt) => { // обрабатывает закрытие поста клавишей esc
  if (isPressedKeyEscape(evt)) {
    evt.preventDefault();
    closePost();
  }
};

const onPostCloseButtonClick = (evt) => { // обрабатывает закрытие поста кнопкой крестиком
  evt.preventDefault();
  closePost();
};

function closePost () { // закрывает окна поста
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPostCloseButtonKeydown);
  bigPictureCloseButtonElement.removeEventListener('click', onPostCloseButtonClick);
  commentsListElement.innerHTML = '';
  commentsLoaderButtonElement.classList.remove('hidden');
}

function onLoadMoreCommentsButtonClick() { // обрабатывает клик по кнопке Загрузить еще
  paintComments();
}

const paintCommentsCreator = (comments) => { // отрисовывает комментарии
  const commentFragment = document.createDocumentFragment();
  const workVersionComments = structuredClone(comments);
  let shownCommentsCount = 0;

  return () => {
    if (workVersionComments.length < SHOWN_COMMENTS_COUNT) {
      shownCommentsCount += workVersionComments.length;
    } else {
      shownCommentsCount += SHOWN_COMMENTS_COUNT;
    }

    const partComments = workVersionComments.splice(0, SHOWN_COMMENTS_COUNT);
    commentsShownCountElement.textContent = shownCommentsCount;

    partComments.forEach(({avatar, message, name}) => {
      const comment = commentTemplateElement.cloneNode(true);
      const commentPicture = comment.querySelector('.social__picture');
      commentPicture.src = avatar;
      commentPicture.alt = name;
      comment.querySelector('.social__text').textContent = message;
      commentFragment.appendChild(comment);
    });

    commentsListElement.appendChild(commentFragment);

    if (isArrayEmpty(workVersionComments)) {
      commentsLoaderButtonElement.classList.add('hidden');
    }
  };
};

const onThumbnailClick = (post) => { // отрисовывает пост при клике на миниатюре
  const {url, description, likes, comments} = post;

  bigPictureImageElement.src = url;
  postDescriptionElement.textContent = description;
  likesCountElement.textContent = likes;
  commentsTotalCountElement.textContent = comments.length;
  commentsLoaderButtonElement.classList.remove('hidden');

  if (!isArrayEmpty(comments)) {
    paintComments = paintCommentsCreator(comments);
    paintComments();
  } else {
    commentsShownCountElement.textContent = 0;
    commentsLoaderButtonElement.classList.add('hidden');
  }

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPostCloseButtonKeydown); // обработчик закрытия окна по клавише esc

  bigPictureCloseButtonElement.addEventListener('click', onPostCloseButtonClick); // обрабочик закрытия окна по кнопке;
};

commentsLoaderButtonElement.addEventListener('click', onLoadMoreCommentsButtonClick); // обработчик дорисовки комментариев при клике на кнопку 'Загрузить еще'

export {onThumbnailClick};
