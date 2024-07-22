import { uploadImageForm, hashtagInput, commentInput } from './user-form.js';

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

function checkDuplicateHash (array) {
  const set = new Set();
  for (let i = 0; i < array.length; i++) {
    if (set.has(array[i])) {
      return true;
    }
    set.add(array[i]);
  }
}

function validateHashTags (value) {
  return /^(#[a-zа-яё0-9]{1,19})*(\s+#[a-zа-яё0-9]{1,19}){0,4}$/i.test(value);
}

function getHashtagsErrorMessage (value) {
  let errorString = 'Ошибка ввода: ';
  if (/^(#[a-zа-яё0-9]{1,19})(\s+#[a-zа-яё0-9]{1,19})*$/i.test(value)) {
    const inputHashtagsArray = value.match(/#[a-zа-яё0-9]{1,19}/g);
    if (checkDuplicateHash(inputHashtagsArray)) {
      errorString += 'хэштеги повторяются ';
    }
    if (inputHashtagsArray.length > 5) {
      errorString += 'превышено количество хэштегов ';
    }
    return errorString;
  } else {
    errorString += 'введен невалидный хэштег';
    return errorString;
  }
}

function validateComment (value) {
  return /^.{0,140}$/i.test(value);
}

pristine.addValidator(hashtagInput, validateHashTags, getHashtagsErrorMessage);
pristine.addValidator(commentInput, validateComment, 'Длина комментария больше 140 символов');


uploadImageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

