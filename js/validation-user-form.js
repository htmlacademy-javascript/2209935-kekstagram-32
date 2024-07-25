import { uploadImageForm, hashtagInput, commentInput } from './user-form.js';

let hashtagsArray = [];

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

function onUserFormSubmitClick (evt) {
  evt.preventDefault();
  pristine.validate();
}

function checkDuplicateHashtags (array) {
  const set = new Set(array);
  return set.size !== array.length;
}

function stringToArray (string) {
  const noTrimString = string.trim().toLowerCase();
  const array = noTrimString.split(' ');
  return array;
}

function validateHashTagsCorrect (value) {
  if (value.length === 0) {
    return true;
  }
  hashtagsArray = stringToArray(value);
  for (let i = 0; i < hashtagsArray.length; i++) {
    if (!/^#[a-zа-яё0-9]{1,19}$/.test(hashtagsArray[i])) {
      return false;
    }
  }
  return true;
}

function validateHashTagsTooMuch () {
  if(hashtagsArray.length > 5) {
    return false;
  }
  return true;
}

function validateHashTagsDuplicate () {
  if (checkDuplicateHashtags(hashtagsArray)) {
    return false;
  }
  return true;
}

function validateCommentInput (value) {
  return value.length < 140;
}

pristine.addValidator(hashtagInput, validateHashTagsCorrect, 'Введен невалидный хештег');
pristine.addValidator(hashtagInput, validateHashTagsTooMuch, 'Превышено количество хештегов');
pristine.addValidator(hashtagInput, validateHashTagsDuplicate, 'Хештеги повторяются');

pristine.addValidator(commentInput, validateCommentInput, 'Длина комментария больше 140 символов');

uploadImageForm.addEventListener('submit', onUserFormSubmitClick);

export {pristine, onUserFormSubmitClick};
