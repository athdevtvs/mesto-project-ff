import '../pages/index.css';
import { createCard, removeCard, changeLike } from '../components/card.js';
import { openPopup, closePopup } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import {
  getPageData,
  updateUserData,
  addNewCard,
  updateAvatar,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
} from '../components/api.js';

let cardId = '';
let cardItem = '';

const container = document.querySelector('.content');
const placesContainer = container.querySelector('.places__list');
const popupViewImage = document.querySelector('.popup_type_image');
const popupImg = popupViewImage.querySelector('.popup__image');
const popupCaption = popupViewImage.querySelector('.popup__caption');

const handleViewImage = async (link, name) => {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openPopup(popupViewImage);
};

const getProfileData = () => {
  return { nameValue: nameInput.value, descriptionValue: descriptionInput.value };
};

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const setProfileData = ({ name, about }) => {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
};

const setAvatarImage = ({ avatar }) => {
  profileImage.style = `background-image: url(${avatar})`;
};

let userId;

try {
  const [userData, cardsData] = await getPageData();

  userId = userData._id;

  setProfileData({ name: userData.name, about: userData.about });
  setAvatarImage({ avatar: userData.avatar });

  cardsData.forEach(card => {
    const cardElement = createCard(userId, card, handleLikeCard, handleViewImage, handleConfirmDelete);
    placesContainer.append(cardElement);
  });
} catch (err) {
  console.error(err);
}

const getCardData = () => {
  return { nameValue: cardNameInput.value, linkValue: cardUrlInput.value };
};

const popups = document.querySelectorAll('.popup');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');
const avatarUrlInput = document.querySelector('.popup__input_type_avatar_url');
const popupProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupAvatar = document.querySelector('.popup_type_edit_avatar');
const popupConfirmDelete = document.querySelector('.popup_type_confirm_deletion');
const formEditProfile = document.forms['edit-profile'];
const formAddNewCard = document.forms['new-place'];
const formEditAvatar = document.forms['edit-avatar'];
const formConfirmDelete = document.forms['confirm-deletion'];
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupAddCard = document.querySelector('.profile__add-button');
const buttonOpenPopupAvatar = document.querySelector('.avatar__edit-button');
const buttonElement = formConfirmDelete.querySelector('.popup__button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

popups.forEach(popup => popup.classList.add('popup_is-animated'));
enableValidation(popupProfile, validationConfig);

function openProfileEditPopup() {
  clearValidation(popupProfile, validationConfig);
  openPopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function openAddCardPopup() {
  clearValidation(popupNewCard, validationConfig);
  openPopup(popupNewCard);
  cardNameInput.value = '';
  cardUrlInput.value = '';
}

function openEditAvatarPopup() {
  clearValidation(popupAvatar, validationConfig);
  openPopup(popupAvatar);
  avatarUrlInput.value = '';
}

buttonOpenPopupProfile.addEventListener('click', openProfileEditPopup);
buttonOpenPopupAddCard.addEventListener('click', openAddCardPopup);
buttonOpenPopupAvatar.addEventListener('click', openEditAvatarPopup);

const isLoadingMsg = async (popupForm, isLoading) => {
  const popupButton = popupForm.querySelector('.popup__button');

  if (isLoading) {
    popupButton.textContent = 'Сохранение...';
  } else {
    popupButton.textContent = 'Сохранить';
  }
};

const editProfileFormSubmitHandler = async evt => {
  evt.preventDefault();
  isLoadingMsg(formEditProfile, true);
  const profileData = getProfileData();

  try {
    const data = await updateUserData({
      name: profileData.nameValue,
      about: profileData.descriptionValue,
    });
    setProfileData({ name: data.name, about: data.about });
    closePopup(popupProfile);
  } catch (err) {
    console.error(err);
  } finally {
    isLoadingMsg(formEditProfile, false);
  }
};

const addCardFormSubmitHandler = async evt => {
  evt.preventDefault();
  isLoadingMsg(formAddNewCard, true);

  const cardData = getCardData();

  try {
    const newCard = await addNewCard({ name: cardData.nameValue, link: cardData.linkValue });
    const cardElement = createCard(userId, newCard, handleLikeCard, handleViewImage, handleConfirmDelete);
    placesContainer.prepend(cardElement);
    closePopup(popupNewCard);
  } catch (err) {
    console.error(err);
  } finally {
    isLoadingMsg(formAddNewCard, false);
  }
};

const getAvatarUrl = () => {
  return { urlValue: avatarUrlInput.value };
};

const editAvatarFormSubmitHandler = async evt => {
  evt.preventDefault();
  isLoadingMsg(formEditAvatar, true);
  const avatarUrl = getAvatarUrl();

  try {
    const data = await updateAvatar({ avatar: avatarUrl.urlValue });
    setAvatarImage({ avatar: data.avatar });
    closePopup(popupAvatar);
  } catch (err) {
    console.error(err);
  } finally {
    isLoadingMsg(formEditAvatar, false);
  }
};

formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);

formAddNewCard.addEventListener('submit', evt => {
  addCardFormSubmitHandler(evt);
  formAddNewCard.reset();
});

formEditAvatar.addEventListener('submit', editAvatarFormSubmitHandler);

function handleConfirmDelete(idCard, cardElement) {
  cardItem = cardElement;
  cardId = idCard;

  openPopup(popupConfirmDelete);
  buttonElement.disabled = false;
  buttonElement.classList.remove('popup__button_disabled');
}

const confirmDeletionFormSubmitHandler = async evt => {
  evt.preventDefault();

  try {
    await deleteCard(cardId);
    removeCard(cardItem);
    closePopup(popupConfirmDelete);
  } catch (err) {
    console.error(err);
  }
};

formConfirmDelete.addEventListener('submit', confirmDeletionFormSubmitHandler);

const handleLikeCard = async (idCard, evt, status) => {
  if (!status) {
    try {
      const data = await putLikeCard(idCard);
      changeLike(evt, data.likes);
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      const data = await deleteLikeCard(idCard);
      changeLike(evt, data.likes);
    } catch (err) {
      console.error(err);
    }
  }
};
