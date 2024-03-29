import { React, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Navigation = ({ loggedIn }) => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const handleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  }

  return (
    <nav className='navigation'>
      {
        loggedIn ? (
          <>
            <div className='navigation__list'>
              <NavLink to='/movies' className={ ({ isActive }) => isActive ? 'navigation__list-link navigation__list-link_active' : 'navigation__list-link'}>Фильмы</NavLink>
              <NavLink to='/saved-movies' className={ ({ isActive }) => isActive ? 'navigation__list-link navigation__list-link_active' : 'navigation__list-link'}>Сохраненные фильмы</NavLink>
            </div>
            <div className='navigation__profile'>
              <Link to='/profile' className='navigation__profile-link'/>
            </div>
          </>
        ) : (
          <>
            <div className='navigation__auth'>
              <Link to='/signup' className='navigation__auth-link_signup'>Регистрация</Link>
              <Link to='/signin' className='navigation__auth-link_signin'>Войти</Link>
            </div>
          </>
        )
      }
      {
        loggedIn && !isBurgerOpen ? (
          <>
            <button className='navigation__button-burger' type='button' onClick={handleBurgerMenu} >
            </button>
          </>
        ) :
        (
          <BurgerMenu isBurgerOpen={isBurgerOpen} onClose={handleBurgerMenu} />
        )
      }
    </nav>
  )
};

export default Navigation;