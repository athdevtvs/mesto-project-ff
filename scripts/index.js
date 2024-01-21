// Кроме того что требовалось я еще:
//   1. убрала объект cardData с переопределением имен ключей,
//      т.к. он избыточный. Ключи уже придуманы в card.js и лучше,
//      наверное, ими и пользоваться.
//   2. убрала функцию addCard т.к. там только одно действие и я его
//      больше нигде не переиспользую.
//   3. из deleteCard убрала строчку с closest т.к. она уже не нужна.

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const container = document.querySelector(".content");
const placesContainer = container.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = card.link;
  cardImage.alt = card.description;
  cardElement.querySelector(".card__title").textContent = card.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

// @todo: Функция удаления карточки
const deleteCard = (cardItem) => {
  cardItem.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard);
  placesContainer.append(cardElement);
});
