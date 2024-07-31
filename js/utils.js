const getRandomInteger = (min, max) => { // функция генерации случайного целого числа из диапазона
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

function createRandomNumberFromRangeGenerator (min, max) { // функция генерации неповторяющихся целых чисел из диапазона
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
}

const isPressedKeyEscape = (evt) => evt.key === 'Escape';

function removeDomElement(element) {
  element.remove();
}

export{isPressedKeyEscape, removeDomElement, createRandomNumberFromRangeGenerator};
