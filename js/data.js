import { getRandomInteger } from "./get-random-integer";
import { createRandomIdFromRangeGenerator } from "./create-random-from-range";
import { createOrderedIdGenerator } from "./create-ordered-id-generator";
import { getRandomArrayElement } from "./get-random-array-element";

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


const generatePostId = createOrderedIdGenerator(); // генерируем id для постов
const getCommentsNumber = createRandomIdFromRangeGenerator(0, MAX_COMMENTS_NUMBER); // генерируем случайное число комментариев

const createPostComments = (id) => ({ // функция создания комментария
  id,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPost = () => { // функция создания поста
  const generatePostCommentsId = createOrderedIdGenerator(); // генерируем id для комментариев
  const universePostId = generatePostId();
  return {
    id: universePostId,
    url: `photos/${ universePostId }.jpg`,
    description: getRandomArrayElement(POST_DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getCommentsNumber()}, () => createPostComments(generatePostCommentsId())),
  };
};
const createPosts = () => Array.from({length: POSTS_NUMBER}, createPost);

export {createPosts};
