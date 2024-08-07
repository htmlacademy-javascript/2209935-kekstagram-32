import { pristine } from './validation-user-form.js';
import {changeImageSize} from './user-form-change-size-image.js';
import {imageEffectsSlider } from './image-effects.js';
import { loadDataFromUserError, onUserFormSubmit} from './load-data-from-user.js';
import { isPressedKeyEscape} from './utils.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imageUploadButtonElement = document.querySelector('.img-upload__input');
const imageUploadPopupElement = document.querySelector('.img-upload__overlay');
const popupCloseButtonElement = imageUploadPopupElement.querySelector('.img-upload__cancel');
const effectsPrewiewImageElement = imageUploadPopupElement.querySelectorAll('.effects__preview');
const uploadImageFormElement = document.querySelector('.img-upload__form');
const hashtagInputElement = uploadImageFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadImageFormElement.querySelector('.text__description');
const changeSizeButtonsContainerElement = imageUploadPopupElement.querySelector('.img-upload__scale');
const uploadedImagePreviewElement = imageUploadPopupElement.querySelector('.img-upload__preview img');
const imageEffectsSliderContainerElement = imageUploadPopupElement.querySelector('.img-upload__effect-level');

const onChangeImageSize = (evt) => { // обрабатывает клик по кнопкам зума картинки
  const target = evt.target.closest('.scale__control');
  if (target) {
    changeImageSize(target);
  }
};


const openEditImagePopup = () => { // открывает окно редактирования поста

  const file = imageUploadButtonElement.files[0];
  const fileName = file.name.toLowerCase();

  if (FILE_TYPES.some((item) => fileName.endsWith(item))) {
    const imageUrl = URL.createObjectURL(file);
    uploadedImagePreviewElement.src = imageUrl;

    effectsPrewiewImageElement.forEach((item) => {
      item.style.backgroundImage = `url(${imageUrl})`;
    });
  } else {
    return loadDataFromUserError();
  }

  imageUploadPopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  popupCloseButtonElement.addEventListener('click', onEditImagePopupCloseButtonClick);
  document.addEventListener('keydown', onEditImagePopupCloseKeydown);
  uploadImageFormElement.addEventListener('submit', onUserFormSubmit);
  imageEffectsSliderContainerElement.classList.add('visually-hidden');
  changeSizeButtonsContainerElement.addEventListener('click', onChangeImageSize);
};

const closeEditImagePopup = () => { // закрывает окно редактирования поста
  imageUploadPopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  popupCloseButtonElement.removeEventListener('click', onEditImagePopupCloseButtonClick);
  document.removeEventListener('keydown', onEditImagePopupCloseKeydown);
  pristine.reset();
  uploadImageFormElement.reset();
  imageEffectsSlider.reset();
  uploadedImagePreviewElement.style.removeProperty('transform');
  uploadedImagePreviewElement.style.removeProperty('filter');
  changeSizeButtonsContainerElement.removeEventListener('click', onChangeImageSize);
};

function onEditImagePopupCloseKeydown (evt) { // обрабатывает нажатие esc на окне редактирвоания
  if (isPressedKeyEscape(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInputElement || document.activeElement === commentInputElement) {
      evt.stopPropagation();
    } else {
      closeEditImagePopup();
    }
  }
}

imageUploadButtonElement.addEventListener('change', (evt) => { // добавляет обработчик на кнопку открытия загрузки картинки пользователя
  evt.preventDefault();
  openEditImagePopup();
});

function onEditImagePopupCloseButtonClick() { // обработчик по кнопке закрытия окна редактирования
  closeEditImagePopup();
}

export {closeEditImagePopup, onEditImagePopupCloseKeydown};
