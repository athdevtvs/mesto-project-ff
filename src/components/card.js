const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (card, deleteCard, toggleLikeHandler, viewImageHandler) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const viewImage = cardElement.querySelector('.card__image');

  cardImage.src = card.link;
  cardImage.alt = card.description;
  cardElement.querySelector('.card__title').textContent = card.name;

  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', () => deleteCard(cardElement));

  likeButton.addEventListener('click', toggleLikeHandler);
  viewImage.addEventListener('click', viewImageHandler);

  return cardElement;
};

export const deleteCard = cardItem => {
  cardItem.remove();
};

export const toggleLikeHandler = evt => {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
};

export const viewImageHandler = evt => {
  if (evt.target.classList.contains('card__image')) {
    document.querySelector('.popup_type_image').classList.toggle('popup_is-opened');
  }
};
