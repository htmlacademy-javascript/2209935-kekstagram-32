import { picturesContainer } from './thumbnails-painting';
import { uploadedImagePreview } from './user-form';

const smallerImageSizeButton = picturesContainer.querySelector('.scale__control--smaller');
const biggerImageSizeButton = picturesContainer.querySelector('.scale__control--bigger');
const changeImageSizeInput = picturesContainer.querySelector('.scale__control--value');
const changeSizeButtonsContainer = picturesContainer.querySelector('.img-upload__scale');

function changeImageSize (element) {
  const imageSizeValueNumber = parseInt(changeImageSizeInput.value, 10);
  let imageSizeCurrentValue = imageSizeValueNumber;

  if (element.classList.contains('scale__control--smaller')) {
    if (imageSizeValueNumber >= 50 && imageSizeValueNumber <= 100) {
      imageSizeCurrentValue = imageSizeValueNumber - 25;
    }
  } else if (element.classList.contains('scale__control--bigger')) {
    if (imageSizeValueNumber >= 0 && imageSizeValueNumber < 100) {
      imageSizeCurrentValue = imageSizeValueNumber + 25;
    }
  }
  changeImageSizeInput.value = `${imageSizeCurrentValue}%`;
  uploadedImagePreview.style.transform = `scale(${imageSizeCurrentValue / 100})`;
}

export {smallerImageSizeButton, biggerImageSizeButton, changeImageSize, changeSizeButtonsContainer};
