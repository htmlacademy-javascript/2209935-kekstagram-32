const imageUploadPopup = document.querySelector('.img-upload__overlay');
const uploadedImagePreview = imageUploadPopup.querySelector('.img-upload__preview img');
const imageEffectsSliderContainer = imageUploadPopup.querySelector('.img-upload__effect-level');
const imageEffectsSlider = imageUploadPopup.querySelector('.effect-level__slider');
const imageEffectsContainer = imageUploadPopup.querySelector('.effects__list');
const imageEffectValue = imageUploadPopup.querySelector('.effect-level__value');

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

const changeImageEffectSlider = noUiSlider.create(imageEffectsSlider, {
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

function onEffectItemClick (element) {
  currentSliderEffect = element.getAttribute('id');
  if (currentSliderEffect === 'effect-none') {
    imageEffectsSliderContainer.classList.add('visually-hidden');
    changeImageEffectSlider.reset();
    uploadedImagePreview.style.removeProperty('filter');
  } else {
    imageEffectsSliderContainer.classList.remove('visually-hidden');
    changeImageEffectSlider.updateOptions(effects[currentSliderEffect].options);
  }
}

function onChangeEffectSliderUpdate () {
  const currentSliderValue = changeImageEffectSlider.get();
  imageEffectValue.value = currentSliderValue;
  if (currentSliderEffect !== 'effect-none') {
    uploadedImagePreview.style.filter = `${effects[currentSliderEffect].filter}(${currentSliderValue}${effects[currentSliderEffect].unit})`;
    console.log('нарисовал');
  }
}

imageEffectsContainer.addEventListener('click', (evt) => {
  const target = evt.target.closest('.effects__radio');
  if (target) {
    onEffectItemClick(target);
  }
});

export {changeImageEffectSlider, onChangeEffectSliderUpdate};
