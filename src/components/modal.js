function openModalWindow(elementPopup) {
    elementPopup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEsc);
    elementPopup.addEventListener('click', closeOverlay);
}

function closeModalWindow(elementPopup) {
    elementPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEsc);
    elementPopup.removeEventListener('click', closeOverlay);
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




export {openModalWindow, closeModalWindow, closeOverlay, closeEsc};