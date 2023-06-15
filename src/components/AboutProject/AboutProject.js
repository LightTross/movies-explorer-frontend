import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className='about-project' id='about-poject'>
      <div className='about-project__container'>
        <h2 className='about-project__title'>О проекте</h2>
        <div className='about-project__block'>
          <div className='about-project__block_description'>
            <h3 className='about-project__block_title'>Дипломный проект включал 5 этапов</h3>
            <p className='about-project__block_text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className='about-project__block_description'>
            <h3 className='about-project__block_title'>На выполнение диплома ушло 5 недель</h3>
            <p className='about-project__block_text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className='about-project__time'>
          <div className='about-project__backend'>1 неделя</div>
          <div className='about-project__frontend'>4 недели</div>
          <p className='about-project__time-txt'>Back-end</p>
          <p className='about-project__time-txt'>Front-end</p>
        </div>
      </div>
    </section>
  )
};

export default AboutProject;