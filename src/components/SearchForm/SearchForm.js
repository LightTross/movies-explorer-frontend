import {React, useState} from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({isShortChecked, setIsShortChecked}) => {
  return (
    <section className='search'>
      <div className='search__container'>
        <form name='search' className='search__form'>
          <label className='search__label'/>
          <input
            type='text'
            className='search__input'
            placeholder='Фильм'
            minLength={2}
            required
          />
          <button type='submit' className='search__button-submit'></button>
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