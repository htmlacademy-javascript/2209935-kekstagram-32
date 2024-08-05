import { isPressedKeyEscape } from './utils.js';
import { closeEditImagePopup, onEditImagePopupCloseButtonKeydown } from './user-form.js';
import { sendData } from './api.js';
import { pristine } from './validation-user-form.js';

const bodyElement = document.querySelector('body');
const submitButtonElement = document.querySelector('.img-upload__submit');

const onDocumentLoadMessageEscapeKeyDown = (evt) => {
  if (isPressedKeyEscape(evt)) {
    const errorMessageElement = bodyElement.querySelector('.error');
    const successMessageElement = bodyElement.querySelector('.success');
    if(errorMessageElement) {
      removeLoadMessage(errorMessageElement);
      document.addEventListener('keydown', onEditImagePopupCloseButtonKeydown);
    } else if (successMessageElement) {
      removeLoadMessage(successMessageElement);
    }
    pristine.reset();
  }
};

function removeLoadMessage(element) {
  element.remove();
  document.removeEventListener('keydown', onDocumentLoadMessageEscapeKeyDown);
}

const loadDataFromUserSucces = () => {
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
};

const loadDataFromUserError = () => {
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
};

const onUserFormSubmitClick = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    submitButtonElement.disabled = true;
    const formData = new FormData(evt.target);
    sendData(formData)
      .then(loadDataFromUserSucces)
      .catch(loadDataFromUserError)
      .finally(() => {
        submitButtonElement.disabled = false;
      });
  }
};

export {loadDataFromUserError, loadDataFromUserSucces, onUserFormSubmitClick};
