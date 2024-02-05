import { nameInput, jobInput, popupEditProfile, profileTitle, profileDesc } from "..";
import { closeModalWindow } from "./modal";

function handleFormSubmit(evt) {
    evt.preventDefault();
    
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
  
    profileTitle.textContent = nameValue;
    profileDesc.textContent = jobValue;
    
    closeModalWindow(popupEditProfile);
}


export {handleFormSubmit};

