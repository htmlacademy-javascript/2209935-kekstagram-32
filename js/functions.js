// функця проверяет меньше ли длина строки string, чем значение length
function checkLength(string, length) {
  return string.length <= length;
}

// console.log(checkLength('asgdjfhgasdjh', 4)); // fasle, то есть не меньше
// console.log(checkLength('asgdjfhgasdjh', 30)); // true, то есть меньше

// функция проверяет является ли введеная строка checkString палиндромом
function isPalyndrom(checkString) {
  let newString = '';
  checkString = checkString.replaceAll(' ', '').toUpperCase();

  for (let i = checkString.length - 1; i >= 0; i--) {
    newString += checkString[i];
  }
  return (newString === checkString);
}

// console.log(isPalyndrom('Кекс')); // не палиндром
// console.log(isPalyndrom('топот')); // палиндром
// console.log(isPalyndrom('ДовОд')); // палиндром
// console.log(isPalyndrom('Лёша на полке клопа нашёл ')); // палиндром

function extractNumbers(checkString) {
  let result = '';
  checkString = String(checkString);
  for (let i = 0; i <= (checkString.length - 1); i++) {
    if (!Number.isNaN(parseInt(checkString[i], 10))) {
      result += checkString[i];
    }
  }
  return result === '' ? NaN : parseInt(result, 10);
}

// console.log(extractNumbers('2023 год'));
// console.log(extractNumbers('ECMAScript 2022'));
// console.log(extractNumbers('1 кефир, 0.5 батона'));
// console.log(extractNumbers('агент 007'));
// console.log(extractNumbers('а я томат'));
// console.log(extractNumbers(2023));
// console.log(extractNumbers(-1));
// console.log(extractNumbers(1.5));

