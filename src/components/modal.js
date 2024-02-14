function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function closeByOverlay(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.target === openedPopup) {
    closePopup();
  }
}

function closeByClick(evt) {
  if (evt.target.classList.contains('popup__close')) {
    closePopup();
  }
}

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
  popup.addEventListener('mousedown', closeByOverlay);
  popup.addEventListener('click', closeByClick);
}

function closePopup() {
  const openedPopup = document.querySelector('.popup_is-opened');
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
  openedPopup.removeEventListener('mousedown', closeByOverlay);
  openedPopup.removeEventListener('click', closeByClick);
}

export { openPopup, closePopup };
