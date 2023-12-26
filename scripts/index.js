// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы

const placeList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard (name, link,  deleteCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const cardImage = card.querySelector('.card__image');
    card.querySelector('.card__title').textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    deleteButton.addEventListener('click', deleteCard);

    return card;
}

// @todo: Функция удаления карточки

function deleteCard (evt) {
    evt.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(element => {
    placeList.append(createCard(element.name, element.link, deleteCard))
});