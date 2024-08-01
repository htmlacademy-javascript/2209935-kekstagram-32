import { isPressedKeyEscape } from './utils.js';
import { pristine } from './validation-user-form.js';
import {changeImageSizeGenerator} from './user-form-change-size-image.js';
import {changeImageEffectSlider } from './image-effects.js';
import { sendData, loadDataFromUserError } from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imageUploadButton = document.querySelector('.img-upload__input');
const imageUploadPopup = document.querySelector('.img-upload__overlay');
const popupCloseButton = imageUploadPopup.querySelector('.img-upload__cancel');
const effectsPrewiewImage = imageUploadPopup.querySelectorAll('.effects__preview');
const uploadImageForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadImageForm.querySelector('.text__hashtags');
const commentInput = uploadImageForm.querySelector('.text__description');
const changeSizeButtonsContainer = imageUploadPopup.querySelector('.img-upload__scale');
const uploadedImagePreview = imageUploadPopup.querySelector('.img-upload__preview img');
const imageEffectsSlider = imageUploadPopup.querySelector('.effect-level__slider');
const submitButton = uploadImageForm.querySelector('.img-upload__submit');

function onUserFormSubmitClick (evt) {
  evt.preventDefault();
  if (pristine.validate()) {
    submitButton.disabled = true;
    const formData = new FormData(evt.target);
    sendData(formData)
      .finally(() => {
        submitButton.disabled = false;
      });
  }
}

function openEditImagePopup() {

  const file = imageUploadButton.files[0];
  const fileName = file.name.toLowerCase();

  if (FILE_TYPES.some((item) => fileName.endsWith(item))) {
    const imageUrl = URL.createObjectURL(file);
    uploadedImagePreview.src = imageUrl;

    effectsPrewiewImage.forEach((item) => {
      item.style.backgroundImage = `url(${imageUrl})`;
    });
  } else {
    return loadDataFromUserError();
  }

  imageUploadPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  popupCloseButton.addEventListener('click', onEditImagePopupCloseButtonClick);
  document.addEventListener('keydown', onEditImagePopupCloseButtonKeydown);
  uploadImageForm.addEventListener('submit', onUserFormSubmitClick);

  const changeImageSize = changeImageSizeGenerator();

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
  imageUploadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  popupCloseButton.removeEventListener('click', onEditImagePopupCloseButtonClick);
  document.removeEventListener('keydown', onEditImagePopupCloseButtonKeydown);
  pristine.reset();
  changeImageEffectSlider.reset();
  uploadImageForm.reset();
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

export {closeEditImagePopup };
