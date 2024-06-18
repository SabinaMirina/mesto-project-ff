// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// DOM узлы
const placesList = document.querySelector(".places__list"); //Карточка

//лайки

import { openModal, closeModal } from "./modal.js";

import { handleImageClick } from "./index.js";

import { deleteCard, addLike, deleteLike } from "./api.js";

function createCard(card, user) {
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
            console.log(`C карточки с id ${card._id} лайк удален`);
          })
          .catch((error) => console.error("Error removing like:", error));
      } else {
        addLike(card._id)
          .then((card) => {
            likeButton.classList.toggle("card__like-button_is-active");
            countLike.textContent = card.likes.length;
            console.log(`На карточку с id ${card._id} поставлен лайк`);
          })
          .catch((error) => console.error("Error adding like:", error));
      }
    });

  const popupDeleteCard = document.querySelector(
    ".popup_type_submit-delete-card"
  );
  const buttonDeletePopup = popupDeleteCard.querySelector(".popup__button");

  //обработчик открытия попапа удаления карточки
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      openModal(popupDeleteCard);
      buttonDeletePopup.currentCardId = card._id; //сохранение id карточки для удаления
      // Проверка, что обработчик добавлен только 1 раз
      if (!buttonDeletePopup.deleteHandlerAdded) {
        buttonDeletePopup.addEventListener(
          "click",
          function handleDeleteClick() {
            //удаление карточки
            const cardToDeleteId = buttonDeletePopup.currentCardId;
            deleteCard(cardToDeleteId)
              .then(() => {
                const cardToDeleteElement = document.querySelector(
                  `[data-id="${cardToDeleteId}"]`
                );
                if (cardToDeleteElement) {
                  cardToDeleteElement.remove();
                  console.log(`Карточка с id ${cardToDeleteId} удалена`);
                } else {
                  console.error(`Карточка с id ${cardToDeleteId} не найдена`);
                }
                closeModal(popupDeleteCard); // закрытие попапа после удаления
              })
              .catch((error) => {
                console.error("Ошибка удаления карточки:", error);
              });
          }
        );
        buttonDeletePopup.deleteHandlerAdded = true;
      }
    });

  cardElement.dataset.id = card._id;

  return cardElement; // возвращение
}

//функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { openModal, createCard, likeCard, placesList };
