import { isPressedKeyEscape, removeDomElement } from './utils.js';
import { closeEditImagePopup, onEditImagePopupCloseButtonKeydown } from './user-form.js';
import { sendData } from './api.js';
import { pristine } from './validation-user-form.js';

const bodyElement = document.querySelector('body');
const submitButton = document.querySelector('.img-upload__submit');

function loadDataFromUserSucces () {
  closeEditImagePopup();
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
}

function loadDataFromUserError () {
  document.removeEventListener('keydown', onEditImagePopupCloseButtonKeydown);
  const loadErrorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessageTemplate = loadErrorTemplate.cloneNode(true);
  bodyElement.appendChild(errorMessageTemplate);

  const errorMessage = bodyElement.querySelector('.error');
  const errorMessageCloseButton = errorMessage.querySelector('.error__button');

  errorMessageCloseButton.addEventListener('click', () => {
    removeDomElement(errorMessage);
    pristine.reset();
  });

  document.addEventListener('keydown', (evt) => {
    if (isPressedKeyEscape(evt)) {
      removeDomElement(errorMessage);
      pristine.reset();
      document.addEventListener('keydown', onEditImagePopupCloseButtonKeydown);
    }
  });

  document.addEventListener('click', () => {
    pristine.reset();
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
      .catch(loadDataFromUserError)
      .finally(() => {
        submitButton.disabled = false;
      });
  }
}

export {loadDataFromUserError, loadDataFromUserSucces, onUserFormSubmitClick};
