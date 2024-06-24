//Конфиг http-запросов
const config = {
  path: "https://nomoreparties.co/v1",
  cohortId: "wff-cohort-17",
  headers: {
    authorization: "1d7c5a36-10fe-4288-b8a8-123b41ec80c9",
    "Content-Type": "application/json",
  },
};

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

//Обновление профиля
const updateProfileByUser = (name, about) => {
  return fetch(`${config.path}/${config.cohortId}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleRequest);
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
  handleCardAdded,
  deleteCard,
  addLike,
  deleteLike,
  getUserProfile,
  getCards,
};
