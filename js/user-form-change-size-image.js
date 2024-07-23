import { picturesContainer } from './thumbnails-painting';
import { uploadedImagePreview } from './user-form';

const smallerImageSizeButton = picturesContainer.querySelector('.scale__control--smaller');
const biggerImageSizeButton = picturesContainer.querySelector('.scale__control--bigger');
const changeImageSizeInput = picturesContainer.querySelector('.scale__control--value');

function decreaseImageSize() {
  const imageSizeValueNumber = parseInt(changeImageSizeInput.value, 10);
  if (imageSizeValueNumber >= 50 && imageSizeValueNumber <= 100) {
    const imageSizeCurrentValue = imageSizeValueNumber - 25;
    changeImageSizeInput.value = `${imageSizeCurrentValue}%`;
    uploadedImagePreview.style.transform = `scale(${imageSizeCurrentValue / 100})`;
  }
}

function increaseImageSize() {
  const imageSizeValueNumber = parseInt(changeImageSizeInput.value, 10);
  if (imageSizeValueNumber >= 0 && imageSizeValueNumber < 100) {
    const imageSizeCurrentValue = imageSizeValueNumber + 25;
    changeImageSizeInput.value = `${imageSizeCurrentValue}%`;
    uploadedImagePreview.style.transform = `scale(${imageSizeCurrentValue / 100})`;
  }
}

export {smallerImageSizeButton, biggerImageSizeButton, decreaseImageSize, increaseImageSize};
