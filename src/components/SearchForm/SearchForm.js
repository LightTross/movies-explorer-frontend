import {React, useEffect} from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { errorMessages } from '../../utils/constants';

const SearchForm = ({searchInput, isShortChecked, setIsShortChecked, onSearch, setIsDefaultMoviesSet, isErrorMessage, infoMessage}) => {
  const {values, handleChange, isValid, setValues, setIsValid} = useFormAndValidation();

  useEffect(() => {
    if (searchInput) {
      setValues({search: searchInput})
      setIsValid(true)
    }
  }, [searchInput])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.search === '' || !values.search) {
      setIsValid(false)
      return
    }

    setIsDefaultMoviesSet(false)

    onSearch(values.search);
  }

  return (
    <section className='search'>
      <div className='search__container'>
        <form name='search' className='search__form' onSubmit={handleSubmit}>
          <label className='search__label'/>
          <input
            id='search'
            type='text'
            name='search'
            className='search__input'
            placeholder='Фильм'
            minLength={1}
            required=''
            value={values.search || ''}
            onChange={handleChange}
          />
          <button
            type='submit'
            className='search__button-submit'
            disabled={!isValid}
          ></button>
        </form>
        <span className={`search__input-error ${isValid && !isErrorMessage ? '' : 'search__input-error_active'}`}>
          {values.search === '' || !values.search ? errorMessages.errorInput : infoMessage}
        </span>
        <FilterCheckbox
          isShortChecked={isShortChecked}
          setIsShortChecked={setIsShortChecked}
        />
      </div>
    </section>
  )
};

export default SearchForm;