const filterContainer = document.querySelector('.img-filters');

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

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const onFilterClick = (cb) => {
  filterContainer.addEventListener('click', (evt) => {
    const target = evt.target.closest('.img-filters__button');
    if (target) {
      cb(target.getAttribute('id'), target);
    }
  });
};


export{isPressedKeyEscape, removeDomElement, createRandomNumberFromRangeGenerator, debounce, onFilterClick};
