import { cardToRemove } from ".";


const createCard=({ currentUserId, template, data, openConfirm, like, openCardImage }) => {

    const card = template.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const cardImage = card.querySelector('.card__image');
    const counter = card.querySelector('.card__like-counter');
    const btnLike = card.querySelector('.card__like-button');



    cardImage.addEventListener('click', () =>
      openCardImage({
        name: data.name,
        link: data.link,
      })
    );
    cardImage.alt = data.name;
    cardImage.src = data.link;

    card.querySelector('.card__title').textContent = data.name;


    if (data.owner['_id'] === currentUserId) { 
        deleteButton.classList.add('card__delete-button_is-active');
        deleteButton.addEventListener('click', () => {

        cardToRemove._id = data['_id'];
        cardToRemove.card = card;
        
        
        openConfirm();
        });
    };

    
    function renderLikes(newLikes) {
      const isLiked = !!(newLikes.find((element) => element['_id'] === currentUserId));
      if (isLiked) {
        btnLike.classList.add('card__like-button_is-active');
      } else {  
        btnLike.classList.remove('card__like-button_is-active');
      }
      counter.textContent = newLikes.length;
    }
    
    
  
    
    btnLike.addEventListener('click', () => {
      like({
        cardId: data['_id'],
        isLikedBtn: btnLike.classList.contains('card__like-button_is-active'),
        renderLikes,
      });
      console.log(data['_id'])
      
    });
    renderLikes(data.likes);

    return card;
}


export {createCard} 