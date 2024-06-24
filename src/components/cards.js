// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// DOM узлы
const placesList = document.querySelector(".places__list"); //Карточка

import { addLike, deleteLike } from "./api.js";

function createCard(card, user, { handleImageClick, openDeleteModal }) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true); // клонирование

  const cardImage = cardElement.querySelector(".card__image"); // картинка определение константы
  cardElement.querySelector(".card__title").textContent = card.name; //название карточки
  cardImage.alt = card.name; // название изображения
  cardImage.src = card.link; // ссылка на изображение
  //лайки на карточке
  const countLike = cardElement.querySelector(".card__like-count"); //счетчик кнопки лайк
  const likeButton = cardElement.querySelector(".card__like-button"); //кнопка лайк
  countLike.textContent = card.likes.length;

  //обработчик открытия попапа/картинка
  cardImage.addEventListener("click", function () {
    handleImageClick(card.link, card.name);
  });

  //установка лайка при перезагрузке
  if (card.likes.some((like) => like._id === user)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  //обработчик лайка карточки
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      if (likeButton.classList.contains("card__like-button_is-active")) {
        deleteLike(card._id)
          .then((card) => {
            likeButton.classList.toggle("card__like-button_is-active");
            countLike.textContent = card.likes.length;
          })
          .catch((error) => console.error("Ошибка удаления лайка:", error));
      } else {
        addLike(card._id)
          .then((card) => {
            likeButton.classList.toggle("card__like-button_is-active");
            countLike.textContent = card.likes.length;
          })
          .catch((error) => console.error("Ошибка добавления лайка:", error));
      }
    });

  const deleteButton = cardElement.querySelector(".card__delete-button");

  //обработчик открытия попапа удаления карточки
  deleteButton.addEventListener("click", () =>
    openDeleteModal(cardElement, card._id)
  );

  cardElement.dataset.id = card._id;

  return cardElement; // возвращение
}

//функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, likeCard, placesList };
