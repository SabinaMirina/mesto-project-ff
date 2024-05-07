// DOM узлы
const popImage = document.querySelector(".popup__image"); //картинка в модальном окне
const popImageDescription = document.querySelector(".popup__caption");

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

//функция открытия попапа
const openModal = (modal) => {
  modal.classList.add("popup_is-animated"); // анимация
  setTimeout(() => {
    modal.classList.add("popup_is-opened"); // открытие
  }, 1);

  // Навешиваем обработчик Escape
  document.addEventListener("keydown", handleEscape);
};

// Функция открытия модального окна с картинкой
const handleImageClick = (modal, imageSrc, imageDescription) => {
  if (popImage) {
    popImage.src = imageSrc;
    popImage.alt = imageDescription;
    popImageDescription.textContent = imageDescription;
  }
  openModal(modal);
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

//функция закрытия попапа овэрлэй
function closeModalOverlay(evt, modal) {
  if (evt.target === modal) {
    closeModal(modal);
  }
}

export { openModal, closeModal, closeModalOverlay, handleImageClick };
