const CHANGE_IMAGE_SIZE_STEP = 25;

const imageUploadPopupElement = document.querySelector('.img-upload__overlay');
const changeImageSizeInputElement = imageUploadPopupElement.querySelector('.scale__control--value');
const uploadedImagePreviewElement = imageUploadPopupElement.querySelector('.img-upload__preview img');

const changeImageSize = (element) => { // изменяет зум картинки поста
  let imageSizeCurrentValue = parseInt(changeImageSizeInputElement.value, 10);
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
  changeImageSizeInputElement.value = `${imageSizeCurrentValue}%`;
  uploadedImagePreviewElement.style.transform = `scale(${imageSizeCurrentValue / 100})`;
};

export {changeImageSize};
