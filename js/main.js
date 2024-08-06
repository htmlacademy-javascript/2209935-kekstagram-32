
import './load-data-from-server.js';
import { onEditImagePopupChange } from './user-form.js';
import './user-form-change-size-image.js';
import './image-effects.js';
import './validation-user-form.js';

const imageUploadButtonElement = document.querySelector('.img-upload__input');

imageUploadButtonElement.addEventListener('change', onEditImagePopupChange);
