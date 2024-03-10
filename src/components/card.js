function renderLikes( newLikes, userId, btnElement, counter) {
  const isLiked = !!(newLikes.find((element) => element['_id'] === userId));
  if (isLiked) {
    btnElement.classList.add('card__like-button_is-active');
  } else {  
    btnElement.classList.remove('card__like-button_is-active');
  }
  counter.textContent = newLikes.length;
}


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

        openConfirm({cardId: data['_id'], card});
        });
    };


    btnLike.addEventListener('click', () => {
      like({
        cardId: data['_id'],
        isLikedBtn: btnLike.classList.contains('card__like-button_is-active'),
        renderLikes,
        userId: currentUserId,
        btnElement: btnLike,
        counter: counter,
      });
    });

    renderLikes(data.likes, currentUserId, btnLike, counter);

    return card;
}

function handleDeleteCard(cardForDelete) {
  cardForDelete.remove();
}



export {createCard, handleDeleteCard} 