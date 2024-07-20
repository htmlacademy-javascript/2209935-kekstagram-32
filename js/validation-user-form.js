import { picturesContainer } from './thumbnails-painting.js';

const uploadImageForm = picturesContainer.querySelector('.img-upload__form');

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

function validateHashTag (value) {
  return /^(#[a-zа-яё0-9]{1,19})(\s+#[a-zа-яё0-9]{1,19}){0,4}$/i.test(value);
}

pristine.addValidator(uploadImageForm.querySelector('.text__hashtags'), validateHashTag, 'Неправильный хэштег');

uploadImageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

