import {checkResponse} from './MainApi';

export const BeatfilmMovies = 'https://api.nomoreparties.co/beatfilm-movies';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const getAllMoviesBeatfilm = () => {
  return fetch(`${BeatfilmMovies}`, {
    method: 'GET',
    headers,
  }).then((res) => checkResponse(res));
};