// @todo: DOM узлы
const buttonAddCard = document.querySelector(".profile__add-button"); //Кнопка_+
const buttonProfileEdit = document.querySelector(".profile__edit-button"); //Кнопка_edit
const popupEdit = document.querySelector(".popup_type_edit"); //Попап редактирования профиля
const popupAddCard = document.querySelector(".popup_type_new-card"); //Попап создания новой карточки
//константы формы добавления карточки
const popupFormImg = document.forms["new-place"];
const formImgName = popupFormImg.elements["place-name"];
const formImgLink = popupFormImg.elements["link"];
//константы формы редактирования профиля
const popupFormProfile = document.forms["edit-profile"];
const nameInput = popupFormProfile.elements["name"];
const jobInput = popupFormProfile.elements["description"];
//константы модального окна картинки
const popImage = document.querySelector(".popup__image"); //картинка в модальном окне
const popImageDescription = document.querySelector(".popup__caption");
//Попап открытия картинки
//константы профиля
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__description");
const cardTemplate = document.querySelector(".places__list");

//Подключение аватара
import avatarImage from "../images/avatar.jpg";
document.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${avatarImage})`;

import "../index.css";
import {
  initialCards,
  addCards,
  createCard,
  deleteCard,
  likeCard,
  placesList,
} from "./cards.js";
import { openModal, closeModal } from "./modal.js";

addCards(initialCards);

// обработчики событий при загрузке
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
});

// Обработчики событий для всех модальных окон
function setupEventListeners() {
  document.querySelectorAll(".popup").forEach((modal) => {
    modal.querySelectorAll(".popup__close").forEach((button) => {
      button.addEventListener("click", () => closeModal(modal));
    });

    modal.addEventListener("click", (evt) => {
      if (evt.target === modal) {
        closeModal(modal);
      }
    });
  });
}

//функция добавления новой карточки пользователем
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: formImgName.value,
    link: formImgLink.value,
  };
  placesList.prepend(createCard(card, { deleteCard, likeCard, openModal }));
  closeModal(popupAddCard);
  evt.target.reset();
}

// Функция открытия модального окна с картинкой
export const handleImageClick = (popupImage, imageSrc, imageDescription) => {
  if (popImage) {
    popImage.src = imageSrc;
    popImage.alt = imageDescription;
    popImageDescription.textContent = imageDescription;
  }
  openModal(popupImage);
};

//Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  //поля формы
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileSubtitle.textContent = jobValue;
  closeModal(popupEdit);
}

//обработчик «отправки» формы
popupFormProfile.addEventListener("submit", handleProfileFormSubmit);

//обработчик открытия попапа/профиль
buttonProfileEdit.addEventListener("click", function () {
  //значения в модальном окне редактирования профиля
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openModal(popupEdit);
});

//обработчик открытия попапа/добавления
buttonAddCard.addEventListener("click", function () {
  openModal(popupAddCard);
});

//обработчик добавки новой карточки
popupFormImg.addEventListener("submit", handleCardFormSubmit);
