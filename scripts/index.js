// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const container = document.querySelector(".content");
const placesContainer = container.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(imageValue, titleValue, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = imageValue;
  cardElement.querySelector(".card__title").textContent = titleValue;

  placesContainer.append(cardElement);

  const cardDeleteButton = container.querySelector(
    ".card:last-child .card__delete-button"
  );
  cardDeleteButton.addEventListener("click", () =>
    deleteCard(cardDeleteButton)
  );

  const createdCard = placesContainer.querySelector(".card:last-child");

  return createdCard;
}

// @todo: Функция удаления карточки
const deleteCard = (cardDeleteButton) => {
  const cardItem = cardDeleteButton.closest(".card");
  cardItem.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const image = card.link;
  const name = card.name;
  addCard(image, name, deleteCard);
});
