import { React } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { getMovieDuration } from '../../utils/getMovieDuration';
import { serverUrl } from '../../utils/constants';


const MoviesCard = ({movie, savedMovies, onSaveMovie, onDeleteMovie}) => {
  const location = useLocation();

  //сохранен ли фильм или нет
  const isSaved = savedMovies ? savedMovies.some(i => i.movieId === movie.id) : false;

  //сохраняем фильм
  const handleSaveMovie = () => {
    onSaveMovie(movie);
  }

  //удаяем фильм
  const handleDeleteMovie = () => {
    onDeleteMovie(movie);
  }

  return (
    <li className='card'>
      <div className='card__container'>
        <a className='card__link' href={movie.trailerLink} rel='noreferrer' target='_blank'>
          <img className='card__image'
            src={location.pathname === '/movies' ? serverUrl+movie.image.url : movie.image}
            alt={movie.nameRU}/>
        </a>
        <div className='card__description'>
          <h2 className='card__name'>{movie.nameRU}</h2>
          <p className='card__duration'>{getMovieDuration(movie.duration)}</p>
        </div>
        {
          location.pathname === '/movies' ? (
            <button type='button' className={`card__button-saved ${isSaved ? 'card__button-saved_active' : ''}`} onClick={handleSaveMovie}>{!isSaved ? 'Сохранить' : ''} </button>
          ) : (
            <button type='button' className='card__button-delete' onClick={handleDeleteMovie}/>
          )
        }
      </div>
    </li>
  )

};

export default MoviesCard;