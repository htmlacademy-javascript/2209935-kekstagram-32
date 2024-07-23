import { picturesContainer } from './thumbnails-painting.js';
import { isPressedKeyEscape } from './utils.js';
import { pristine, onUserFormSubmitClick } from './validation-user-form.js';

const imageUploadButton = picturesContainer.querySelector('.img-upload__input');
const imageUploadPopup = picturesContainer.querySelector('.img-upload__overlay');
const popupCloseButton = imageUploadPopup.querySelector('.img-upload__cancel');
const uploadedImagePreview = imageUploadPopup.querySelector('.img-upload__preview img');
const effectsPrewiewImage = imageUploadPopup.querySelectorAll('.effects__preview');
const uploadImageForm = picturesContainer.querySelector('.img-upload__form');
const hashtagInput = uploadImageForm.querySelector('.text__hashtags');
const commentInput = uploadImageForm.querySelector('.text__description');

function openEditImagePopup() {
  imageUploadPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  const imageUrl = URL.createObjectURL(imageUploadButton.files[0]);
  uploadedImagePreview.src = imageUrl;
  effectsPrewiewImage.forEach((item) => {
    item.style.backgroundImage = `url(${imageUrl})`;
  });

  popupCloseButton.addEventListener('click', onEditImagePopupCloseButtonClick);
  document.addEventListener('keydown', onEditImagePopupCloseButtonKeydown);
  uploadImageForm.addEventListener('submit', onUserFormSubmitClick);
}

function closeEditImagePopup () {
  imageUploadButton.value = '';
  imageUploadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');

  popupCloseButton.removeEventListener('click', onEditImagePopupCloseButtonClick);
  document.removeEventListener('keydown', onEditImagePopupCloseButtonKeydown);

  uploadImageForm.removeEventListener('submit', onUserFormSubmitClick);
  pristine.reset();
}

function onEditImagePopupChange (evt) {
  evt.preventDefault();
  openEditImagePopup();
}

function onEditImagePopupCloseButtonClick() {
  closeEditImagePopup();
}

function onEditImagePopupCloseButtonKeydown(evt) {
  if (isPressedKeyEscape(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput | document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      closeEditImagePopup();
    }
  }
}

imageUploadButton.addEventListener('change', onEditImagePopupChange);

export {uploadImageForm, hashtagInput, commentInput};
