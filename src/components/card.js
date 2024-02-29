const cardTemplate = document.querySelector('#card-template').content;
let cardItem = '';

export const createCard = (userId, card, handleLikeCard, viewImage, confirmDelete) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const buttonLike = cardElement.querySelector('.card__like-button');
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  likeCounter.textContent = card.likes.length;

  if (userId !== card.owner._id) {
    buttonDelete.style.visibility = 'hidden';
  }

  card.likes.forEach(cardLikes => {
    if (cardLikes._id === userId) {
      buttonLike.classList.toggle('card__like-button_is-active');
    }
  });

  buttonDelete.addEventListener('click', evt => {
    cardItem = evt.target.closest('.card');
    confirmDelete(card._id, cardElement);
  });

  buttonLike.addEventListener('click', evt => {
    handleLikeCard(card._id, evt, checkStatusLike(evt));
  });

  cardImage.addEventListener('click', () => viewImage(card.link, card.name));

  return cardElement;
};

export const removeCard = cardItem => {
  cardItem.remove();
};

const checkStatusLike = evt => {
  return evt.target.classList.contains('card__like-button_is-active') ? true : false;
};

export const changeLike = (evt, likes) => {
  const likeCounter = evt.target.nextElementSibling;
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
  likeCounter.textContent = likes.length;
};
