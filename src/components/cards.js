const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

import { cardTemplate, placesList } from "./index.js";

import {
  openModal,
  closeModal,
  closeModalEsc,
  closeModalOverlay,
} from "./modal.js";

export { initialCards, addCard, openModal, createCard, deleteCard, likeCard };

function createCard(card, deleteCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true); // клонирование
  const cardImage = cardElement.querySelector(".card__image"); // картинка определение константы

  cardElement.querySelector(".card__title").textContent = card.name; //название карточки
  cardImage.alt = card.name; // название изображения
  cardImage.src = card.link; // ссылка на изображение

  const popupImage = document.querySelector(".popup_type_image"); //Попап открытия картинки
  //обработчик открытия попапа/картинка
  cardImage.addEventListener("click", function () {
    openModal(
      popupImage,
      card.link,
      closeModal,
      closeModalEsc,
      closeModalOverlay
    );
  });

  //обработчик лайка карточки
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);

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
function addCard(cards) {
  cards.forEach(function (card) {
    const cardElement = createCard(card, deleteCard); //константа определяем
    placesList.append(cardElement); // вывод
  });
}
