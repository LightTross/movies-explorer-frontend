import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';

const Header = ({loggedIn}) => {
  return (
    <header className='header'>
      <Link to='/' className='header__logo'/>
      <Navigation loggedIn={loggedIn}/>
    </header>
  )
};

export default Header;