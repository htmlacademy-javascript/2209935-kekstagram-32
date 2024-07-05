import { getRandomInteger } from "./get-random-integer";

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
}

export {createRandomIdFromRangeGenerator};