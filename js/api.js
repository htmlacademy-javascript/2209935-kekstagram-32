import { isPressedKeyEscape, removeDomElement } from './utils.js';
import { closeEditImagePopup } from './user-form.js';

const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const bodyElement = document.querySelector('body');
const SHOW_ERROR_MESSAGE_TIME = 5000;

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

function loadDataFromServerError () {
  const loadErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorMessage = loadErrorTemplate.cloneNode(true);
  bodyElement.appendChild(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, SHOW_ERROR_MESSAGE_TIME);
}


const load = (route, method, onError, body, onSuccess) =>
  fetch (`${BASE_URL}${route}`,{method, body})
    .then ((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(onSuccess)
    .catch(onError);

const getData = () => load(Route.GET_DATA, Method.GET, loadDataFromServerError);
const sendData = (body) => load(Route.SEND_DATA, Method.POST, loadDataFromUserError, body, loadDataFromUserSucces);

export {getData, sendData, loadDataFromUserError};
