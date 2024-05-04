// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// DOM узлы
const placesList = document.querySelector(".places__list"); //Карточка
const popupImage = document.querySelector(".popup_type_image"); //Попап открытия картинки

import { initialCards } from "./initialCards.js";

import {
  openModal,
  closeModal,
  closeModalEsc,
  closeModalOverlay,
} from "./modal.js";

function createCard(card, { deleteCard, likeCard, openModal }) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true); // клонирование
  const cardImage = cardElement.querySelector(".card__image"); // картинка определение константы

  cardElement.querySelector(".card__title").textContent = card.name; //название карточки
  cardImage.alt = card.name; // название изображения
  cardImage.src = card.link; // ссылка на изображение

  //обработчик открытия попапа/картинка
  cardImage.addEventListener("click", function () {
    openModal(popupImage, card.link, card.name);
  });

  //обработчик лайка карточки
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);

  //обработчик удаления карточки
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  return cardElement; // возвращение
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const cardElement = event.target.closest(".places__item");
  cardElement.remove();
}

//функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// @todo: Вывести карточки на страницу
function addCards(cards) {
  cards.forEach(function (card) {
    const cardElement = createCard(card, { deleteCard, likeCard, openModal }); //константа определяем
    placesList.append(cardElement); // вывод
  });
}

export {
  initialCards,
  addCards,
  openModal,
  createCard,
  deleteCard,
  likeCard,
  placesList,
};
