const POST_DESCRIPTIONS = [ // массив описаний к постам
  'Возле живописного озера сидит девушка, читающая книгу',
  'Группа друзей весело отдыхает на пляже, играя в волейбол',
  'Мягкий свет заката освещает уютный домик в лесу',
  'Пара любовников смотрит на закат, держась за руки',
  'Цветущие яркие тюльпаны на фоне зеленого газона',
  'Улочка старого города, усыпанная цветущими розами',
  'Задумчивый мужчина сидит на скамейке в парке, глядя вдаль',
  'Радостный ребенок катается на качелях в детской площадке',
  'Морская волна бьется о скалы, создавая впечатляющий вид',
  'Мистический туман над лесом, скрывающий тайны',
  'Парк аттракционов вечером, сверкающий множеством огней',
  'Живописный городской пейзаж с высоты птичьего полета',
  'Поле подсолнухов, расцветающих под лучами солнца',
  'Старинный замок на фоне гор',
  'Девушка в платье танцует под звездным небом',
  'Чайная церемония в японском саду',
  'Стеклянный небоскреб, отражающий облака',
  'Магический лес с пенистым ручьем',
  'Парочка катается на лодке по тихому озеру',
  'Уличный художник создает шедевр на асфальте',
  'Полет воздушных шаров на фоне горизонта',
  'Велосипедист на закате, оставляющий след за собой',
  'Архитектурное чудо в историческом центре города',
  'Котенок играет с мячиком на траве',
  'Рыцарь в доспехах стоит на страже средневекового замка'
];

const MESSAGES = [ // массив для выборки комментариев
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [ // массив для выборки имен
  'Андрей',
  'Вован',
  'Петя',
  'Рома',
  'Виктор',
  'Сергей',
  'Дмитрий',
  'Николай',
  'Александр',
  'Алексей',
  'Игорь'
];

const MAX_COMMENTS_NUMBER = 30; // максимальное число комментариев
const POSTS_NUMBER = 25; // количество постов

const getRandomInteger = (min, max) => { // функция генерации случайного целого числа из диапазона
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

function createRandomIdFromRangeGenerator (min, max) { // функция генерации неповторяющихся целых чисел из диапазона
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

function createOrderedIdGenerator () { // функция генерации последовательных id
  let lastOrderedId = 0;

  return function () {
    lastOrderedId += 1;
    return lastOrderedId;
  };
}

const getRandomArrayElement = (elements) => {
  const indexElement = getRandomInteger(0, elements.length - 1);
  return elements[indexElement];
};

const generatePostId = createOrderedIdGenerator(); // генерируем id для постов

const createPostComments = (id) => ({ // функция создания комментария
  id,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPost = (id) => { // функция создания поста
  const generatePostCommentsId = createOrderedIdGenerator(); // генерируем id для комментариев
  return {
    id,
    url: `photos/${ id }.jpg`,
    description: createRandomIdFromRangeGenerator(0, POST_DESCRIPTIONS.length - 1),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, MAX_COMMENTS_NUMBER)}, () => createPostComments(generatePostCommentsId())),
  };
};
const posts = Array.from({length: POSTS_NUMBER}, () => createPost(generatePostId()));
const posts_2 = Array.from({length: POSTS_NUMBER}, () => createPost(generatePostId()));

