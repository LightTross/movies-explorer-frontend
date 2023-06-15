import React from 'react';
import {Link} from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <section className='page-not-found'>
      <div className='page-not-found__container'>
        <h1 className='page-not-found__title'>404</h1>
        <p className='page-not-found__text'>Страница не найдена</p>
        <Link to='/' className='page-not-found__link'>Назад</Link>
      </div>
    </section>
  )
};

export default PageNotFound;
