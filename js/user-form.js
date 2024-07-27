import { picturesContainer } from './thumbnails-painting.js';
import { isPressedKeyEscape } from './utils.js';
import { pristine, onUserFormSubmitClick } from './validation-user-form.js';
import {changeImageSize, changeSizeButtonsContainer} from './user-form-change-size-image.js';
import { uploadedImagePreview, imageEffectsSlider, changeImageEffectSlider } from './image-effects.js';

const imageUploadButton = picturesContainer.querySelector('.img-upload__input');
const imageUploadPopup = picturesContainer.querySelector('.img-upload__overlay');
const popupCloseButton = imageUploadPopup.querySelector('.img-upload__cancel');
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

  changeSizeButtonsContainer.addEventListener('click', (evt) => {
    const target = evt.target.closest('.scale__control');
    if (target) {
      changeImageSize(target);
    }
  });

  imageEffectsSlider.classList.add('visually-hidden');
  uploadedImagePreview.style.transform = 'scale(1)';
  uploadedImagePreview.style.removeProperty('filter');
}

function closeEditImagePopup () {
  imageUploadButton.value = '';
  imageUploadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  popupCloseButton.removeEventListener('click', onEditImagePopupCloseButtonClick);
  document.removeEventListener('keydown', onEditImagePopupCloseButtonKeydown);
  uploadImageForm.removeEventListener('submit', onUserFormSubmitClick);
  pristine.reset();
  changeImageEffectSlider.reset();
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
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      closeEditImagePopup();
    }
  }
}

imageUploadButton.addEventListener('change', onEditImagePopupChange);

export {uploadImageForm, hashtagInput, commentInput, imageUploadPopup, uploadedImagePreview, closeEditImagePopup };
