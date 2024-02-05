import { nameInput, jobInput, popupEditProfile, profileTitle, profileDesc } from "./index";
import { closeModalWindow } from "./modal";

function handleProfileSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    
    profileTitle.textContent = nameValue;
    profileDesc.textContent = jobValue;
    
    closeModalWindow(popupEditProfile);
    
}


export {handleProfileSubmit};

