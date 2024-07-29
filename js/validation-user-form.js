const uploadImageForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadImageForm.querySelector('.text__hashtags');
const commentInput = uploadImageForm.querySelector('.text__description');

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});


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

export {pristine};
