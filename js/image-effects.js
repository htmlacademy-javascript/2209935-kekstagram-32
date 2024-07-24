import { uploadedImagePreview } from './user-form';
import { picturesContainer } from './thumbnails-painting.js';

const imageEffectsSlider = picturesContainer.querySelector('.effect-level__slider');
const imageEffectsContainer = picturesContainer.querySelector('.effects__list');
const imageEffectValue = picturesContainer.querySelector('.effect-level__value');

let currentSliderEffect = 'effect-none';

const changeImageEffectSlider = noUiSlider.create(imageEffectsSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

function hideEffectSlider () {
  imageEffectsSlider.classList.remove('visually-hidden');
}

function onEffectItemClick (element) {
  currentSliderEffect = element.getAttribute('id');
  switch (currentSliderEffect) {
    case 'effect-none':
      imageEffectsSlider.classList.add('visually-hidden');
      changeImageEffectSlider.reset();
      uploadedImagePreview.style.removeProperty('filter');
      break;
    case 'effect-chrome':
      hideEffectSlider();
      changeImageEffectSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'effect-sepia':
      hideEffectSlider();
      changeImageEffectSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'effect-marvin':
      hideEffectSlider();
      changeImageEffectSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;
    case 'effect-phobos':
      hideEffectSlider();
      changeImageEffectSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    case 'effect-heat':
      hideEffectSlider();
      changeImageEffectSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
  }
}

function onChangeEffectSliderUpdate () {
  const currentSliderValue = changeImageEffectSlider.get();
  imageEffectValue.value = currentSliderValue;

  switch (currentSliderEffect) {
    case 'effect-chrome':
      uploadedImagePreview.style.filter = `grayscale(${currentSliderValue})`;
      break;
    case 'effect-sepia':
      uploadedImagePreview.style.filter = `sepia(${currentSliderValue})`;
      break;
    case 'effect-marvin':
      uploadedImagePreview.style.filter = `invert(${currentSliderValue}%)`;
      break;
    case 'effect-phobos':
      uploadedImagePreview.style.filter = `blur(${currentSliderValue}px)`;
      break;
    case 'effect-heat':
      uploadedImagePreview.style.filter = `brightness(${currentSliderValue})`;
      break;
  }
}

imageEffectsContainer.addEventListener('click', (evt) => {
  const target = evt.target.closest('.effects__radio');
  if (target) {
    onEffectItemClick(target);
  }
});

changeImageEffectSlider.on('update', onChangeEffectSliderUpdate);

export {imageEffectsSlider, changeImageEffectSlider};
