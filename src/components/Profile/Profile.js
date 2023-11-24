import { React, useContext, useEffect, useState } from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

const Profile = ({onUpdateUser, loggedIn, onSignOut, isErrorMessage, infoMessage}) => {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, setValues, setIsValid} = useFormAndValidation();
  const [isEdit, setIsEdit] = useState(false);

  //заполняем форму текущими значениями
  useEffect(() => {
    if (currentUser) {
      setValues({name: currentUser.name, email: currentUser.email});
      setIsValid(false);
    }
  }, [currentUser]);

  //меняем отображение кнопок
  const handleEditButton = () => {
    setIsEdit(!isEdit);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //обновляем пользователя
    onUpdateUser(values.name, values.email);

    //проставляем значения в форме после обновления (на случай ошибки)
    setValues({name: currentUser.name, email: currentUser.email});
  }

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <div className='profile'>
        <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
        <form name='profile' className='profile__form'>
          <div className='profile__form-block'>
            <label htmlFor='name' className='profile__label'>Имя</label>
            <input
              id='name'
              type='text'
              className={`profile__input ${!errors.name ? '' : 'profile__input-error_active'}`}
              name='name'
              placeholder='Введите имя'
              minLength={2}
              maxLength={40}
              disabled={isEdit ? '' : 'disabled'}
              required=''
              value={values.name || ''}
              onChange={handleChange}
            />
            <span className={`profile__input-error ${isValid ? '' : 'profile__input-error_active'}`}>{errors.name}</span>
          </div>
          <div className='profile__form-block'>
            <label htmlFor='email' className='profile__label'>E-mail</label>
            <input
              id='email'
              type='email'
              className={`profile__input ${!errors.email ? '' : 'profile__input-error_active'}`}
              name='email'
              placeholder='Введите email'
              disabled={isEdit ? '' : 'disabled'}
              required=''
              value={values.email || ''}
              onChange={handleChange}
            />
            <span className={`profile__input-error ${isValid ? '' : 'profile__input-error_active'}`}>{errors.email}</span>
          </div>
          <div className='profile__buttons'>
          {infoMessage && <InfoTooltip isErrorMessage={isErrorMessage} infoMessage={infoMessage}/>}
            {
              !isEdit ? (
                <>
                  <button
                    type='button'
                    className='profile__button-edit'
                    onClick={handleEditButton}
                  >Редактировать</button>
                  <button
                    type='button'
                    className='profile__button-exit'
                    onClick={onSignOut}
                  >Выйти из аккаунта</button>
                </>
              ) : (
                <button
                  type='submit'
                  className='profile__button-save'
                  onClick={(e) => {
                      handleEditButton();
                      handleSubmit(e);
                    }
                  }
                  disabled={(!values.name || !values.email || !isValid) || (currentUser.name === values.name && currentUser.email === values.email)}
                >Сохранить</button>
              )
            }
          </div>
        </form>
      </div>
    </>
  )
};

export default Profile;