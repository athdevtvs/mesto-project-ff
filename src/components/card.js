const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (card, deleteCard, likeCard, viewImage) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = card.link;
  cardImage.alt = card.description;
  cardElement.querySelector('.card__title').textContent = card.name;

  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', () => deleteCard(cardElement));

  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', viewImage);

  return cardElement;
};

export const deleteCard = cardItem => {
  cardItem.remove();
};

export const likeCard = evt => {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
};
