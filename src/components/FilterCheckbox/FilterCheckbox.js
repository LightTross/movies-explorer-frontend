import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({isShortChecked, setIsShortChecked}) => {
  const handleShortChecked = (state) => {
    setIsShortChecked(state)
    localStorage.setItem('isShortChecked', state);
    localStorage.setItem('isSavedShortChecked', state);
  }

  return (
    <div className='filter'>
      <div className='filter__container'>
        <input type='checkbox' id='checkbox' className='filter__checkbox'
          checked={isShortChecked}
          onChange={(e) => handleShortChecked(e.target.checked)}
        />
        <label htmlFor='checkbox' className='filter__checkbox-label'/>
      </div>
      <label className='filter__label'>Короткометражки</label>
    </div>
  )
};

export default FilterCheckbox;