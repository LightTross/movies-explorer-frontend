import { React, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { getMovieDuration } from '../../utils/getMovieDuration';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


const MoviesCard = (movie) => {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);

  console.log(movie)

  return (
    <li key={movie.id} className='card'>
      <div className='card__container'>
        <a className='card__link' href={movie.trailerLink} rel='noreferrer' target='_blank'>
          <img className='card__image' src={movie.image} alt={movie.nameRU}/>
        </a>
        <div className='card__description'>
          <h2 className='card__name'>{movie.nameRU}</h2>
          <p className='card__duration'>{getMovieDuration(movie.duration)}</p>
        </div>
        {
          location.pathname === '/movies' ? (
            <button type='button' className={`card__button-saved ${movie.like ? 'card__button-saved_active' : ''}`}>{!movie.like ? 'Сохранить' : ''}</button>
          ) : (
            <button type='button' className='card__button-delete'/>
          )
        }
      </div>
    </li>
  )

};

export default MoviesCard;