import { cardTemplate } from "./index";



function createCard (name, link,  deleteCard, openImage, cardLike) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const cardImage = card.querySelector('.card__image');
    const btnLike = card.querySelector('.card__like-button');
    card.querySelector('.card__title').textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    deleteButton.addEventListener('click', deleteCard);
    cardImage.addEventListener('click', function() {
      openImage(name, link)
    })
    btnLike.addEventListener('click', cardLike)

    return card;
}
  
function deleteCard (evt) {
    const elementCard = evt.target.closest('.card');
    elementCard.remove();
}
function cardLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active')
}


export {createCard, deleteCard, cardLike} 