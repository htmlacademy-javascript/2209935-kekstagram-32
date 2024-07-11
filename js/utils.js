const getRandomInteger = (min, max) => { // функция генерации случайного целого числа из диапазона
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => { // функция генерации неповторяющихся целых чисел из диапазона
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

const createOrderedIdGenerator = () => { // функция генерации последовательных id
  let lastOrderedId = 0;

  return function () {
    lastOrderedId += 1;
    return lastOrderedId;
  };
};

const getRandomArrayElement = (elements) => {
  const indexElement = createRandomIdFromRangeGenerator(0, elements.length - 1);
  return elements[indexElement()];
};

export{getRandomInteger};
export{getRandomArrayElement};
export{createOrderedIdGenerator};
export{createRandomIdFromRangeGenerator};
