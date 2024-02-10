// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const places = content.querySelector(".places");
const placesList = places.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card, deleteCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true); // клонирование
  const cardImage = cardElement.querySelector(".card__image"); // картинка определение константы

  cardElement.querySelector(".card__description").textContent = card.name; //название карточки
  cardImage.alt = card.name; // название изображения
  cardImage.src = card.link; // ссылка на изображение

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard); // слушатель

  return cardElement; // возвращение
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const cardElement = event.target.closest(".places__item");
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
function addCard(cards) {
  cards.forEach(function (card) {
    const cardElement = createCard(card, deleteCard); //константа определяем
    placesList.append(cardElement); // вывод
  });
}

addCard(initialCards);
