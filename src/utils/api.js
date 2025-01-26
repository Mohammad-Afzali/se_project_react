import { getToken } from "./token";
const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

const request = (url, options) => {
  return fetch(`${baseUrl}/${url}`, options).then(checkResponse);
};

const getItems = () => {
  return request(`items`);
};

const addItem = ({ name, imageUrl, weather }, token) => {
  return request(`items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

const deleteCard = (cardId) => {
  const token = getToken();
  return request(`items/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

const addCardLike = (cardId, token) => {
  return request(`items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

const removeCardLike = (cardId, token) => {
  return request(`items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export {request, checkResponse, getItems, addItem, deleteCard, addCardLike, removeCardLike,
};
