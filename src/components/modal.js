// DOM узлы
const modalWindow = document.querySelector(".popup"); //Общий селектор модальных окон
const popImage = document.querySelector(".popup__image"); //картинка в модальном окне
const modalExitButtons = document.querySelectorAll(".popup__close");

import { createCard, deleteCard, likeCard } from "./cards.js";

//функция открытия попапа
const openModal = (modalWindow, imageSrc, imageDescription) => {
  modalWindow.classList.add("popup_is-animated"); // анимация
  setTimeout(() => {
    modalWindow.classList.add("popup_is-opened"); // открытие
  }, 1);

  // Открытие модального окна с картинкой
  const popImage = modalWindow.querySelector(".popup__image"); // изображение внутри активного модального окна
  if (popImage) {
    const popImageDescription = modalWindow.querySelector(".popup__caption");

    popImage.src = imageSrc; // источник изображения
    popImage.alt = imageDescription; // альтернативный текст из описания картинки
    popImageDescription.textContent = imageDescription; // описание каринки
  }

  // Навешиваем обработчик Escape
  document.addEventListener("keydown", handleEscape);

  // Установка обработчиков событий
  setupEventListeners(modalWindow);
};

//функция закрытия попапа
function closeModal(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

// Функция обработки нажатия клавиши Escape
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

//функция закрытия попапа овэрлэй
function closeModalOverlay(evt, modalWindow) {
  if (evt.target === modalWindow) {
    closeModal(modalWindow);
  }
}

// Установка обработчиков событий
function setupEventListeners(modalWindow) {
  const modalExitButtons = modalWindow.querySelectorAll(".popup__close");

  modalExitButtons.forEach((button) => {
    button.removeEventListener("click", closeModal);
    button.addEventListener("click", () => closeModal(modalWindow));
  });

  modalWindow.removeEventListener("click", closeModalOverlay);
  modalWindow.addEventListener("click", (evt) =>
    closeModalOverlay(evt, modalWindow)
  );
}

export { openModal, closeModal, closeModalOverlay };
