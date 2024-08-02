const imageUploadPopup = document.querySelector('.img-upload__overlay');
const changeImageSizeInput = imageUploadPopup.querySelector('.scale__control--value');
const uploadedImagePreview = imageUploadPopup.querySelector('.img-upload__preview img');

function changeImageSize (element) {
  let imageSizeCurrentValue = parseInt(changeImageSizeInput.value, 10);
  if (element.classList.contains('scale__control--smaller')) {
    if (imageSizeCurrentValue >= 50 && imageSizeCurrentValue <= 100) {
      imageSizeCurrentValue -= 25;
    } else {
      return;
    }
  } else if (element.classList.contains('scale__control--bigger')) {
    if (imageSizeCurrentValue >= 0 && imageSizeCurrentValue < 100) {
      imageSizeCurrentValue += 25;
    } else {
      return;
    }
  }
  changeImageSizeInput.value = `${imageSizeCurrentValue}%`;
  uploadedImagePreview.style.transform = `scale(${imageSizeCurrentValue / 100})`;
}

export {changeImageSize};
