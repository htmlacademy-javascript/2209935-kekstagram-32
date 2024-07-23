import { uploadImageForm, hashtagInput, commentInput } from './user-form.js';

let hashtagsErrorArray = [];

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

function onUserFormSubmitClick (evt) {
  evt.preventDefault();
  pristine.validate();
}

function checkDuplicateHash (array) {
  const set = new Set();
  for (let i = 0; i < array.length; i++) {
    if (set.has(array[i])) {
      return true;
    }
    set.add(array[i]);
  }
}

function getHashtagsErrorMessage() {
  return hashtagsErrorArray;
}

function validateHashTags (value) {
  hashtagsErrorArray = [];
  if (/^(#[a-zа-яё0-9]{1,19})*(\s+#[a-zа-яё0-9]{1,19})*$/i.test(value)) {
    const inputHashtagsArray = value.match(/#[a-zа-яё0-9]{1,19}/g);
    if (checkDuplicateHash(inputHashtagsArray)) {
      hashtagsErrorArray.push('Хэштеги повторяются');
    }
    if (inputHashtagsArray.length > 5) {
      hashtagsErrorArray.push('Превышено количество хэштегов');
    }
    if (hashtagsErrorArray.length === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    hashtagsErrorArray.push('Введен невалидный хэштег');
    return false;
  }
}

function validateComment (value) {
  return /^.{0,140}$/i.test(value);
}

pristine.addValidator(hashtagInput, validateHashTags, getHashtagsErrorMessage);
pristine.addValidator(commentInput, validateComment, 'Длина комментария больше 140 символов');

export {pristine, onUserFormSubmitClick};
