//функция открытия попапа
const openModal = (modal) => {
  modal.classList.add("popup_is-animated"); // анимация
  setTimeout(() => {
    modal.classList.add("popup_is-opened"); // открытие
  }, 1);

  // Навешиваем обработчик Escape
  document.addEventListener("keydown", handleEscape);
};

//функция закрытия попапа
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
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

export { openModal, closeModal };
