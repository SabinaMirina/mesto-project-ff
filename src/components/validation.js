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
const showInputError = (formElement, input, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, input, settings) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${input.id}-error`);

  input.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, input, settings) => {
  if (input.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    input.setCustomValidity("");
  }
  if (!input.validity.valid) {
    showInputError(formElement, input, input.validationMessage, settings);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, input, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  // Находим все поля внутри формы
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonList = Array.from(
    formElement.querySelectorAll(settings.submitButtonSelector)
  );
  //переключение кнопки
  toggleButtonState(inputList, buttonList, settings);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((input) => {
    // каждому полю добавим обработчик события input
    input.addEventListener("input", function () {
      isValid(formElement, input, settings);
      toggleButtonState(inputList, buttonList, settings);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonList, settings) => {
  buttonList.forEach((button) => {
    button.disabled = true;
    if (hasInvalidInput(inputList)) {
      button.disabled = true;
      button.classList.add(settings.inactiveButtonClass);
    } else {
      button.disabled = false;
      button.classList.remove(settings.inactiveButtonClass);
    }
  });
};

// Функция, которая очищает ошибки валидации формы и делает кнопку неактивной
const clearValidation = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonList = Array.from(
    formElement.querySelectorAll(settings.submitButtonSelector)
  );

  inputList.forEach((input) => {
    hideInputError(formElement, input, settings);
    input.value = ""; // очищаем значение поля
  });
  toggleButtonState(inputList, buttonList, settings);
};

export { enableValidation, clearValidation };
