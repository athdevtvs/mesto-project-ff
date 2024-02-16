import '../pages/index.css';
import { initialCards } from '../components/cards.js';
import { createCard, deleteCard, likeCard } from '../components/card.js';
import { openPopup, closePopup } from '../components/modal.js';

const container = document.querySelector('.content');
const placesContainer = container.querySelector('.places__list');

const viewImage = evt => {
  const card = evt.target.closest('.places__item');
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title').textContent.trim();

  popupImg.src = cardImage.src;
  popupImg.alt = cardImage.alt;
  popupCaption.textContent = cardTitle;

  openPopup(imageViewPopup);
};

initialCards.forEach(card => {
  const cardElement = createCard(card, deleteCard, likeCard, viewImage);
  placesContainer.append(cardElement);
});

const popups = document.querySelectorAll('.popup');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const popupEditProfileForm = document.forms['edit-profile'];
const popupAddCardForm = document.forms['new-place'];
const editPopupButton = document.querySelector('.profile__edit-button');
const addPopupButton = document.querySelector('.profile__add-button');
const imageViewPopup = document.querySelector('.popup_type_image');
const popupImg = imageViewPopup.querySelector('.popup__image');
const popupCaption = imageViewPopup.querySelector('.popup__caption');

popups.forEach(popup => popup.classList.add('popup_is-animated'));

function openProfileEditPopup() {
  openPopup(editProfilePopup);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function openAddCardPopup() {
  openPopup(addCardPopup);
}

editPopupButton.addEventListener('click', openProfileEditPopup);
addPopupButton.addEventListener('click', openAddCardPopup);

const editProfileFormSubmitHandler = evt => {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = descriptionValue;

  closePopup();
};

const addCardFormSubmitHandler = evt => {
  evt.preventDefault();

  const card = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
    description: cardNameInput.value,
  };
  const cardElement = createCard(card, deleteCard, likeCard, viewImage);

  placesContainer.prepend(cardElement);

  closePopup();
};

popupEditProfileForm.addEventListener('submit', editProfileFormSubmitHandler);

popupAddCardForm.addEventListener('submit', evt => {
  addCardFormSubmitHandler(evt);
  document.forms['new-place'].reset();
});
