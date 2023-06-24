import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './BurgerMenu.css';

const BurgerMenu = ({ isBurgerOpen, onClose }) => {
  return (
    <div className={`burger ${isBurgerOpen ? 'burger_opened' : ''}`}>
      <div className='burger__background'></div>
      <div className='burger__container'>
        <button type='button' className='burger__close-button' onClick={onClose} />
        <div className='burger__nav'>
          <NavLink to='/' onClick={onClose} className={({ isActive }) => isActive ? 'burger__link burger__link_active' : 'burger__link'}>Главная</NavLink>
          <NavLink to='/movies' onClick={onClose} className={({ isActive }) => isActive ? 'burger__link burger__link_active' : 'burger__link'}>Фильмы</NavLink>
          <NavLink to='/saved-movies' onClick={onClose} className={({ isActive }) => isActive ? 'burger__link burger__link_active' : 'burger__link'}>Сохраненные фильмы</NavLink>
        </div>
        <div className='burger__profile'>
          <Link to='/profile' onClick={onClose} className='burger__profile-link'/>
        </div>
      </div>
    </div>
  )
};

export default BurgerMenu;