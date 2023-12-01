import {React, useEffect, useState} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { errorMessages } from '../../utils/constants';

const MoviesCardList = ({movies, savedMovies, searchInput, onSaveMovie, onDeleteMovie, isShortChecked, isDefaultMoviesSet, setIsDefaultMoviesSet}) => {
  const [moreButton, setMoreButton] = useState(false);
  const [addMoreMovies, setAddMoreMovies] = useState(3);
  const [countMovies, setCountMovies] = useState(0);

  const moviesShort = Array.isArray(movies) ? movies.filter(movie => movie.duration <= 40) : []; //фильтруем короткометражки
  const moviesOutput = isShortChecked ? moviesShort : movies; //фильмы для вывода

  //первоначальное выставление количества отображаемых фильмов и кнопки "Ещё"
  useEffect(() => setDefaultMovies())

  //обработка изменения ширины экрана и выставление количества отображаемых фильмов
  window.onresize = () => {
    if (window.innerWidth <= 425) {
      setAddMoreMovies(1);
    }
    else if (426 <= window.innerWidth && window.innerWidth <= 768) {
      if (countMovies % 2 !== 0) {
        setCountMovies(countMovies+1);
      }

      setAddMoreMovies(2);
    }
    else if (769 <= window.innerWidth) {
      if (countMovies % 3 === 1) {
        setCountMovies(countMovies+2);
      }
      else if (countMovies % 3 === 2) {
        setCountMovies(countMovies+1);
      }

      setAddMoreMovies(3);
    }
  }

  //установка первоначального количества фильмов
  const setDefaultMovies = () => {
    if (countMovies === 0) setIsDefaultMoviesSet(false);

    if (window.innerWidth <= 425) {
      if (isDefaultMoviesSet === false) {
        setCountMovies(5);
        setIsDefaultMoviesSet(true);
      }

      setAddMoreMovies(1);
    }
    else if (426 <= window.innerWidth && window.innerWidth <= 768) {
      if (isDefaultMoviesSet === false) {
        setCountMovies(8);
        setIsDefaultMoviesSet(true);
      }

      setAddMoreMovies(2);
    }
    else {
      if (isDefaultMoviesSet === false) {
        setCountMovies(12);
        setIsDefaultMoviesSet(true);
      }

      setAddMoreMovies(3);
    }

    //установка кнопки "Ещё"
    setViewMoreButton(countMovies);
  }

  //кнопка "Ещё"
  const setViewMoreButton = (count) => {
    if (moviesOutput.length <= count || moviesOutput.length === 0) {
      setMoreButton(false);
    }
    else
      setMoreButton(true);
  }

  //добавление фильмов и обновление кнопки "Ещё"
  const handleMoreButton = () => {
    const newCountMovies = countMovies + addMoreMovies
    setCountMovies(newCountMovies)

    setViewMoreButton(newCountMovies);
  }

  return (
    <section className='cards'>
      <ul className='cards__list'>
        {Array.isArray(moviesOutput) ? moviesOutput.slice(0, countMovies).map((movie) => (
          <MoviesCard
            key={movie.id || movie.movieid}
            movie={movie}
            savedMovies={savedMovies}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
          />
        )) : ''}
      </ul>
      {searchInput && moviesOutput.length === 0 && <span className="cards__not-found">{errorMessages.errorNotFound}</span>}
      <div className='cards__more'>
      {
        moreButton && <button className='cards__button' onClick={handleMoreButton}>Ещё</button>
      }
      </div>
    </section>
  )
};

export default MoviesCardList;
