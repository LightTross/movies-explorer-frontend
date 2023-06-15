import { React, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { getMovieDuration } from '../../utils/getMovieDuration';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


const MoviesCard = (movie) => {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);

  return (
    <li key={movie.id} className='card'>
      <figure className='card__container'>
        <img className='card__image' src={movie.image} alt={movie.nameRU}/>
        <figcaption className='card__description'>
          <p className='card__name'>{movie.nameRU}</p>
          <p className='card__duration'>{getMovieDuration(movie.duration)}</p>
        </figcaption>
        {
          location.pathname === '/movies' ? (
            <button type='button' className={`card__button-saved ${movie.like ? 'card_button-saved_active' : ''}`}>{!movie.like ? 'Сохранить' : ''}</button>
          ) : (
            <button type='button' className='card__button-delete'/>
          )
        }
      </figure>
    </li>
  )

};

export default MoviesCard;