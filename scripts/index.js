// @todo: Темплейт карточки
let cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы

let placeList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard (name, link,  deleteCard) {
    let card = cardTemplate.querySelector('.card').cloneNode(true);
    let deleteButton = card.querySelector('.card__delete-button');
    card.querySelector('.card__title').textContent = name;
    card.querySelector('.card__image').src = link;
    card.querySelector('.card__image').alt = name;
    deleteButton.addEventListener('click', deleteCard);

    return card;
}

// @todo: Функция удаления карточки

function deleteCard (evt) {
    evt.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(element => {
    placeList.append(addCard(element.name, element.link, deleteCard))
});