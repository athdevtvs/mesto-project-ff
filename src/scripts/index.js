import '../pages/index.css';
import { createCard, likeCard, openConfirmDeletionPopup } from '../components/card.js';
import { openPopup, closePopup, isLoadingMsg } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getPageData, updateUserData, addNewCard, updateAvatar } from '../components/api.js';

const container = document.querySelector('.content');
const placesContainer = container.querySelector('.places__list');
const imageViewPopup = document.querySelector('.popup_type_image');
const popupImg = imageViewPopup.querySelector('.popup__image');
const popupCaption = imageViewPopup.querySelector('.popup__caption');

const viewImage = evt => {
  const card = evt.target.closest('.places__item');
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title').textContent.trim();

  popupImg.src = cardImage.src;
  popupImg.alt = cardImage.alt;
  popupCaption.textContent = cardTitle;

  openPopup(imageViewPopup);
};

const getProfileData = () => {
  return { nameValue: nameInput.value, descriptionValue: descriptionInput.value };
};

const setProfileData = ({ name, about }) => {
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent = name;
  profileDescription.textContent = about;
};

const setAvatarImage = ({ avatar }) => {
  const profileImage = document.querySelector('.profile__image');
  profileImage.style = `background-image: url(${avatar})`;
};

const [userData] = await getPageData()
  .then(res => {
    const [userData, cardsData] = res;

    setProfileData({ name: userData.name, about: userData.about });
    setAvatarImage({ avatar: userData.avatar });

    cardsData.forEach(card => {
      const cardElement = createCard(
        userData._id,
        card,
        likeCard,
        viewImage,
        openConfirmDeletionPopup,
      );
      placesContainer.append(cardElement);
    });

    return res;
  })
  .catch(err => {
    console.error(err);
  });

const getCardData = () => {
  return { nameValue: cardNameInput.value, linkValue: cardUrlInput.value };
};

const popups = document.querySelectorAll('.popup');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const editAvatarPopup = document.querySelector('.popup_type_edit_avatar');
const popupEditProfileForm = document.forms['edit-profile'];
const popupAddCardForm = document.forms['new-place'];
const popupEditAvatarForm = document.forms['edit-avatar'];
const avatarUrlInput = document.querySelector('.popup__input_type_avatar_url');
const editPopupButton = document.querySelector('.profile__edit-button');
const addPopupButton = document.querySelector('.profile__add-button');
const avatarPopupButton = document.querySelector('.avatar__edit-button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

popups.forEach(popup => popup.classList.add('popup_is-animated'));
enableValidation(editProfilePopup, validationConfig);

function openProfileEditPopup() {
  clearValidation(editProfilePopup, validationConfig);
  openPopup(editProfilePopup);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function openAddCardPopup() {
  clearValidation(addCardPopup, validationConfig);
  openPopup(addCardPopup);
  cardNameInput.value = '';
  cardUrlInput.value = '';
}

function openEditAvatarPopup() {
  clearValidation(editAvatarPopup, validationConfig);
  openPopup(editAvatarPopup);
  avatarUrlInput.value = '';
}

editPopupButton.addEventListener('click', openProfileEditPopup);
addPopupButton.addEventListener('click', openAddCardPopup);
avatarPopupButton.addEventListener('click', openEditAvatarPopup);

const editProfileFormSubmitHandler = async evt => {
  evt.preventDefault();
  isLoadingMsg(popupEditProfileForm, true);
  const profileData = getProfileData();

  await updateUserData({ name: profileData.nameValue, about: profileData.descriptionValue })
    .then(data => {
      setProfileData({ name: data.name, about: data.about });
      closePopup();
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      isLoadingMsg(popupEditProfileForm, false);
    });
};

const addCardFormSubmitHandler = async evt => {
  evt.preventDefault();
  isLoadingMsg(popupAddCardForm, true);

  const cardData = getCardData();

  await addNewCard({ name: cardData.nameValue, link: cardData.linkValue })
    .then(newCard => {
      const cardElement = createCard(
        userData._id,
        newCard,
        likeCard,
        viewImage,
        openConfirmDeletionPopup,
      );
      placesContainer.prepend(cardElement);
      closePopup();
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      isLoadingMsg(popupAddCardForm, false);
    });
};

const getAvatarUrl = () => {
  return { urlValue: avatarUrlInput.value };
};

const editAvatarFormSubmitHandler = async evt => {
  evt.preventDefault();
  isLoadingMsg(popupEditAvatarForm, true);
  const avatarUrl = getAvatarUrl();

  await updateAvatar({ avatar: avatarUrl.urlValue })
    .then(data => {
      setAvatarImage({ avatar: data.avatar });
      closePopup();
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      isLoadingMsg(popupEditAvatarForm, false);
    });
};

popupEditProfileForm.addEventListener('submit', editProfileFormSubmitHandler);

popupAddCardForm.addEventListener('submit', evt => {
  addCardFormSubmitHandler(evt);
  document.forms['new-place'].reset();
});

popupEditAvatarForm.addEventListener('submit', editAvatarFormSubmitHandler);
