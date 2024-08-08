import { isPressedKeyEscape } from './utils.js';
import { closeEditImagePopup, onEditImagePopupCloseKeydown } from './user-form.js';
import { sendData } from './api.js';
import { pristine } from './validation-user-form.js';

const bodyElement = document.querySelector('body');
const submitButtonElement = document.querySelector('.img-upload__submit');

const onDocumentLoadMessageEscapeKeyDown = (evt) => { // обрабатывает нажание esc на сообщениях об успешной/неуспешной загрузке данных от пользователя
  if (isPressedKeyEscape(evt)) {
    const errorMessageElement = bodyElement.querySelector('.error');
    const successMessageElement = bodyElement.querySelector('.success');
    if(errorMessageElement) {
      removeLoadMessage(errorMessageElement);
      if (!document.querySelector('.img-upload__overlay').classList.contains('.hidden')) {
        document.addEventListener('keydown', onEditImagePopupCloseKeydown);
      }
    } else if (successMessageElement) {
      removeLoadMessage(successMessageElement);
    }
    pristine.reset();
  }
};

function removeLoadMessage(element) { // удаляет сообщение об ошибке/успехе загрузки данных
  element.remove();
  document.removeEventListener('keydown', onDocumentLoadMessageEscapeKeyDown);
}

const showMessageLoadDataFromUserSucces = () => { // обрабатывает успешную загрузку данных пользователя
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

const showMessageLoadDataFromUserError = () => { // обрабатывает ошибку загрузки данных пользователя
  document.removeEventListener('keydown', onEditImagePopupCloseKeydown);
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

const onUserFormSubmit = (evt) => { // обрабатывает отправку формы загрузки данных пользователя
  evt.preventDefault();
  if (pristine.validate()) {
    submitButtonElement.disabled = true;
    const formData = new FormData(evt.target);
    sendData(formData)
      .then(showMessageLoadDataFromUserSucces)
      .catch(showMessageLoadDataFromUserError)
      .finally(() => {
        submitButtonElement.disabled = false;
      });
  }
};

export {showMessageLoadDataFromUserError, onUserFormSubmit};
