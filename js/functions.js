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

// задание "Функции возвращаются"

function checkCorrectEnter (stringTime) { // функция проверяет корректность введеного времени
  if (/^[0-2]?[0-9]{1}:[0-9]{1}[0-9]?$/.test(stringTime)) {
    const timeArray = stringTime.split(':');
    if (timeArray[0] > 23) {
      return null;
    }
    if (timeArray[1] > 59) {
      return null;
    } else {
      return timeArray;
    }
  } else {
    return null;
  }
}

function isMeetingInWorkTime (beginWorkingDay, endWorkingDay, beginMeeting, meetingDuration) { // основная функция проверки

  function timeToMinutes (fullTime) {
    return (+fullTime[0] * 60 + +fullTime[1]);
  }

  const beginWorkingDayTime = checkCorrectEnter(beginWorkingDay);
  if (beginWorkingDayTime === null) {
    return console.log('Некорректный формат времени');
  }

  const endWorkingDayTime = checkCorrectEnter(endWorkingDay);
  if (endWorkingDayTime === null) {
    return console.log('Некорректный формат времени');
  }

  const beginMeetingTime = checkCorrectEnter(beginMeeting);
  if (beginMeetingTime === null) {
    return console.log('Некорректный формат времени');
  }

  const beginWorkingDayMinutes = timeToMinutes(beginWorkingDayTime);
  const endWorkingDayMinutes = timeToMinutes(endWorkingDayTime);
  const beginMeetingMinutes = timeToMinutes(beginMeetingTime);


  if (beginMeetingMinutes >= beginWorkingDayMinutes && (beginMeetingMinutes + meetingDuration) <= endWorkingDayMinutes) {
    return true;
  } else {
    return false;
  }
}


console.log(isMeetingInWorkTime('08:00', '17:30', '14:00', 90)); // true
console.log(isMeetingInWorkTime('8:0', '10:0', '8:0', 120)); // true
console.log(isMeetingInWorkTime('08:00', '14:30', '14:00', 90)); // false
console.log(isMeetingInWorkTime('14:00', '17:30', '08:0', 90)); // false
console.log(isMeetingInWorkTime('8:00', '17:30', '08:00', 900)); // false

console.log(isMeetingInWorkTime('88:0', '16:0', '15:30', 31)); // Некорректный формат времени
console.log(isMeetingInWorkTime('8:fgf', '16:0', '15:30', 31)); // Некорректный формат времени
