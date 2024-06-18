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
const popupImage = document.querySelector(".popup_type_image"); //Попап открытия картинки\
//константы профиля
const avatarElement = document.querySelector(".profile__image");
const avatarButton = document.querySelector(".profile__image-button");
//попап редактирования автара
const popupAvatar = document.querySelector(".popup_type_new-avatar");
const avatarInput = document.querySelector(".popup__input_type-vatar-link");

import "../index.css";
import { createCard, likeCard, placesList } from "./cards.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";

import {
  updateProfileByUser,
  updateAvatar,
  getPromisesUserCards,
  profileTitle,
  profileSubtitle,
  handleCardAdded,
} from "./api.js";

//Функции----------------------------------------------------------------
//Вызовы функций
getPromisesUserCards();

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input-error",
  errorClass: "form__input-error_active",
};

// Вызов функции для включения валидации с переданными настройками
enableValidation(validationSettings);

//функция добавления новой карточки пользователем
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = formImgName.value;
  const link = formImgLink.value;
  changeNameButton(true);

  handleCardAdded(name, link)
    .then((cardData) => {
      placesList.prepend(createCard(cardData, { likeCard, openModal }));
      console.log("Карточка добавлена", cardData);
    })
    .catch((error) => {
      console.log("Произошла ошибка при добавлении карточки", error);
    })
    .finally(() => {
      changeNameButton(false);
    });
  closeModal(popupAddCard);
  evt.target.reset();
}

// Функция открытия модального окна с картинкой
export const handleImageClick = (imageSrc, imageDescription) => {
  if (popImage) {
    popImage.src = imageSrc;
    popImage.alt = imageDescription;
    popImageDescription.textContent = imageDescription;
  }
  openModal(popupImage);
};

//функция замены аватара
const handleAvatarForm = (evt) => {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;
  changeNameButton(true);
  updateAvatar(avatarUrl)
    .then((data) => {
      avatarElement.style.backgroundImage = `url(${data.avatar})`;
      closeModal(popupAvatar);
      console.log("Автар пользователя обновлен");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeNameButton(false);
    });
  evt.target.reset();
};

//Функция, смены названия кнопки при обработке данных в попапе
const changeNameButton = (isLoading) => {
  const formButtonList = document.querySelectorAll(".popup__button");
  formButtonList.forEach((formButton) => {
    if (formButton.textContent !== "Да") {
      formButton.textContent = isLoading ? "Сохранение.." : "Сохранить";
    }
  });
};

//Обработчики событий----------------------------------------------------------------
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

//Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  //поля формы
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  updateProfileByUser(nameValue, jobValue);
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
  clearValidation(popupEdit, validationSettings);
});

//обработчик открытия попапа/добавления
buttonAddCard.addEventListener("click", function () {
  openModal(popupAddCard);
  clearValidation(popupAddCard, validationSettings);
});

//обработчик добавки новой карточки
popupFormImg.addEventListener("submit", handleCardFormSubmit);

//Аватар------
//Обработчик наведения на аватар/mouseover
avatarElement.addEventListener("mouseover", () => {
  avatarButton.classList.add("profile__image-button_active");
});

//Обработчик наведения на аватар/mouseout
avatarElement.addEventListener("mouseout", (evt) => {
  if (!avatarElement.contains(evt.relatedTarget)) {
    avatarButton.classList.remove("profile__image-button_active");
  }
});

//обработчик открытия редактирования аватара
avatarButton.addEventListener("click", function () {
  openModal(popupAvatar);
  clearValidation(popupAvatar, validationSettings);
});

//обработчик «отправки» нового аватара
popupAvatar.addEventListener("submit", handleAvatarForm);
