import { updateUserInfo, userAvatar} from "./API";
import {editImageForm, editImageInput, popupEditProfile, setProfile, validationConfig, popupEditImage, nameInput, jobInput, editImageButton, profileSubmit} from "./index";
import { closeModalWindow, openModalWindow } from "./modal";
import { renderLoad } from "./uxForms";
import { clearValidation } from "./validation";


const handleProfileSubmit = (evt) => {
    evt.preventDefault();

    renderLoad({
        btnElement: profileSubmit,
        isLoad: true
      });

    updateUserInfo({
        name: nameInput.value,
        description: jobInput.value
    }) 
      .then(({name, about, avatar}) => {
            setProfile({
                name, 
                description: about, 
                avatar
            });

            closeModalWindow(popupEditProfile);
        })
      .catch((error) => { console.log(error); })
      .finally(() => {
        renderLoad({
          btnElement: profileSubmit,
          isLoad: false
        });
    });
}   

const handleProfileEditImageSubmit = (evt) => {
    evt.preventDefault();
  
    renderLoad({
      btnElement: editImageButton,
      isLoad: true
    });
  
    userAvatar(editImageInput.value)
      .then(({ name, about, avatar }) => {
        setProfile({ name, description: about, avatar});

        closeModalWindow(popupEditImage);
      })
      .catch((error) => { console.log(error) })
      .finally(() => {
        renderLoad({
          btnElement: editImageButton,
          isLoad: false
        });
    });
};

const handleEditImageClick = () => {
    editImageForm.reset();
  
    clearValidation(editImageForm, validationConfig);
  
    openModalWindow(popupEditImage);
  };

export {handleProfileSubmit, handleProfileEditImageSubmit, handleEditImageClick};

