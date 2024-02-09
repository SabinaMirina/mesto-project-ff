// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const places = content.querySelector('.places');
const placesList = places.querySelector('.places__list');



// @todo: Функция создания карточки
function addCard(cards) {
cards.forEach(function(card) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__description').textContent = card.name;
//функция обработчика клика//
cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    placesList.append(cardElement);
  });
}

// @todo: Функция удаления карточки
function deleteCard(event) {
    const cardElement = event.target.closest('.places__item');
    cardElement.remove();
}

// @todo: Вывести карточки на страницу

addCard(initialCards);

