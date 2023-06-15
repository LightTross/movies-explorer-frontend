import { React, useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import {movies} from '../../utils/constants'
import SavedMovies from '../SavedMovies/SavedMovies';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  //const [movies, setMovies] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {

    if(loggedIn) {
      setCurrentUser({
        name: 'Temp',
        email: 'temp@temp.com'
      });
    }
  }, [loggedIn]);

  //обработка регистрации пользователя
  const handleUserRegistration = () => {
    navigate('/signin');
  }

  //обработка авторизации пользователя
  const handleUserAuthorization = (values) => {
    setLoggedIn(true);
    setCurrentUser(values);
    navigate('/');
  }

  //редактируем данные пользователя
  const handleUpdateUser = (user) => {
    setCurrentUser(user)
  }

  //деавторизовываем пользователя
  const handleSignOut = () => {
      setLoggedIn(false);
      navigate('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <Routes>
          <Route path='/'>
            <Route index element={
              <Main loggedIn={loggedIn}/>
            }/>
          </Route>
          <Route path='/signup' element={<Register onRegister={ handleUserRegistration }/>}/>
          <Route path='/signin' element={<Login onLogin={ handleUserAuthorization }/>}/>
          <Route path='/profile' element={
            <Profile
              loggedIn={loggedIn}
              onUpdateUser={handleUpdateUser}
              onSignOut={handleSignOut}
            />}
          />
          <Route path='/movies' element={
            <Movies
              isLoading={isLoading}
              movies={movies}
              loggedIn={loggedIn}
            />}
          />
          <Route path='/saved-movies' element={
            <SavedMovies
              loggedIn={loggedIn}
            />}
          />
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
};

export default App;