const escapeHandler = (evt, popupWindow) => {
  if (evt.key === 'Escape') {
    closeModal(popupWindow);
  }
};

const overlayHandler = (evt, popupWindow) => {
  if (evt.target === popupWindow) {
    closeModal(popupWindow);
  }
};

const openModal = popupWindow => {
  popupWindow.classList.add('popup_is-opened');
  document.addEventListener('keydown', evt => escapeHandler(evt, popupWindow));
  popupWindow.addEventListener('mousedown', evt => overlayHandler(evt, popupWindow));
};

const closeModal = popupWindow => {
  popupWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', evt => escapeHandler(evt, popupWindow));
  popupWindow.removeEventListener('mousedown', evt => overlayHandler(evt, popupWindow));
};

export { openModal, closeModal };
