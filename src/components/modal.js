import { popupImage, popupTypeImage,popupImageCaption } from "..";

function openModalWindow(evt) {
    evt.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEsc);
    evt.addEventListener('click', closeOverlay);
}

function closeModalWindow(evt) {
    evt.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalWindow);
    document.removeEventListener('click', closeModalWindow);
    evt.removeEventListener('click', closeOverlay);

}

function closeOverlay(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closeModalWindow(evt.target)
    }
}

function closeEsc(evt) {
    if (evt.code === 'Escape') {
        if (document.querySelector('.popup_is-opened')) {
            closeModalWindow(document.querySelector('.popup_is-opened'))
        }
    }
}

function openImage(name,link) {
    popupImage.src=link;
    popupImageCaption.textContent = name;
    openModalWindow(popupTypeImage);
}



export {openModalWindow, closeModalWindow, closeOverlay, closeEsc, openImage};