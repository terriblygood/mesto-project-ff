import { cardNameInput,cardUrlInput, popupAddMesto, placeList, formElementCard } from "..";
import { createCard, deleteCard } from "./card";
import { closeModalWindow, openModalWindow } from "./modal";

function handleCardSubmit(evt) {
    evt.preventDefault();

    const name = cardNameInput.value;
    const cardUrl = cardUrlInput.value;
    
    const newCard = createCard(name, cardUrl, deleteCard, openModalWindow);

    placeList.prepend(newCard);
    formElementCard.reset();
    closeModalWindow(popupAddMesto);    
}


export {handleCardSubmit}