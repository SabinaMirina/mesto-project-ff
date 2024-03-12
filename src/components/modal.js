import {
  modalWindow,
  formImgName,
  formImgLink,
  placesList,
  imageSrc,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  popupEdit,
} from "./index.js";

import { createCard, deleteCard, likeCard } from "./cards.js";

export {
  openModal,
  closeModal,
  closeModalEsc,
  closeModalOverlay,
  handleFormSubmit,
  popupNewImgAdd,
};

//функция открытия попапа
function openModal(modalWindow, imageSrc) {
  modalWindow.classList.add("popup_is-opened", "popup_is-animated");
  const modalExitbutton = document.querySelectorAll(".popup__close");
  const popImage = document.querySelector(".popup__image"); //картинка в модальном окне
  if (popImage) {
    popImage.src = imageSrc;
  }

  modalExitbutton.forEach(function (modalExitbutton) {
    //Проход по всем кнопкам зыкрыть
    modalExitbutton.addEventListener("click", function () {
      closeModal(modalWindow);
    });

    document.addEventListener("keydown", function (evt) {
      closeModalEsc(evt, modalWindow);
    });

    modalWindow.addEventListener("click", function (evt) {
      closeModalOverlay(evt, modalWindow);
    });
  });
}

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

//функция добавления новой карточки пользователем
function popupNewImgAdd(evt) {
  evt.preventDefault();
  const card = {
    name: formImgName.value,
    link: formImgLink.value,
  };
  placesList.prepend(createCard(card, deleteCard, likeCard, openModal));
  evt.target.reset();
}

//Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileSubtitle.textContent = jobValue;

  closeModal(popupEdit);
}
