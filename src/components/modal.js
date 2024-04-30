import { modalWindow, nameInput, jobInput, popupAddCard } from "./index.js";

import { createCard, deleteCard, likeCard } from "./cards.js";

//функция открытия попапа
const openModal = (modalWindow, imageSrc, imageDescription) => {
  modalWindow.classList.add("popup_is-opened", "popup_is-animated");

  const modalExitButtons = document.querySelectorAll(".popup__close");

  // Открытие модального окна с картинкой
  const popImage = modalWindow.querySelector(".popup__image"); // изображение внутри активного модального окна
  if (popImage) {
    const popImageDescription = modalWindow.querySelector(".popup__caption");

    popImage.src = imageSrc; // Устанавливаем источник изображения
    popImageDescription.textContent = imageDescription;
  }

  modalExitButtons.forEach((button) => {
    button.addEventListener("click", () => closeModal(modalWindow));
  });

  document.addEventListener("keydown", function (evt) {
    closeModalEsc(evt, modalWindow);
  });

  modalWindow.addEventListener("click", function (evt) {
    closeModalOverlay(evt, modalWindow);
  });
};

//функция закрытия попапа
function closeModal(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
}

//функция закрытия попапа овэрлэй
function closeModalOverlay(evt, modalWindow) {
  if (evt.target === modalWindow) {
    modalWindow.classList.remove("popup_is-opened");
  }
}

//функция закрытия попапа ESC
function closeModalEsc(evt, modalWindow) {
  if (evt.key === "Escape") {
    modalWindow.classList.remove("popup_is-opened");
  }
}

export { openModal, closeModal, closeModalEsc, closeModalOverlay };
