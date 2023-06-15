import React from 'react';
import './Portfolio.css';
import linkArrow from '../../images/linkArrow.svg';

const Portfolio = () => {
  return (
    <>
      <div className='portfolio'>
        <h3 className='portfolio__title'>Портфолио</h3>
        <ul className='portfolio__links'>
          <li className='portfolio__links-element'>
            <a className='portfolio__link' href='https://lighttross.github.io/how-to-learn/' target='_blank' rel='noreferrer'>Статичный сайт <img className='portfolio__link-img' alt='стрелка' src={linkArrow}/></a>
          </li>
          <li className='portfolio__links-element'>
            <a className='portfolio__link' href='https://lighttross.github.io/russian-travel/' target='_blank' rel='noreferrer'>Адаптивный сайт <img className='portfolio__link-img' alt='стрелка' src={linkArrow}/></a>
          </li>
          <li className='portfolio__links-element'>
            <a className='portfolio__link' href='https://talalayeva.mesto.nomoredomains.monster/' target='_blank' rel='noreferrer'>Одностраничное приложение <img className='portfolio__link-img' alt='стрелка' src={linkArrow}/></a>
          </li>
        </ul>
      </div>
    </>
  )
};

export default Portfolio;