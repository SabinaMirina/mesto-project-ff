// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const places = content.querySelector(".places");
const placesList = places.querySelector(".places__list"); //Карточка
const profile = content.querySelector(".profile"); //секция_Профиль
const buttonAddCard = profile.querySelector(".profile__add-button"); //Кнопка_+
const profileInfo = profile.querySelector(".profile__info"); //блок_Инфо
const buttonProfileEdit = profileInfo.querySelector(".profile__edit-button"); //Кнопка_edit
const modalWindow = document.querySelector(".popup"); //Общий селектор модальных окон
const popupEdit = document.querySelector(".popup_type_edit"); //Попап редактирования профиля
const popupAddCard = document.querySelector(".popup_type_new-card"); //Попап создания новой карточки
const popImage = document.querySelector(".popup__image"); //картинка в модальном окне
const buttonAddImg = document.querySelector(".popup__button");
const profileName = document.querySelector(".profile__title");
//константы формы добавления карточки
const popupFormImg = document.forms["new-place"];
const formImgName = popupFormImg.elements["place-name"];
const formImgLink = popupFormImg.elements["link"];
const formImgNamePlaceholder = formImgName.placeholder;
const formImgLinkPlaceholder = formImgLink.placeholder;
//константы формы редактирования профиля
const popupFormProfile = document.forms["edit-profile"];
const nameInput = popupFormProfile.elements["name"];
const jobInput = popupFormProfile.elements["description"];
//константы профиля
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__description");

export {
  cardTemplate,
  content,
  placesList,
  profile,
  buttonAddCard,
  profileInfo,
  buttonProfileEdit,
  modalWindow,
  popupEdit,
  popupAddCard,
  popImage,
  buttonAddImg,
  profileName,
  popupFormImg,
  formImgName,
  formImgLink,
  popupFormProfile,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
};

import "../index.css";
import { initialCards, addCard } from "./cards.js";
import {
  openModal,
  closeModal,
  popupNewImgAdd,
  handleFormSubmit,
} from "./modal.js";

//значения в модальном окне редактирования профиля
nameInput.value = profileTitle.textContent;
jobInput.value = profileSubtitle.textContent;

addCard(initialCards);

//обработчик «отправки» формы
popupFormProfile.addEventListener("submit", handleFormSubmit);

//обработчик открытия попапа/профиль
buttonProfileEdit.addEventListener("click", function () {
  openModal(popupEdit, closeModal);
});

//обработчик открытия попапа/кнопка +
buttonAddCard.addEventListener("click", function () {
  openModal(popupAddCard, closeModal);
});

//обработчик добавки новой карточки
popupFormImg.addEventListener("submit", popupNewImgAdd);

//Дополнительно реализовала удаление плэйсхолдеров в модальном окне добавления карточки
formImgName.addEventListener("focus", function (evt) {
  formImgName.placeholder = "";
});

formImgLink.addEventListener("focus", function (evt) {
  formImgLink.placeholder = "";
});

formImgName.addEventListener("blur", function (evt) {
  formImgName.placeholder = formImgNamePlaceholder;
});

formImgLink.addEventListener("blur", function (evt) {
  formImgLink.placeholder = formImgLinkPlaceholder;
});
