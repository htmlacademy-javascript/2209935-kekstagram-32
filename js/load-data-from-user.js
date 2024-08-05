import { isPressedKeyEscape } from './utils.js';
import { closeEditImagePopup, onEditImagePopupCloseButtonKeydown } from './user-form.js';
import { sendData } from './api.js';
import { pristine } from './validation-user-form.js';

const bodyElement = document.querySelector('body');
const submitButton = document.querySelector('.img-upload__submit');

function onDocumentLoadMessageEscapeKeyDown (evt) {
  if (isPressedKeyEscape(evt)) {
    const errorMessage = bodyElement.querySelector('.error');
    const successMessage = bodyElement.querySelector('.success');
    if(errorMessage) {
      removeLoadMessage(errorMessage);
      document.addEventListener('keydown', onEditImagePopupCloseButtonKeydown);
    } else if (successMessage) {
      removeLoadMessage(successMessage);
    }
    pristine.reset();
  }
}

function removeLoadMessage(element) {
  element.remove();
  document.removeEventListener('keydown', onDocumentLoadMessageEscapeKeyDown);
}

function loadDataFromUserSucces () {
  closeEditImagePopup();
  const loadSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessageTemplate = loadSuccessTemplate.cloneNode(true);
  bodyElement.appendChild(successMessageTemplate);

  const successMessage = bodyElement.querySelector('.success');
  const successMessageCloseButton = successMessage.querySelector('.success__button');

  successMessageCloseButton.addEventListener('click', () => {
    removeLoadMessage(successMessage);
  });

  document.addEventListener('keydown', onDocumentLoadMessageEscapeKeyDown);

  successMessage.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      removeLoadMessage(successMessage);
    }
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
    removeLoadMessage(errorMessage);
    pristine.reset();
  });

  document.addEventListener('keydown', onDocumentLoadMessageEscapeKeyDown);

  errorMessage.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      pristine.reset();
      removeLoadMessage(errorMessage);
    }
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
