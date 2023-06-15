import {React, useState} from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {savedMovies} from '../../utils/constants';
import Footer from '../Footer/Footer';

const SavedMovies = ({loggedIn}) => {
  const [isShortChecked, setIsShortChecked] = useState(true)
  const [searchResult, setSearchResult] = useState(1)

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <SearchForm isShortChecked={isShortChecked} setIsShortChecked={setIsShortChecked}/>
      <MoviesCardList movies={savedMovies} searchResult={searchResult}/>
      <Footer/>
    </>
  )
};

export default SavedMovies;