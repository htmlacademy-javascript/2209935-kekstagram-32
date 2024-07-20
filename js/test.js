function checkDuplicateHash (array) {
  const set = new Set();
  for (let i = 0; i < array.length; i++) {
    if (set.has(array[i])) {
      return true;
    }
    set.add(array[i]);
  }
}

function validateHashTag (value) {
  let errorString = 'Ошибка ввода: ';
  if (/^(#[a-zа-яё0-9]{1,19})(\s+#[a-zа-яё0-9]{1,19})*$/i.test(value)) {
    const inputHashtagsArray = value.match(/#[a-zа-яё0-9]{1,19}/g);
    console.log(inputHashtagsArray);
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
  return true;
}

console.log(validateHashTag('#fg5 #458 #sjdh #ghjf #dfnj'));
