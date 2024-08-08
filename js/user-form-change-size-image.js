const CHANGE_IMAGE_SIZE_STEP = 25;

const imageUploadPopupElement = document.querySelector('.img-upload__overlay');
const changeImageSizeInput = imageUploadPopupElement.querySelector('.scale__control--value');
const uploadedImagePreview = imageUploadPopupElement.querySelector('.img-upload__preview img');

const changeImageSize = (element) => { // изменяет зум картинки поста
  let imageSizeCurrentValue = parseInt(changeImageSizeInput.value, 10);
  if (element.classList.contains('scale__control--smaller')) {
    if (imageSizeCurrentValue >= 50 && imageSizeCurrentValue <= 100) {
      imageSizeCurrentValue -= CHANGE_IMAGE_SIZE_STEP;
    } else {
      return;
    }
  } else if (element.classList.contains('scale__control--bigger')) {
    if (imageSizeCurrentValue >= 0 && imageSizeCurrentValue < 100) {
      imageSizeCurrentValue += CHANGE_IMAGE_SIZE_STEP;
    } else {
      return;
    }
  }
  changeImageSizeInput.value = `${imageSizeCurrentValue}%`;
  uploadedImagePreview.style.transform = `scale(${imageSizeCurrentValue / 100})`;
};

export {changeImageSize};
