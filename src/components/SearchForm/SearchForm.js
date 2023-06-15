import {React, useState} from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({isShortChecked, setIsShortChecked}) => {
  return (
    <section className='search'>
      <div className='search__container'>
        <form className='search__form'>
          <label className='search__label'/>
          <input type='text' className='search__input' search='search' placeholder='Фильм' required/>
          <button type='button' className='search__button-submit'></button>
        </form>
        <FilterCheckbox
          isShortChecked={isShortChecked}
          setIsShortChecked={setIsShortChecked}
        />
      </div>
    </section>
  )
};

export default SearchForm;