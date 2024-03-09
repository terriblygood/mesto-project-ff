import { IsImageValid } from ".";

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

const createCard = ({name, link})  => {
    return IsImageValid(link).then(() =>
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

const userAvatar = (url) => {
    return IsImageValid(url).then(() =>
      fetch(`${base.baseUrl}/users/me/avatar`, {
        headers: base.headers,
        method: 'PATCH',
        body: JSON.stringify({
          avatar: url,
        }),
      }).then(checkRes)
    );
  };

const toggleLike = (cardId, isLiked) => {
    return fetch(`${base.baseUrl}/cards/likes/${cardId}`, {
      headers: base.headers,
      method: isLiked ? 'DELETE' : 'PUT',
    })
    .then(checkRes);
};
  
export {getInitialCards, createCard, deleteCard, getUserData, updateUserInfo, userAvatar, toggleLike}