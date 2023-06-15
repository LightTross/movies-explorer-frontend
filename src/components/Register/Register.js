import {React, useState} from 'react';
import {Link} from 'react-router-dom';
import './Register.css';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import InfoTooltip from '../InfoTooltip/InfoTooltip';


const Register = ({onRegister}) => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  return (
    <div className='register'>
      <Link to='/' className='register__logo'/>
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form className='register__form' onSubmit={handleSubmit}>
        <label htmlFor='name' className='register__label'>Имя</label>
        <input
          id='name'
          type='text'
          className={`register__input ${!errors.name ? '' : 'register__input-error_active'}`}
          name='name'
          placeholder='Введите имя'
          minLength={2}
          maxLength={40}
          required=''
          value={values.name || ''}
          onChange={handleChange}
        />
        <span className={`register__input-error ${isValid ? '' : 'register__input-error_active'}`}>{errors.name}</span>
        <label htmlFor='email' className='register__label'>E-mail</label>
        <input
          id='email'
          type='email'
          className={`register__input ${!errors.email ? '' : 'register__input-error_active'}`}
          name='email'
          placeholder='Введите email'
          minLength={2}
          maxLength={40}
          required=''
          value={values.email || ''}
          onChange={handleChange}
        />
        <span className={`register__input-error ${isValid ? '' : 'register__input-error_active'}`}>{errors.email}</span>
        <label htmlFor='password' className='register__label'>Пароль</label>
        <input
          id='password'
          type='password'
          className={`register__input ${!errors.password ? '' : 'register__input-error_active'}`}
          name='password'
          placeholder='Введите пароль'
          minLength={8}
          maxLength={20}
          required=''
          value={values.password || ''}
          onChange={handleChange}
        />
        <span className={`register__input-error ${isValid ? '' : 'register__input-error_active'}`}>{errors.password}</span>
        <div className='register__buttons'>
        {isError && <InfoTooltip errorMessage='Что-то пошло не так...'/>}
          <button
            type='submit'
            className='register__button-submit'
            disabled={!values.email || !values.password || !isValid}
          >Зарегистрироваться</button>
        </div>
      </form>
      <div className='register__signin'>
        <span>Уже зарегистрированы?</span>
        <Link to='/signin' className='register__signin-link'>Войти</Link>
      </div>
    </div>
  )
};

export default Register;