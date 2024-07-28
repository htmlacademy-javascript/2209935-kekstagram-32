import { bodyElement } from './loader-data-server.js';
import { isPressedKeyEscape } from './utils.js';
import { closeEditImagePopup } from './user-form.js';

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

function loadDataFromUser (evt) {
  const formData = new FormData(evt.target);

  fetch ('https://32.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body: formData,
    }
  ).then (loadDataFromUserSucces)
    .catch(loadDataFromUserError);
}

export {loadDataFromUser};
