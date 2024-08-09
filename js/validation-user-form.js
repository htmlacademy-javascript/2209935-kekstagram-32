const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENTS_LENGTH = 140;
const REG_EXP = /^#[a-zа-яё0-9]{1,19}$/;

const uploadImageFormElement = document.querySelector('.img-upload__form');
const hashtagInputElement = uploadImageFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadImageFormElement.querySelector('.text__description');

const pristine = new Pristine(uploadImageFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
}, false);


const createValidator = (type) => { // создает функцию-генератор валидации
  let hashtagsArray = [];

  return (value) => {
    hashtagsArray = value.trim().toLowerCase().split(' ').filter((element) => element !== '');
    const set = new Set(hashtagsArray);
    switch (type) {
      case 'correct':
        if (value.length === 0) {
          return true;
        }
        for (let i = 0; i < hashtagsArray.length; i++) {
          if (!REG_EXP.test(hashtagsArray[i])) {
            return false;
          }
        }
        return true;
      case 'overcount':
        if(hashtagsArray.length > MAX_HASHTAGS_COUNT) {
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

const validateCommentInput = (value) => value.length < MAX_COMMENTS_LENGTH;

const validatorCorrect = createValidator('correct'); // валидирует на корректность введеных хештегов
const validatorOverCount = createValidator('overcount'); // валидирует на превышение количества введеных хештегов
const validatorDuplicate = createValidator('duplicate'); // валидирует на повторение введеных хештегов

pristine.addValidator(hashtagInputElement, validatorCorrect, 'Введен невалидный хештег');
pristine.addValidator(hashtagInputElement, validatorOverCount, 'Превышено количество хештегов');
pristine.addValidator(hashtagInputElement, validatorDuplicate, 'Хештеги повторяются');
pristine.addValidator(commentInputElement, validateCommentInput, 'Длина комментария больше 140 символов');

export {pristine };
