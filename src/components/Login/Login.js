import {React} from 'react';
import {Link} from 'react-router-dom';
import './Login.css';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

const Login = ({onLogin, isErrorMessage, infoMessage}) => {
  const {values, handleChange, errors, isValid, setIsValid} = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    }
    onLogin(values);

    setIsValid(true);
  };



  return (
    <div className='login'>
      <Link to='/' className='login__logo'/>
      <h1 className='login__title'>Рады видеть!</h1>
      <form name='login' className='login__form' onSubmit={handleSubmit}>
        <label htmlFor='email' className='login__label'>E-mail</label>
        <input
          id='email'
          type='email'
          className={`login__input ${!errors.email ? '' : 'login__input-error_active'}`}
          name='email'
          placeholder='Введите email'
          required=''
          value={values.email || ''}
          onChange={handleChange}
        />
        <span className={`login__input-error ${isValid ? '' : 'login__input-error_active'}`}>{errors.email}</span>
        <label htmlFor='password' className='login__label'>Пароль</label>
        <input
          id='password'
          type='password'
          className={`login__input ${!errors.password ? '' : 'login__input-error_active'}`}
          name='password'
          placeholder='Введите пароль'
          minLength={8}
          maxLength={20}
          required=''
          value={values.password || ''}
          onChange={handleChange}
        />
        <span className={`login__input-error ${isValid ? '' : 'login__input-error_active'}`}>{errors.password}</span>
        <div className='login__buttons'>
          {infoMessage && <InfoTooltip isErrorMessage={isErrorMessage} infoMessage={infoMessage}/>}
          <button
            type='submit'
            className='login__button-submit'
            disabled={!values.email || !values.password || !isValid}
          >Войти</button>
        </div>
      </form>
      <div className='login__signup'>
        <span>Ещё не зарегистрированы?</span>
        <Link to='/signup' className='login__signup-link'>Регистрация</Link>
      </div>
    </div>
  )
};

export default Login;