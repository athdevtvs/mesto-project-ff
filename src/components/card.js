import { removeCard, addCardLike, deleteCardLike } from '../components/api.js';
import { openPopup, closePopup } from '../components/modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const myId = '7ef8f4404036f8cc329b5a61';
let idCard = '';
let cardItem = '';

export const createCard = (userId, card, likeCard, viewImage, openConfirmDeletionPopup) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  likeCounter.textContent = card.likes.length;

  if (userId !== card.owner._id) {
    deleteButton.style.visibility = 'hidden';
  }

  card.likes.forEach(cardLikes => {
    if (cardLikes._id === myId) {
      likeButton.classList.toggle('card__like-button_is-active');
    }
  });

  deleteButton.addEventListener('click', evt => {
    idCard = card._id;
    cardItem = evt.target.closest('.card');
    openConfirmDeletionPopup();
  });

  likeButton.addEventListener('click', evt => {
    idCard = card._id;
    likeCard(evt, idCard);
  });
  cardImage.addEventListener('click', viewImage);

  return cardElement;
};

const popupConfirmDeletionForm = document.forms['confirm-deletion'];

export function openConfirmDeletionPopup() {
  const confirmDeletionPopup = document.querySelector('.popup_type_confirm_deletion');
  const buttonElement = popupConfirmDeletionForm.querySelector('.popup__button');
  openPopup(confirmDeletionPopup);
  buttonElement.disabled = false;
  buttonElement.classList.remove('popup__button_disabled');
}

const confirmDeletionFormSubmitHandler = async evt => {
  evt.preventDefault();
  deleteCard();
};

popupConfirmDeletionForm.addEventListener('submit', confirmDeletionFormSubmitHandler);

const deleteCard = () => {
  removeCard(idCard)
    .then(() => {
      cardItem.remove();
      closePopup();
    })
    .catch(err => {
      console.error(err);
    });
};

const updateLikeCounter = (likeCounter, likes) => {
  likeCounter.textContent = likes.length;
};

export const likeCard = (evt, idCard) => {
  const likeCounter = evt.target.nextElementSibling;

  if (evt.target.classList.contains('card__like-button_is-active')) {
    deleteCardLike(idCard)
      .then(data => {
        if (evt.target.classList.contains('card__like-button')) {
          evt.target.classList.toggle('card__like-button_is-active');
        }
        updateLikeCounter(likeCounter, data.likes);
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    addCardLike(idCard)
      .then(data => {
        if (evt.target.classList.contains('card__like-button')) {
          evt.target.classList.toggle('card__like-button_is-active');
        }
        updateLikeCounter(likeCounter, data.likes);
      })
      .catch(err => {
        console.error(err);
      });
  }
};
