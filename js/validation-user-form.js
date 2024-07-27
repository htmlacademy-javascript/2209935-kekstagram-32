import { uploadImageForm, hashtagInput, commentInput, closeEditImagePopup } from './user-form.js';
import { bodyElement } from './loader-data.js';
import { isPressedKeyEscape } from './utils.js';


const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

function removeLoadMessage(container, element) {
  container.removeChild(element);
}

function loadDataFromUserSucces () {
  const loadSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessageTemplate = loadSuccessTemplate.cloneNode(true);
  bodyElement.appendChild(successMessageTemplate);

  const successMessage = bodyElement.querySelector('.success');
  const successMessageCloseButton = successMessage.querySelector('.success__button');

  successMessageCloseButton.addEventListener('click', () => {
    removeLoadMessage(bodyElement, successMessage);
  });

  document.addEventListener('keydown', (evt) => {
    if (isPressedKeyEscape(evt)) {
      removeLoadMessage(bodyElement, successMessage);
    }
  });

  document.addEventListener('click', () => {
    removeLoadMessage(bodyElement, successMessage);
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
    removeLoadMessage(bodyElement, errorMessage);
  });

  document.addEventListener('keydown', (evt) => {
    if (isPressedKeyEscape(evt)) {
      removeLoadMessage(bodyElement, errorMessage);
    }
  });

  document.addEventListener('click', () => {
    removeLoadMessage(bodyElement, errorMessage);
  });
}

function onUserFormSubmitClick (evt) {
  evt.preventDefault();

  if (pristine.validate()) {
    const formData = new FormData(evt.target);

    fetch ('https://32.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body: formData,
      }
    ).then (loadDataFromUserSucces)
      .catch(loadDataFromUserError);
  }
}

const createValidator = (type) => {
  let hashtagsArray = [];

  return (value) => {
    hashtagsArray = value.trim().toLowerCase().split(' ');
    const set = new Set(hashtagsArray);
    switch (type) {
      case 'correct':
        if (value.length === 0) {
          return true;
        }
        hashtagsArray = value.trim().toLowerCase().split(' ');
        for (let i = 0; i < hashtagsArray.length; i++) {
          if (!/^#[a-zа-яё0-9]{1,19}$/.test(hashtagsArray[i])) {
            return false;
          }
        }
        return true;
      case 'overcount':
        if(hashtagsArray.length > 5) {
          return false;
        }
        return true;
      case 'duplicate':
        if (set.size !== hashtagsArray.length) {
          return false;
        }
        return true;
    }
  };
};

function validateCommentInput (value) {
  return value.length < 140;
}

const validatorCorrect = createValidator('correct');
const validatorOverCount = createValidator('overcount');
const validatorDuplicate = createValidator('duplicate');
pristine.addValidator(hashtagInput, validatorCorrect, 'Введен невалидный хештег');
pristine.addValidator(hashtagInput, validatorOverCount, 'Превышено количество хештегов');
pristine.addValidator(hashtagInput, validatorDuplicate, 'Хештеги повторяются');

pristine.addValidator(commentInput, validateCommentInput, 'Длина комментария больше 140 символов');

uploadImageForm.addEventListener('submit', onUserFormSubmitClick);

export {pristine, onUserFormSubmitClick};
