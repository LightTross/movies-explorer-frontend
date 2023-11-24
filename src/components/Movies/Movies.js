import {React} from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


const Movies = ({loggedIn, isLoading, movies, savedMovies, onSaveMovie, searchInput, searchResult, isShortChecked, setIsShortChecked, onSearch, isDefaultMoviesSet, setIsDefaultMoviesSet, isErrorMessage, infoMessage}) => {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <section className='movies'>
        <SearchForm
          searchInput={searchInput}
          isShortChecked={isShortChecked}
          setIsShortChecked={setIsShortChecked}
          onSearch={onSearch}
          isDefaultMoviesSet={isDefaultMoviesSet}
          setIsDefaultMoviesSet={setIsDefaultMoviesSet}
          isErrorMessage={isErrorMessage}
          infoMessage={infoMessage}
        />
        {
          isLoading ? (
            <Preloader/>
          ) : (
            <MoviesCardList
              movies={movies}
              savedMovies={savedMovies}
              searchResult={searchResult}
              searchInput={searchInput}
              onSaveMovie={onSaveMovie}
              isShortChecked={isShortChecked}
              isDefaultMoviesSet={isDefaultMoviesSet}
              setIsDefaultMoviesSet={setIsDefaultMoviesSet}
            />
          )
        }
      </section>
      <Footer/>
    </>
  )
};

export default Movies;
