//формы
const formElement = document.querySelector(".popup__form");
const formInput = document.querySelector(".popup__input");
const formButton = document.querySelector(".popup__button");

// Функция, которая включает валидацию для всех форм
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, formInput, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  // Остальной код такой же
  formInput.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, formInput, settings) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, formInput, settings) => {
  if (formInput.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    formInput.setCustomValidity("");
  }
  if (!formInput.validity.valid) {
    showInputError(
      formElement,
      formInput,
      formInput.validationMessage,
      settings
    );
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, formInput, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  // Находим все поля внутри формы
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const formButtonList = Array.from(
    formElement.querySelectorAll(settings.submitButtonSelector)
  );
  //переключение кнопки
  toggleButtonState(inputList, formButtonList, settings);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((formInput) => {
    // каждому полю добавим обработчик события input
    formInput.addEventListener("input", function () {
      isValid(formElement, formInput, settings);
      toggleButtonState(inputList, formButtonList, settings);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};

const toggleButtonState = (inputList, formButtonList, settings) => {
  formButtonList.forEach((formButton) => {
    formButton.disabled = true;
    if (hasInvalidInput(inputList)) {
      formButton.disabled = true;
      formButton.classList.add(settings.inactiveButtonClass);
    } else {
      formButton.disabled = false;
      formButton.classList.remove(settings.inactiveButtonClass);
    }
  });
};

// Функция, которая очищает ошибки валидации формы и делает кнопку неактивной
const clearValidation = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const formButtonList = Array.from(
    formElement.querySelectorAll(settings.submitButtonSelector)
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
    inputElement.value = ""; // очищаем значение поля
  });
  toggleButtonState(inputList, formButtonList, settings);
};

export { enableValidation, clearValidation, formButton };
