import '../pages/index.css';
import '../vendor/normalize.css';
import {openModalWindow, closeModalWindow} from './modal';
import {handleEditImageClick, handleProfileEditImageSubmit, handleProfileSubmit} from './profileSub';
import {handleCardSubmit} from './addCardSubmit';
import {createCard} from './card';
import { clearValidation, enableValidation } from './validation';
import { getInitialCards, getUserData, deleteCard as apiDeleteCard, likeCard, unLikeCard } from './API';

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
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
const popupConfirm = document.querySelector('.popup_type_confirm');
const popupConfirmBtn = popupConfirm.querySelector('.button_confirm');

const profileFormElement = document.querySelector('.popup_type_edit .popup__form');
export const nameInput = profileFormElement.querySelector('.popup__input_type_name');
export const jobInput = profileFormElement.querySelector('.popup__input_type_description');
export const profileSubmit = profileFormElement.querySelector('.popup__button');
export const profileTitle = document.querySelector('.profile__title');
export const profileDesc = document.querySelector('.profile__description');
const profileForm = document.forms['edit-profile'];
const profileImage = document.querySelector('.profile__image');

export const cardForm = document.forms['new-place'];
export const cardSubmit = cardForm.querySelector('.popup__button');
export const formElementCard = document.querySelector('.popup_type_new-card .popup__form');
export const cardNameInput = formElementCard.querySelector('.popup__input_type_card-name');
export const cardUrlInput = formElementCard.querySelector('.popup__input_type_url');

export const editImageForm = document.forms['edit-avatar'];
export const editImageInput = editImageForm.querySelector('.popup__input');
export const editImageButton = editImageForm.querySelector('.popup__button');
export const popupEditImage = document.querySelector('.popup_type_edit-avatar');
const editImageClose = popupEditImage.querySelector('.popup__close');

export const setProfile = ({ name, description, avatar }) => {
  profileTitle.textContent = name;
  profileDesc.textContent = description;
  profileImage.style.backgroundImage = `url(${avatar})`;
};

export function openImage({name,link}) {
  popupImage.src=link;
  popupImageCaption.textContent = name;
  popupImage.alt = name;
  openModalWindow(popupTypeImage);
}

const profileOpen = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;

  clearValidation(profileForm, validationConfig);

  openModalWindow(popupEditProfile);
};

export const cardDeleteFunction = ({cardId, btnElement}) => {
  openModalWindow(popupConfirm);
  popupConfirmBtn.onclick = () => {
    btnElement.disabled = true;

    apiDeleteCard(cardId)
    .then(() => {
      btnElement.closest('.card').remove();
      closeModalWindow(popupConfirm)
  })
  .catch((error) => {
    btnElement.disabled = false;
    console.log(error)
  })
}
};

export const handleCardLike = ({ cardId, btnElement, counterElement }) => {
  btnElement.disabled = true;
  if (btnElement.classList.contains('card__like-button_is-active')) {
    unLikeCard(cardId)
      .then(({ likes }) => {
        btnElement.classList.remove('card__like-button_is-active');
        
        if (likes.length) {
          counterElement.classList.add('card__like-counter_is-active');
          counterElement.textContent = likes.length;
          // console.log(likes.length);
        } else {
          counterElement.classList.remove('card__like-counter_is-active');
          counterElement.textContent = "0";
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        btnElement.disabled = false;
      });
  } else {
    likeCard(cardId)
      .then(({ likes }) => {
        btnElement.classList.add('card__like-button_is-active');
        
        counterElement.classList.add('card__like-counter_is-active');
        counterElement.textContent = likes.length;
        // console.log(likes.length);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        btnElement.disabled = false;
      });
  }
};

cardForm.addEventListener('submit', handleCardSubmit);
btnEditProfile.addEventListener('click', profileOpen);
popupProfileClose.addEventListener('click', function () {
  closeModalWindow(popupEditProfile)
});
btnNewMesto.addEventListener('click', function () {
  openModalWindow(popupAddMesto)
});
popupMestoClose.addEventListener('click', function () {
  closeModalWindow(popupAddMesto)
});
popupImageClose.addEventListener('click', function () {
  closeModalWindow(popupTypeImage)
});
editImageClose.addEventListener('click', function () {
  closeModalWindow(popupEditImage);
});
profileFormElement.addEventListener('submit', handleProfileSubmit);
editImageForm.addEventListener('click', handleProfileEditImageSubmit);
profileImage.addEventListener('click', handleEditImageClick);


Promise.all([getUserData(), getInitialCards()])
  .then(([{ name, about, avatar, ['_id']: currentUserId}, cards]) => {
    setProfile({ name, description: about, avatar});
    cards.forEach((cardData) => {
      placeList.append(
        createCard({ currentUserId, template: cardTemplate, data: cardData, deleteFunc: cardDeleteFunction, like: handleCardLike, ImageOpen: openImage, }),
      ); 
    });
  })
  .catch((error) => {
    console.log(error);
});

enableValidation(validationConfig);