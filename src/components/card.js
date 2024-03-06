const createCard=({ currentUserId, template, data, deleteFunc, like, ImageOpen }) => {

    const card = template.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const cardImage = card.querySelector('.card__image');
    const counter = card.querySelector('.card__like-counter');
    const btnLike = card.querySelector('.card__like-button');

    counter.classList.add('card__like-counter_is-active');
    counter.textContent = data.likes.length;

    cardImage.addEventListener('click', () =>
      ImageOpen({
        name: data.name,
        link: data.link,
      })
    );
    cardImage.alt = data.name;
    cardImage.src = data.link;

    card.querySelector('.card__title').textContent = data.name;

    // deleteButton.addEventListener('click', deleteCard);
    if (data.owner['_id'] === currentUserId) { 
        deleteButton.classList.add('card__delete-button_is-active');
        deleteButton.addEventListener('click', () => {
          deleteFunc({
            cardId: data['_id'],
            cardElement: card,
            btnElement: deleteButton,
          });
        });
    };

    if (data.likes.find((element) => element['_id'] === currentUserId)) {
        btnLike.classList.add('card__like-button_is-active');
    };

    btnLike.addEventListener('click', () => {
        like({
          cardId: data['_id'],
          btnElement: btnLike,
          counterElement: counter
        });
      });
    
    // cardImage.addEventListener('click', function() {
    //   openImage(name, link)
    // })
    // btnLike.addEventListener('click', cardLike)

    return card;
}

export {createCard} 