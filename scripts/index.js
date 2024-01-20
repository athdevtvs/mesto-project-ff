// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const container = document.querySelector(".content");
const placesContainer = container.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = cardData.src;
  cardImage.alt = cardData.alt;
  cardElement.querySelector(".card__title").textContent = cardData.title;

  return cardElement;
}

function addCard(cardElement, deleteCard) {
  placesContainer.append(cardElement);

  const cardDeleteButton = container.querySelector(
    ".card:last-child .card__delete-button"
  );
  cardDeleteButton.addEventListener("click", () =>
    deleteCard(cardDeleteButton)
  );
}

// @todo: Функция удаления карточки
const deleteCard = (cardDeleteButton) => {
  const cardItem = cardDeleteButton.closest(".card");
  cardItem.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const cardData = {
    src: card.link,
    title: card.name,
    alt: card.description,
  };

  const cardElement = createCard(cardData);
  addCard(cardElement, deleteCard);
});
