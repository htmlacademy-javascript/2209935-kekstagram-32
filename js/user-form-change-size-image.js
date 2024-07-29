const imageUploadPopup = document.querySelector('.img-upload__overlay');
const changeImageSizeInput = imageUploadPopup.querySelector('.scale__control--value');
const uploadedImagePreview = imageUploadPopup.querySelector('.img-upload__preview img');

function changeImageSizeGenerator () {
  let imageSizeCurrentValue = parseInt(changeImageSizeInput.value, 10);

  return (element) => {
    if (element.classList.contains('scale__control--smaller')) {
      if (imageSizeCurrentValue >= 50 && imageSizeCurrentValue <= 100) {
        imageSizeCurrentValue -= 25;
      }
    } else if (element.classList.contains('scale__control--bigger')) {
      if (imageSizeCurrentValue >= 0 && imageSizeCurrentValue < 100) {
        imageSizeCurrentValue += 25;
      }
    }
    changeImageSizeInput.value = `${imageSizeCurrentValue}%`;
    uploadedImagePreview.style.transform = `scale(${imageSizeCurrentValue / 100})`;
  };

}

export {changeImageSizeGenerator};
