import { isPressedKeyEscape } from './utils.js';
import { pristine, onUserFormSubmitClick } from './validation-user-form.js';
import {changeImageSize} from './user-form-change-size-image.js';
import {changeImageEffectSlider } from './image-effects.js';

const imageUploadButton = document.querySelector('.img-upload__input');
const imageUploadPopup = document.querySelector('.img-upload__overlay');
const popupCloseButton = imageUploadPopup.querySelector('.img-upload__cancel');
const effectsPrewiewImage = imageUploadPopup.querySelectorAll('.effects__preview');
const uploadImageForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadImageForm.querySelector('.text__hashtags');
const commentInput = uploadImageForm.querySelector('.text__description');
const bodyElement = document.querySelector('body');
const changeSizeButtonsContainer = imageUploadPopup.querySelector('.img-upload__scale');
const uploadedImagePreview = imageUploadPopup.querySelector('.img-upload__preview img');
const imageEffectsSlider = imageUploadPopup.querySelector('.effect-level__slider');
const inputEffectNone = imageUploadPopup.querySelector('#effect-none');

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
  pristine.reset();
  changeImageEffectSlider.reset();
  hashtagInput.value = '';
  commentInput.value = '';
  inputEffectNone.checked = true;
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

function removeDomElement(element) {
  element.remove();
}

function loadDataFromUserSucces () {
  const loadSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessageTemplate = loadSuccessTemplate.cloneNode(true);
  bodyElement.appendChild(successMessageTemplate);

  const successMessage = bodyElement.querySelector('.success');
  const successMessageCloseButton = successMessage.querySelector('.success__button');

  successMessageCloseButton.addEventListener('click', () => {
    removeDomElement(successMessage);
  });

  document.addEventListener('keydown', (evt) => {
    if (isPressedKeyEscape(evt)) {
      removeDomElement(successMessage);
    }
  });

  document.addEventListener('click', () => {
    removeDomElement(successMessage);
  });

  closeEditImagePopup();
}

function loadDataFromUserError () {
  const loadErrorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessageTemplate = loadErrorTemplate.cloneNode(true);
  bodyElement.appendChild(errorMessageTemplate);

  const errorMessage = bodyElement.querySelector('.error');
  const errorMessageCloseButton = errorMessage.querySelector('.error__button');

  errorMessageCloseButton.addEventListener('click', () => {
    removeDomElement(errorMessage);
  });

  document.addEventListener('keydown', (evt) => {
    if (isPressedKeyEscape(evt)) {
      removeDomElement(errorMessage);
    }
  });

  document.addEventListener('click', () => {
    removeDomElement(errorMessage);
  });
}

imageUploadButton.addEventListener('change', onEditImagePopupChange);

onUserFormSubmitClick(loadDataFromUserSucces, loadDataFromUserError);

export {closeEditImagePopup };
