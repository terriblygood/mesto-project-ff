import '../pages/index.css';
import '../vendor/normalize.css';
import {openModalWindow, closeModalWindow} from './modal';
import {handleEditImageClick, handleProfileEditImageSubmit, handleProfileSubmit} from './profileSub';
import {createCard} from './card';
import { clearValidation, enableValidation } from './validation';
import { getInitialCards, getUserData, deleteCard as apiDeleteCard, toggleLike, createCard as apiCreateCard} from './API';
import { renderLoad } from './uxForms';

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};


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
export const popupConfirm = document.querySelector('.popup_type_confirm');
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

export const cardToRemove = {
  _id: null,
  card: null
}

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

const openProfile = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;

  clearValidation(profileForm, validationConfig);

  openModalWindow(popupEditProfile);
};

export const IsImageValid = (url) => {
  return fetch(url, {
      method: 'HEAD',
    }).then(({ ok, headers, status }) => {
      if (ok) {
        if (headers.get('Content-Type').includes('image')) {
          return Promise.resolve();
        }
        return Promise.reject('Ошибка: URL не ссылается на картинку, проверьте введенный адрес');
      }
      return Promise.reject(`Ошибка: ${status}`);
    });};


export function openConfirm() {
  openModalWindow(popupConfirm);
}

export function handleConfirmDeleteCard(){

  apiDeleteCard(cardToRemove._id)
      .then(() => {
        cardToRemove.card.remove();
        

        cardToRemove._id = null;
        cardToRemove.removeFn = null;
        closeModalWindow(popupConfirm);
    })
    .catch(console.error)
};

export function handleLike({cardId, isLikedBtn, renderLikes}) {
  toggleLike(cardId, isLikedBtn)
    .then(({ likes }) => { 
      renderLikes(likes);
    })
    .catch(console.error);
};

const handleCardSubmit = (evt) => {
  evt.preventDefault();

  renderLoad({ 
    btnElement: cardSubmit,
    isLoad: true
  })

  apiCreateCard({
    name: cardNameInput.value,
    link: cardUrlInput.value,
  })
    .then((cardData) => {
      placeList.prepend(
        createCard({
          currentUserId: cardData.owner['_id'],
          template: cardTemplate,
          data: cardData,
          openConfirm,
          like: handleLike,
          openCardImage: openImage,
        })
      );

      cardForm.reset();

      closeModalWindow(popupAddMesto);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoad({
        btnElement: cardSubmit,
        isLoad: false
      });
  });
};

cardForm.addEventListener('submit', handleCardSubmit);
btnEditProfile.addEventListener('click', openProfile);
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
popupConfirmBtn.addEventListener('click', handleConfirmDeleteCard);

Promise.all([getUserData(), getInitialCards()])
  .then(([{ name, about, avatar, ['_id']: currentUserId}, cards]) => {
    setProfile({ name, description: about, avatar});
    cards.forEach((cardData) => {
      placeList.append(
        createCard({ currentUserId, 
          template: cardTemplate, data: cardData, openConfirm, like: handleLike, openCardImage: openImage, }),
      ); 
    });
  })
  .catch((error) => {
    console.log(error);
});

enableValidation(validationConfig);