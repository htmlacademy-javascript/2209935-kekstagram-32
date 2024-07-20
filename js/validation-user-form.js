import { picturesContainer } from './thumbnails-painting.js';

const uploadImageForm = picturesContainer.querySelector('.img-upload__form');

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
},
false);

function checkDuplicateHash (array) {
  const set = new Set();
  for (let i = 0; i < array.length; i++) {
    if (set.has(array[i])) {
      return true;
    }
    set.add(array[i]);
  }
}

function validateHashTagsArray (value) {
  return /^(#[a-zа-яё0-9]{1,19})(\s+#[a-zа-яё0-9]{1,19}){0,5}$/i.test(value);
}

function getHashtagsErrorMessage (value) {
  let errorString = 'Ошибка ввода: ';
  if (/^(#[a-zа-яё0-9]{1,19})(\s+#[a-zа-яё0-9]{1,19}){0,5}$/i.test(value)) {
    const inputHashtagsArray = value.match(/#[a-zа-яё0-9]{1,19}/g);
    if (checkDuplicateHash(inputHashtagsArray)) {
      errorString += 'хэштеги повторяются';
      return errorString;
    }
    if (inputHashtagsArray.length > 5) {
      errorString += 'превышено количество хэштегов';
      return errorString;
    }
  } else {
    errorString += 'введен невалидный хэштег';
    return errorString;
  }
}

pristine.addValidator(uploadImageForm.querySelector('.text__hashtags'), validateHashTagsArray, getHashtagsErrorMessage);

uploadImageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

