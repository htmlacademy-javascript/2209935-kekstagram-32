import { createRandomIdFromRangeGenerator } from "./create-random-from-range";

const getRandomArrayElement = (elements) => {
  const indexElement = createRandomIdFromRangeGenerator(0, elements.length - 1);
  return elements[indexElement()];
};

export {getRandomArrayElement};