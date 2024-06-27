// @todo: DOM узлы
const buttonAddCard = document.querySelector(".profile__add-button"); //Кнопка_+
const buttonProfileEdit = document.querySelector(".profile__edit-button"); //Кнопка_edit
const popupEdit = document.querySelector(".popup_type_edit"); //Попап редактирования профиля
const popupAddCard = document.querySelector(".popup_type_new-card"); //Попап создания новой карточки
const buttonAddCardPopup = popupAddCard.querySelector(".popup__button");
//константы формы добавления карточки
const popupFormImg = document.forms["new-place"];
const formImgName = popupFormImg.elements["place-name"];
const formImgLink = popupFormImg.elements["link"];
//константы формы редактирования профиля
const popupFormProfile = document.forms["edit-profile"];
const nameInput = popupFormProfile.elements["name"];
const jobInput = popupFormProfile.elements["description"];
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__description");
const buttonProfileEditPopup = popupFormProfile.querySelector(".popup__button");
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
const buttonAvatarPopup = popupAvatar.querySelector(".popup__button");
let userId = "";
//карточки
let currentCardElement = null;
let currentCardId = null;
//попап удаления карточки
const popupDeleteCard = document.querySelector(
  ".popup_type_submit-delete-card"
);
const buttonDeletePopup = popupDeleteCard.querySelector(".popup__button");

import "../index.css";
import { createCard, likeCard, placesList } from "./cards.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";

import {
  updateProfileByUser,
  updateAvatar,
  handleCardAdded,
  getUserProfile,
  getCards,
  deleteCard,
} from "./api.js";

//Функции----------------------------------------------------------------

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

//Объединенение запросов для получения данных пользователя и карточек
const getPromisesUserCards = () => {
  Promise.all([getUserProfile(), getCards()])
    .then(([userData, cardsData]) => {
      //данные пользователя
      profileTitle.textContent = userData.name;
      profileSubtitle.textContent = userData.about;
      avatarElement.style.backgroundImage = `url(${userData.avatar})`;
      userId = userData._id;

      // Обработка данных карточек
      cardsData.forEach((cardData) => {
        const cardElement = createCard(cardData, userId, {
          handleImageClick,
          openDeleteModal,
        });
        placesList.append(cardElement);
      });
    })
    .catch((error) => {
      console.error("Произошла ошибка", error);
    });
};

//функция добавления новой карточки пользователем
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = formImgName.value;
  const link = formImgLink.value;
  changeNameButton(buttonAddCardPopup, true);

  handleCardAdded(name, link)
    .then((cardData) => {
      placesList.prepend(
        createCard(cardData, userId, { handleImageClick, openDeleteModal })
      );
      evt.target.reset();
      closeModal(popupAddCard);
    })
    .catch((error) => {
      console.error("Произошла ошибка при добавлении карточки", error);
    })
    .finally(() => {
      changeNameButton(buttonAddCardPopup, false);
    });
}

// Функция открытия модального окна с картинкой
const handleImageClick = (imageSrc, imageDescription) => {
  if (popImage) {
    popImage.src = imageSrc;
    popImage.alt = imageDescription;
    popImageDescription.textContent = imageDescription;
  }
  openModal(popupImage);
};

//функция открытия попапа удаления карточки
function openDeleteModal(cardElement, cardId) {
  currentCardElement = cardElement;
  currentCardId = cardId; //сохранение id карточки для удаления
  openModal(popupDeleteCard);
}

//функция замены аватара
const handleAvatarForm = (evt) => {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;
  changeNameButton(buttonAvatarPopup, true);
  updateAvatar(avatarUrl)
    .then((data) => {
      avatarElement.style.backgroundImage = `url(${data.avatar})`;
      evt.target.reset();
      closeModal(popupAvatar);
    })
    .catch((error) => {
      console.error("Произошла ошибка при замене аватара", error);
    })
    .finally(() => {
      changeNameButton(buttonAvatarPopup, false);
    });
};

//Функция, смены названия кнопки при обработке данных в попапе
const changeNameButton = (button, isLoading) => {
  button.textContent = isLoading ? "Сохранение.." : "Сохранить";
};

//Вызовы функций
getPromisesUserCards();

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

//Обработчик удаления карточки в попапе удаления карточки
buttonDeletePopup.addEventListener("click", function () {
  deleteCard(currentCardId)
    .then(() => {
      const cardToDeleteElement = document.querySelector(
        `[data-id="${currentCardId}"]`
      );
      if (cardToDeleteElement) {
        cardToDeleteElement.remove();
      } else {
        console.error(`Карточка с id ${currentCardId} не найдена`);
      }
      closeModal(popupDeleteCard); // закрытие попапа после удаления
    })
    .catch((error) => {
      console.error("Ошибка удаления карточки:", error);
    });
});

//Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  changeNameButton(buttonProfileEditPopup, true);
  //поля формы
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  updateProfileByUser(nameValue, jobValue)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileSubtitle.textContent = data.about;
      clearValidation(popupEdit, validationSettings);
      closeModal(popupEdit);
      return data;
    })
    .catch((error) => {
      console.error(
        "Произошла ошибка при обновлении данных пользователя",
        error
      );
    })
    .finally(() => {
      changeNameButton(buttonProfileEditPopup, false);
    });
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
});

//обработчик «отправки» нового аватара
popupAvatar.addEventListener("submit", handleAvatarForm);
