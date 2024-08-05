import { pristine } from './validation-user-form.js';
import {changeImageSize} from './user-form-change-size-image.js';
import {changeImageEffectSlider } from './image-effects.js';
import { loadDataFromUserError, onUserFormSubmitClick} from './load-data-from-user.js';
import { isPressedKeyEscape} from './utils.js';

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
const imageEffectsSliderContainer = imageUploadPopup.querySelector('.img-upload__effect-level');

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

function onChangeImageSize (evt) {
  const target = evt.target.closest('.scale__control');
  if (target) {
    changeImageSize(target);
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
  imageEffectsSliderContainer.classList.add('visually-hidden');
  changeSizeButtonsContainer.addEventListener('click', onChangeImageSize);
}

function closeEditImagePopup () {
  imageUploadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  popupCloseButton.removeEventListener('click', onEditImagePopupCloseButtonClick);
  document.removeEventListener('keydown', onEditImagePopupCloseButtonKeydown);
  pristine.reset();
  uploadImageForm.reset();
  changeImageEffectSlider.reset();
  uploadedImagePreview.style.removeProperty('transform');
  uploadedImagePreview.style.removeProperty('filter');
  changeSizeButtonsContainer.removeEventListener('click', onChangeImageSize);
}

function onEditImagePopupChange (evt) {
  evt.preventDefault();
  openEditImagePopup();
}

function onEditImagePopupCloseButtonClick() {
  closeEditImagePopup();
}

export {closeEditImagePopup, onEditImagePopupChange, onEditImagePopupCloseButtonKeydown};
