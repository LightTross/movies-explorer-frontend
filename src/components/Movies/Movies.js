import {React, useEffect, useState} from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


const Movies = ({loggedIn, isLoading, movies}) => {
  const [moreButton, setMoreButton] = useState(false)
  const [defaultMovies, setDefaultMovies] = useState(12)
  const [isDefaultMoviesSet, setIsDefaultMoviesSet] = useState(false)
  const [isShortChecked, setIsShortChecked] = useState(true)
  const [searchResult, setSearchResult] = useState(1)


  useEffect(() => {
    if (window.innerWidth <= 425 && isDefaultMoviesSet === false) {
      setDefaultMovies(5);
      setIsDefaultMoviesSet(true);
    }
    else if (426 <= window.innerWidth && window.innerWidth <= 768 && isDefaultMoviesSet === false) {
      setDefaultMovies(8);
      setIsDefaultMoviesSet(true);
    }
    else if (isDefaultMoviesSet === false){
      setDefaultMovies(12);
      setIsDefaultMoviesSet(true);
    }


    if (movies.length <= defaultMovies || movies.length === 0) {
      setMoreButton(false);
    }
    else
      setMoreButton(true);
  }, [moreButton, defaultMovies])


  const handleDefaultMovies = () => setDefaultMovies(defaultMovies + 3)

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <section className='movies'>
        <SearchForm isShortChecked={isShortChecked} setIsShortChecked={setIsShortChecked}/>
        {
          isLoading ? (
            <Preloader/>
          ) : (
            <MoviesCardList
              movies={movies.slice(0, defaultMovies)}
              handleDefaultMovies={handleDefaultMovies}
              moreButton={moreButton}
              searchResult={searchResult}
            />
          )
        }
      </section>
      <Footer/>
    </>
  )
};

export default Movies;
