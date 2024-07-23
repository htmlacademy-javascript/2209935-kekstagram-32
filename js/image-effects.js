import { imageUploadPopup, uploadedImagePreview } from './user-form';

const imageEffectsSlider = imageUploadPopup.querySelector('.effect-level__slider');
const imageEffectsContainer = imageUploadPopup.querySelector('.effects__list');
const imageEffectValue = imageUploadPopup.querySelector('.effect-level__value');

let currentSliderEffect = '';
let currentSliderValue = 0;

noUiSlider.create(imageEffectsSlider, {
  range: {
    min: 0,
    max: 10,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

function onEffectItemClick (element) {
  currentSliderEffect = element.getAttribute('id');
  switch (currentSliderEffect) {
    case 'effect-none':
      //imageEffectsSlider.noUiSlider.destroy();
      uploadedImagePreview.style.removeProperty('filter');
      break;
    case 'effect-chrome':
      imageEffectsSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'effect-sepia':
      imageEffectsSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'effect-marvin':
      imageEffectsSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;
    case 'effect-phobos':
      imageEffectsSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    case 'effect-heat':
      imageEffectsSlider.noUiSlider.updateOptions({
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

function onChangeEffectUpdate () {
  currentSliderValue = imageEffectsSlider.noUiSlider.get();
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

imageEffectsSlider.noUiSlider.on('update', onChangeEffectUpdate);
