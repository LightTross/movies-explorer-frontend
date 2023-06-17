import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({movies, handleDefaultMovies, moreButton, searchResult}) => {


  return (
    <section className='cards'>
      <ul className='cards__list'>
        {movies.map((movie) => (
          <MoviesCard
            key={movie.id}
            image={movie.image}
            nameRU={movie.nameRU}
            duration={movie.duration}
            like={movie.like}
            trailerLink={movie.trailerLink}
          />
        ))}
      </ul>
      {searchResult === 0 && <span className="cards__not-found">Фильмы не найдены</span>}
      <div className='cards__more'>
      {
        moreButton && <button className='cards__button' onClick={handleDefaultMovies}>Ещё</button>
      }
      </div>
    </section>
  )
};

export default MoviesCardList;