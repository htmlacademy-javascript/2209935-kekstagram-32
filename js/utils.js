const isPressedKeyEscape = (evt) => evt.key === 'Escape';

function removeDomElement(element) {
  element.remove();
}

export{isPressedKeyEscape, removeDomElement};
