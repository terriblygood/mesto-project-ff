import '../pages/index.css';
import '../vendor/normalize.css';
import {initialCards} from '/src/components/cards.js';
import {openModalWindow, closeModalWindow} from './modal';
import {handleProfileSubmit} from './profileSub';
import {handleCardSubmit} from './addCardSubmit';
import {cardLike, createCard, deleteCard} from './card';


  

// import card_1 from './images/card_1.jpg';
// import card_2 from './images/card_2.jpg';
// import card_3 from './images/card_3.jpg';
// import add_icon from './images/add-icon.svg';
// import avatar from './images/avatar.jpg';
// import close from './images/close.svg';
// import delete_icon from './images/delete-icon.svg';
// import edit_icon from './images/edit-icon.svg';
// import like_active from './images/like-active.svg';
// import like_inactive from './images/like-inactive.svg';
// import logo from './images/logo.svg';



// const imagesPer = [
//   { name: 'card_1', link: card_1 },
//   { name: 'card_2', link: card_2 },
//   { name: 'card_3', link: card_3 },
//   { name: 'add_icon', link: add_icon },
//   { name: 'avatart', link: avatar },
//   { name: 'close', link: close },
//   { name: 'delete-icon', link: delete_icon },
//   { name: 'edit-icon', link: edit_icon },
//   { name: 'like_active', link: like_active },
//   { name: 'like_inactive', link: like_inactive },
//   { name: 'logo', link: logo },
// ];




export const cardTemplate = document.querySelector('#card-template').content;
export const placeList = document.querySelector('.places__list');

const btnEditProfile = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('.popup_type_edit');
const popupProfileClose = popupEditProfile.querySelector('.popup__close');

const btnNewMesto = document.querySelector('.profile__add-button');
export const popupAddMesto = document.querySelector('.popup_type_new-card');
const popupMestoClose = popupAddMesto.querySelector('.popup__close');

export const popupImage = document.querySelector('.popup__image');
export const popupImageCaption = document.querySelector('.popup__caption');
export const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageClose = popupTypeImage.querySelector('.popup__close');

const profileFormElement = document.querySelector('.popup_type_edit .popup__form');
export const nameInput = profileFormElement.querySelector('.popup__input_type_name');
export const jobInput = profileFormElement.querySelector('.popup__input_type_description');
export const profileTitle = document.querySelector('.profile__title');
export const profileDesc = document.querySelector('.profile__description');

export const formElementCard = document.querySelector('.popup_type_new-card .popup__form');
export const cardNameInput = formElementCard.querySelector('.popup__input_type_card-name');
export const cardUrlInput = formElementCard.querySelector('.popup__input_type_url');






btnEditProfile.addEventListener('click', function () {
  openModalWindow(popupEditProfile)

  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDesc.textContent;
})

popupProfileClose.addEventListener('click', function () {
  closeModalWindow(popupEditProfile)
})

btnNewMesto.addEventListener('click', function () {
  openModalWindow(popupAddMesto)
})

popupMestoClose.addEventListener('click', function () {
  closeModalWindow(popupAddMesto)
})

popupImageClose.addEventListener('click', function () {
  closeModalWindow(popupTypeImage)
})

profileFormElement.addEventListener('submit', handleProfileSubmit);
formElementCard.addEventListener('submit', handleCardSubmit)


initialCards.forEach(element => {
    placeList.append(createCard(element.name, element.link, deleteCard, openImage, cardLike))
});

export function openImage(name,link) {
  popupImage.src=link;
  popupImageCaption.textContent = name;
  popupImage.alt = name;
  openModalWindow(popupTypeImage);
}