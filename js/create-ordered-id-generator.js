const createOrderedIdGenerator = () => { // функция генерации последовательных id
  let lastOrderedId = 0;

  return function () {
    lastOrderedId += 1;
    return lastOrderedId;
  };
}

export {createOrderedIdGenerator};