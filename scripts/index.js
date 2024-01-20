// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const container = document.querySelector(".content");
const placesContainer = container.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardContent) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = cardContent.src;
  cardImage.alt = cardContent.alt;
  cardElement.querySelector(".card__title").textContent = cardContent.title;

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
  const cardContent = {
    src: card.link,
    title: card.name,
    alt: card.description,
  };

  const cardElement = createCard(cardContent);
  addCard(cardElement, deleteCard);
});
