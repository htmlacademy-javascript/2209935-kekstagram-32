const picturesContainerElement = document.querySelector('.pictures');

const getRandomInteger = (min, max) => { // генерирует случайное целое число из диапазона
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomNumberFromRangeGenerator = (min, max) => { // генерирует неповторяющиеся целые числа из диапазона
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const isPressedKeyEscape = (evt) => evt.key === 'Escape'; // проверяет нажата ли клавиша esc

const isArrayEmpty = (array) => array.length === 0; // проверяет не пустой ли массив

const debounce = (callback, timeoutDelay, event) => { // устраняет дребезг
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    picturesContainerElement.removeEventListener('click', event);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export{isPressedKeyEscape, createRandomNumberFromRangeGenerator, debounce, isArrayEmpty};
