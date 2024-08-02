import { isPressedKeyEscape, removeDomElement } from './utils.js';
import { pristine } from './validation-user-form.js';
import {changeImageSize} from './user-form-change-size-image.js';
import {changeImageEffectSlider } from './image-effects.js';
import { sendData } from './api.js';

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
const submitButton = uploadImageForm.querySelector('.img-upload__submit');
const bodyElement = document.querySelector('body');

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


function onUserFormSubmitClick (evt) {
  evt.preventDefault();
  if (pristine.validate()) {
    submitButton.disabled = true;
    const formData = new FormData(evt.target);
    sendData(formData)
      .then(loadDataFromUserSucces)
      .then(loadDataFromUserError)
      .finally(() => {
        submitButton.disabled = false;
      });
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

export {closeEditImagePopup, onEditImagePopupChange};
