const imageUploadPopup = document.querySelector('.img-upload__overlay');
const changeImageSizeInput = imageUploadPopup.querySelector('.scale__control--value');
const uploadedImagePreview = imageUploadPopup.querySelector('.img-upload__preview img');

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

export {changeImageSize};
