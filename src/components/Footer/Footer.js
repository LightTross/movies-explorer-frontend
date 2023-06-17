import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p className='footer__copyright'>&copy; 2023</p>
        <nav className='footer__list'>
          <a className='footer__link' href='https://practicum.yandex.ru/web/' target='_blank' rel="noreferrer">Яндекс.Практикум</a>
          <a className='footer__link' href='https://github.com/LightTross' target='_blank' rel="noreferrer">Github</a>
        </nav>
      </div>
    </footer>
  )
};

export default Footer;