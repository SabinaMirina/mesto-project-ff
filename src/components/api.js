import { placesList, createCard } from "./cards.js";

//Конфиг http-запросов
const config = {
  path: "https://nomoreparties.co/v1",
  cohortId: "wff-cohort-17",
  headers: {
    authorization: "1d7c5a36-10fe-4288-b8a8-123b41ec80c9",
    "Content-Type": "application/json",
  },
};

let userId = "";

const avatarElement = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__description");

//Запросы на сервер----------------------------------------------------------------

const handleRequest = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Получение данных пользователя с сервера
const getUserProfile = () => {
  return fetch(`${config.path}/${config.cohortId}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(handleRequest);
};

//Получение данных карточек
const getCards = () => {
  return fetch(`${config.path}/${config.cohortId}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(handleRequest);
};

//Объединенение запросов для получения данных пользователя и карточек
const getPromisesUserCards = () => {
  Promise.all([getUserProfile(), getCards()])
    .then(([userData, cardsData]) => {
      //данные пользователя
      console.log("Данные пользователя получены", userData);
      profileTitle.textContent = userData.name;
      profileSubtitle.textContent = userData.about;
      avatarElement.style.backgroundImage = `url(${userData.avatar})`;
      userId = userData._id;

      // Обработка данных карточек
      console.log("Карточки получены", cardsData);
      cardsData.forEach((cardData) => {
        const cardElement = createCard(cardData, userId);
        if (cardData.owner._id !== userId) {
          cardElement.querySelector(".card__delete-button").remove();
        }
        placesList.append(cardElement);
      });
    })
    .catch((error) => {
      console.log("Произошла ошибка", error);
    });
};

//Обновление профиля
const updateProfileByUser = (name, about) => {
  return fetch(`${config.path}/${config.cohortId}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(handleRequest)
    .then((data) => {
      console.log("Данные пользователя обновлены", data);
      profileTitle.textContent = data.name;
      profileSubtitle.textContent = data.about;
      return data;
    })
    .catch((error) => {
      console.log("Произошла ошибка при обновлении данных пользователя", error);
    });
};

// замена аватара
const updateAvatar = (avatarUrl) => {
  return fetch(`${config.path}/${config.cohortId}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(handleRequest);
};

//Добавление новой карточки
const handleCardAdded = (nameCard, linkCard) => {
  return fetch(`${config.path}/${config.cohortId}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard,
    }),
  }).then(handleRequest);
};

//Добавление лайка
const addLike = (cardId) => {
  return fetch(`${config.path}/${config.cohortId}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleRequest);
};

//Снятие лайка
const deleteLike = (cardId) => {
  return fetch(`${config.path}/${config.cohortId}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleRequest);
};

//Удаление карточки
const deleteCard = (cardId) => {
  return fetch(`${config.path}/${config.cohortId}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleRequest);
};

export {
  updateProfileByUser,
  updateAvatar,
  getPromisesUserCards,
  profileTitle,
  profileSubtitle,
  handleCardAdded,
  deleteCard,
  addLike,
  deleteLike,
};
