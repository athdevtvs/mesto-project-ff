const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
  headers: {
    authorization: '975fa0c1-6a4d-4d7f-877c-712a2b8ee439',
    'Content-Type': 'application/json',
  },
};

const checkResponse = async res => {
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Ошибка: ${res.status}`);
};

const getUserData = async () => {
  const requestUrl = config.baseUrl + '/users/me';
  return fetch(requestUrl, {
    headers: config.headers,
  }).then(checkResponse);
};

const getCardsData = async () => {
  const requestUrl = config.baseUrl + '/cards';
  return fetch(requestUrl, {
    headers: config.headers,
  }).then(checkResponse);
};

export const getPageData = async () => {
  return await Promise.all([getUserData(), getCardsData()]);
};

export const updateUserData = async body => {
  const requestUrl = config.baseUrl + '/users/me';
  return fetch(requestUrl, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(body),
  }).then(checkResponse);
};

export const addNewCard = async body => {
  const requestUrl = config.baseUrl + '/cards';
  return fetch(requestUrl, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(body),
  }).then(checkResponse);
};

export const removeCard = async cardId => {
  const requestUrl = config.baseUrl + `/cards/${cardId}`;
  return fetch(requestUrl, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
};

export const addCardLike = async cardId => {
  const requestUrl = config.baseUrl + `/cards/likes/${cardId}`;
  return fetch(requestUrl, {
    method: 'PUT',
    headers: config.headers,
  }).then(checkResponse);
};

export const deleteCardLike = async cardId => {
  const requestUrl = config.baseUrl + `/cards/likes/${cardId}`;
  return fetch(requestUrl, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
};

export const updateAvatar = async body => {
  const requestUrl = config.baseUrl + `/users/me/avatar`;
  return fetch(requestUrl, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(body),
  }).then(checkResponse);
};
