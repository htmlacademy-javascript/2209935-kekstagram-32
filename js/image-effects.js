const imageUploadPopupElement = document.querySelector('.img-upload__overlay');
const uploadedImagePreviewElement = imageUploadPopupElement.querySelector('.img-upload__preview img');
const imageEffectsSliderContainerElement = imageUploadPopupElement.querySelector('.img-upload__effect-level');
const imageEffectsSliderElement = imageUploadPopupElement.querySelector('.effect-level__slider');
const imageEffectsContainerElement = imageUploadPopupElement.querySelector('.effects__list');
const imageEffectValueElement = imageUploadPopupElement.querySelector('.effect-level__value');

const effects = {
  'effect-chrome': {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    },
    filter: 'grayscale',
    unit: ''
  },
  'effect-sepia': {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    },
    filter: 'sepia',
    unit: ''
  },
  'effect-marvin': {
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1
    },
    filter: 'invert',
    unit: '%'
  },
  'effect-phobos': {
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1
    },
    filter: 'blur',
    unit: 'px'
  },
  'effect-heat': {
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1
    },
    filter: 'brightness',
    unit: ''
  }
};

let currentSliderEffect = 'effect-none';

const imageEffectsSlider = noUiSlider.create(imageEffectsSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

const onEffectItemClick = (element) => { // обрабатывает клик по кнопке с выбором эффекта
  currentSliderEffect = element.getAttribute('id');
  if (currentSliderEffect === 'effect-none') {
    imageEffectsSliderContainerElement.classList.add('visually-hidden');
    imageEffectsSlider.reset();
    uploadedImagePreviewElement.style.removeProperty('filter');
  } else {
    imageEffectsSliderContainerElement.classList.remove('visually-hidden');
    imageEffectsSlider.updateOptions(effects[currentSliderEffect].options);
  }
};

imageEffectsContainerElement.addEventListener('click', (evt) => { // вешает обработчик на контейнер кнопок выбора эффектов
  const target = evt.target.closest('.effects__radio');
  if (target) {
    onEffectItemClick(target);
  }
});

imageEffectsSlider.on('update', () => { // обрабатывает обновление данных слайдера
  const currentSliderValue = imageEffectsSlider.get();
  imageEffectValueElement.value = currentSliderValue;
  if (currentSliderEffect !== 'effect-none') {
    uploadedImagePreviewElement.style.filter = `${effects[currentSliderEffect].filter}(${currentSliderValue}${effects[currentSliderEffect].unit})`;
  }
});

export {imageEffectsSlider};
