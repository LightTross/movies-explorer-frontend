import { serverUrl } from "./constants";

const baseUrl  = 'https://api.talalayeva.promovies.nomoredomains.rocks';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};


export const register = (name, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ name, email, password}),
  }).then((res) => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({email, password}),
  }).then((res) => checkResponse(res));
};

export const checkToken = () => {
  return fetch(`${baseUrl}/check`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then((res) => checkResponse(res))
};

export const signout = () => {
  return fetch(`${baseUrl}/signout`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then((res) => checkResponse(res));
};

export const getUser = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers,
    credentials: 'include',
  }).then((res) => checkResponse(res));
};

export const updateUser = (name, email) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ name, email }),
    credentials: 'include',
  }).then((res) => checkResponse(res));
};

export const saveMovie = (movie) => {
  return fetch(`${baseUrl}/movies`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      movieId: movie.id,
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: serverUrl+movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: serverUrl+movie.image.formats.thumbnail.url,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN
    }),
    credentials: 'include',
  }).then((res) => checkResponse(res));
};

export const getSavedMovies = () => {
  return fetch(`${baseUrl}/movies`, {
    method: 'GET',
    headers,
    credentials: 'include',
  }).then((res) => checkResponse(res));
};

export const deleteMovie = (id) => {
  return fetch(`${baseUrl}/movies/${id}`, {
    method: 'DELETE',
    headers,
    credentials: 'include',
  }).then((res) => checkResponse(res));
};
