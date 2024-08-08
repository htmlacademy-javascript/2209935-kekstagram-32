import { isPressedKeyEscape, isArrayEmpty } from './utils.js';

const SHOWN_COMMENTS_COUNT = 5; // число выводимых комментариев за один раз

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
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPostCloseButtonKeydown);
  bigPictureCloseButton.removeEventListener('click', onPostCloseButtonClick);
  commentsList.innerHTML = '';
  commentsLoaderButton.classList.remove('hidden');
}

function switchOffCommentsLoaderButton () {
  commentsLoaderButton.classList.add('hidden');
  commentsLoaderButton.removeEventListener('click', onLoadMoreCommentsButton);
}

function onLoadMoreCommentsButton() { // обрабатывает клик по кнопке Загрузить еще
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
    commentsShownCount.textContent = shownCommentsCount;

    partComments.forEach(({avatar, message, name}) => {
      const comment = commentTemplate.cloneNode(true);
      const commentPicture = comment.querySelector('.social__picture');
      commentPicture.src = avatar;
      commentPicture.alt = name;
      comment.querySelector('.social__text').textContent = message;
      commentFragment.appendChild(comment);
    });

    commentsList.appendChild(commentFragment);

    if (isArrayEmpty(workVersionComments)) {
      switchOffCommentsLoaderButton(workVersionComments);
    }
  };
};

const onThumbnailClick = (post) => { // отрисовывает пост при клике на миниатюре
  const {url, description, likes, comments} = post;

  bigPictureImage.src = url;
  postDescription.textContent = description;
  likesCount.textContent = likes;
  commentsTotalCount.textContent = comments.length;
  commentsLoaderButton.classList.remove('hidden');

  if (!isArrayEmpty(comments)) {
    paintComments = paintCommentsCreator(comments);
    paintComments();
    commentsLoaderButton.addEventListener('click', onLoadMoreCommentsButton); // обработчик дорисовки комментариев при клике на кнопку 'Загрузить еще'
  } else {
    commentsShownCount.textContent = 0;
    commentsLoaderButton.classList.add('hidden');
  }

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPostCloseButtonKeydown); // обработчик закрытия окна по клавише esc

  bigPictureCloseButton.addEventListener('click', onPostCloseButtonClick); // обрабочик закрытия окна по кнопке;
};

export {onThumbnailClick};
