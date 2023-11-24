import {React} from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const SavedMovies = ({loggedIn, savedMovies, onDeleteMovie, searchSavedInput, searchSavedResult, searchInput, isShortChecked, setIsShortChecked, onSearch, isDefaultMoviesSet, setIsDefaultMoviesSet, isErrorMessage, infoMessage}) => {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <SearchForm
          searchInput={searchSavedInput}
          isShortChecked={isShortChecked}
          setIsShortChecked={setIsShortChecked}
          onSearch={onSearch}
          isDefaultMoviesSet={isDefaultMoviesSet}
          setIsDefaultMoviesSet={setIsDefaultMoviesSet}
          isErrorMessage={isErrorMessage}
          infoMessage={infoMessage}
        />
      <MoviesCardList
        movies={savedMovies}
        savedMovies={savedMovies}
        searchResult={searchSavedResult}
        searchInput={searchSavedInput}
        onDeleteMovie={onDeleteMovie}
        isShortChecked={isShortChecked}
        isDefaultMoviesSet={isDefaultMoviesSet}
        setIsDefaultMoviesSet={setIsDefaultMoviesSet}
      />
      <Footer/>
    </>
  )
};

export default SavedMovies;