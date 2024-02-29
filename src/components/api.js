const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
  headers: {
    authorization: '975fa0c1-6a4d-4d7f-877c-712a2b8ee439',
    'Content-Type': 'application/json',
  },
};

const checkResponse = async response => {
  if (response.ok) {
    return await response.json();
  }
  return await Promise.reject(`Ошибка: ${response.status}`);
};

const getUserData = async () => {
  const requestUrl = config.baseUrl + '/users/me';
  const response = await fetch(requestUrl, { headers: config.headers });
  return await checkResponse(response);
};

const getCardsData = async () => {
  const requestUrl = config.baseUrl + '/cards';
  const response = await fetch(requestUrl, { headers: config.headers });
  return await checkResponse(response);
};

export const getPageData = async () => {
  return await Promise.all([getUserData(), getCardsData()]);
};

export const updateUserData = async body => {
  const requestUrl = config.baseUrl + '/users/me';
  const response = await fetch(requestUrl, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(body),
  });
  return await checkResponse(response);
};

export const addNewCard = async body => {
  const requestUrl = config.baseUrl + '/cards';
  const response = await fetch(requestUrl, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(body),
  });
  return await checkResponse(response);
};

export const deleteCard = async cardId => {
  const requestUrl = config.baseUrl + `/cards/${cardId}`;
  const response = await fetch(requestUrl, {
    method: 'DELETE',
    headers: config.headers,
  });
  return await checkResponse(response);
};

export const putLikeCard = async cardId => {
  const requestUrl = config.baseUrl + `/cards/likes/${cardId}`;
  const response = await fetch(requestUrl, {
    method: 'PUT',
    headers: config.headers,
  });
  return await checkResponse(response);
};

export const deleteLikeCard = async cardId => {
  const requestUrl = config.baseUrl + `/cards/likes/${cardId}`;
  const response = await fetch(requestUrl, {
    method: 'DELETE',
    headers: config.headers,
  });
  return await checkResponse(response);
};

export const updateAvatar = async body => {
  const requestUrl = config.baseUrl + `/users/me/avatar`;
  const response = await fetch(requestUrl, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(body),
  });
  return await checkResponse(response);
};
