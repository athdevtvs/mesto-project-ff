import '../pages/index.css';
import { initialCards } from '../components/cards.js';
import { createCard, deleteCard, toggleLikeHandler, viewImageHandler } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';

const container = document.querySelector('.content');
const placesContainer = container.querySelector('.places__list');

initialCards.forEach(card => {
  const cardElement = createCard(card, deleteCard, toggleLikeHandler, viewImageHandler);
  placesContainer.append(cardElement);
});

const popupWindows = document.querySelectorAll('.popup');
const popupButtons = [
  document.querySelector('.profile__edit-button'),
  document.querySelector('.profile__add-button'),
  document.querySelector('.card__image'),
];
const popupCloseButtons = document.querySelectorAll('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileTItle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');
const popupEditProfileWindow = document.querySelector('.popup_type_edit');
const popupAddCardWindow = document.querySelector('.popup_type_new-card');
const popupEditProfileForm = document.forms['edit-profile'];
const popupAddCardForm = document.forms['new-place'];
const popupImageViewWindow = document.querySelector('.popup_type_image');

popupButtons.forEach((popupButton, index) => {
  popupWindows[index].classList.add('popup_is-animated');

  popupButton.addEventListener('click', () => {
    openModal(popupWindows[index]);
  });

  popupCloseButtons.forEach(popupCloseButton => {
    popupCloseButton.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup__close')) {
        closeModal(popupWindows[index]);
      }
    });
  });

  nameInput.value = profileTItle.textContent;
  descriptionInput.value = profileDescription.textContent;
});

const editProfileFormSubmitHandler = (evt, popupWindow) => {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;

  profileTItle.textContent = nameValue;
  profileDescription.textContent = descriptionValue;

  closeModal(popupWindow);
};

const addCardFormSubmitHandler = (evt, popupWindow) => {
  evt.preventDefault();

  const card = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
    description: cardNameInput.value,
  };
  const cardElement = createCard(card, deleteCard, toggleLikeHandler, viewImageHandler);

  placesContainer.prepend(cardElement);

  closeModal(popupWindow);
};

popupEditProfileForm.addEventListener('submit', evt => {
  editProfileFormSubmitHandler(evt, popupEditProfileWindow);
});

popupAddCardForm.addEventListener('submit', evt => {
  addCardFormSubmitHandler(evt, popupAddCardWindow);
});

const imageView = (src, alt) => {
  const setAttributes = (el, attributes) => {
    for (let key in attributes) {
      el.setAttribute(key, attributes[key]);
    }
  };

  setAttributes(popupImageViewWindow.querySelector('.popup__image'), {
    src: src,
    alt: alt,
  });
  popupImageViewWindow.querySelector('.popup__caption').textContent = alt;

  openModal(popupImageViewWindow);
};

const imageViewHandler = (item, index) => {
  const cardDescription = document.querySelectorAll('.card__description');
  const cardImageValue = item.src;
  const cardDescriptionValue = cardDescription[index].textContent.trim();
  popupImageViewWindow.classList.add('popup_is-animated');
  imageView(cardImageValue, cardDescriptionValue);
};

document.querySelectorAll('.card__image').forEach((item, index) => {
  item.addEventListener('click', () => imageViewHandler(item, index));
});
