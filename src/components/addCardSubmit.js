import { cardNameInput,cardUrlInput, openImage, placeList, popupAddMesto, cardForm, cardDeleteFunction, handleCardLike, cardTemplate, cardSubmit} from './index';
import {createCard } from "./card";
import { closeModalWindow } from "./modal";
import {createCard as apiCreateCard} from "./API"
import { whileLoad } from './uxForms';


const handleCardSubmit = (evt) => {
    evt.preventDefault();

    whileLoad({ 
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
            onDelete: cardDeleteFunction,
            onLike: handleCardLike,
            ImageOpen: openImage,
          })
        );

        cardForm.reset();
  
        closeModalWindow(popupAddMesto);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        whileLoad({
          btnElement: cardSubmit,
          isLoad: false
        });
    });
};
  

export {handleCardSubmit};