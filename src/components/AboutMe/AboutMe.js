import React from 'react';
import './AboutMe.css';
import photo from '../../images/my-photo.jpg';
import Portfolio from '../Portfolio/Portfolio';

const AboutMe = () => {
  return (
    <section className='about-me' id='about-me'>
      <div className='about-me__container'>
        <h2 className='about-me__title'>Студент</h2>
        <article className='about-me__info'>
        <img className='about-me__photo' src={photo} alt='Фото'/>
          <div className='about-me__description'>
            <h3 className='about-me__name'>Анастасия</h3>
            <p className='about-me__profession'>Вэб-разработчик, 30 лет</p>
            <p className='about-me__history'>Я живу в Москве, закончила факультет экономики. Мне нравится активный образ жизни: ролики, коньки, сноуборд, вейкборд, мотоцикл. Люблю путешествовать. Ранее работала в сфере продаж, вела крупные проекты, но мне всегда было интересно окунуться в мир IT. Я решила пройти курс по веб-разработке, чтобы сменить профессию.</p>
            <div className='about-me__links'>
              <a className='about-me__link' href='https://github.com/LightTross' target='_blank' rel='noreferrer'>Github</a>
            </div>
          </div>
        </article>
      </div>
      <Portfolio/>
    </section>
  )
};

export default AboutMe;