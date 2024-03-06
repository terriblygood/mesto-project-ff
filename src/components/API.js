const base = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
    headers: {
        authorization: '07ee5338-d132-427d-8dc2-79ca68994762',
        'Content-Type': 'application/json',
    },
};

const checkRes = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

const imageIsValid = (url) => {
    return fetch(url, {
        method: 'HEAD',
      }).then(({ ok, headers, status }) => {
        if (ok) {
          if (headers.get('Content-Type').includes('image')) {
            return Promise.resolve();
          }
          return Promise.reject('Ошибка: URL не ссылается на картинку, проверьте введенный адрес');
        }
        return Promise.reject(`Ошибка: ${status}`);
      });};

const createCard = ({name, link})  => {
    return imageIsValid(link).then(() =>
    fetch(`${base.baseUrl}/cards`, {
        method: 'POST',
        headers: base.headers,
        body: JSON.stringify({name, link})
    })
    .then(checkRes)
    );
} 

const deleteCard = (cardId) => {
    return fetch(`${base.baseUrl}/cards/${cardId}`, {
      headers: base.headers,
      method: 'DELETE',
    })
    .then(checkRes);
};




const getInitialCards = () => {
    return fetch(`${base.baseUrl}/cards`,
    {   
        method: "GET", 
        headers: base.headers
    }
    )
    .then(checkRes)
};

const getUserData = () => {
    return fetch(`${base.baseUrl}/users/me`, {
        method: "GET",
        headers: base.headers
    })
    .then(checkRes)
}

const getUserInfo = () => {
    return fetch(`${base.baseUrl}/users/me`, { headers: base.headers})
    .then(checkRes);
  };
  
const updateUserInfo = ({ name, description }) => {
    return fetch(`${base.baseUrl}/users/me`, {
      headers: base.headers,
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about: description,
      }),
    }).then(checkRes);
};

const likeCard = (cardId) => {
    return fetch(`${base.baseUrl}/cards/likes/${cardId}`, {
      headers: base.headers,
      method: 'PUT',
    })
    .then(checkRes);
};
  
  const unLikeCard = (cardId) => {
    return fetch(`${base.baseUrl}/cards/likes/${cardId}`, {
      headers: base.headers,
      method: 'DELETE', 
    })
    .then(checkRes); 
};

const userAvatar = (url) => {
    return imageIsValid(url).then(() =>
      fetch(`${base.baseUrl}/users/me/avatar`, {
        headers: base.headers,
        method: 'PATCH',
        body: JSON.stringify({
          avatar: url,
        }),
      }).then(checkRes)
    );
  };


export {getInitialCards, createCard, deleteCard, getUserInfo, getUserData, updateUserInfo, likeCard, unLikeCard, userAvatar}