import { React, useCallback, useState, useEffect } from 'react';
import {Routes, Route, useNavigate, Navigate, useLocation} from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import * as MainApi from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';
import { errorMessages } from '../../utils/constants';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isShortChecked, setIsShortChecked] = useState(JSON.parse(localStorage.getItem('isShortChecked')) || false);
  const [isSavedShortChecked, setIsSavedShortChecked] = useState(JSON.parse(localStorage.getItem('isSavedShortChecked')) || false);

  const [searchInput, setSearchInput] = useState(localStorage.getItem('searchInput') || '')
  const [searchResult, setSearchResult] = useState(JSON.parse(localStorage.getItem('searchResult')) || '')

  const [searchSavedInput, setSearchSavedInput] = useState(localStorage.getItem('searchSavedInput') || '')
  const [searchSavedResult, setSearchSavedResult] = useState(JSON.parse(localStorage.getItem('searchSavedResult')) || '')

  const [isDefaultMoviesSet, setIsDefaultMoviesSet] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();


  //проверям токен и авторизовываем пользователя
  const handleCheckCookie = useCallback(() => {
    MainApi.checkToken()
      .then(data => {
        if (data.message === 'Необходима авторизация') {
          setLoggedIn(false);
          localStorage.removeItem('checkToken');
        } else if (data.message === 'Успешная проверка') {
          setLoggedIn(true);
          localStorage.setItem('checkToken', true);
        }
      })
      .catch(error => {
        setLoggedIn(false);
        console.log(`Ошибка: ${error}`)
      })
    }, []);

  useEffect(() => {
    handleCheckCookie()
  }, [handleCheckCookie]);

  //получаем данные пользователя и фильмы с сервера
  useEffect(() => {
    if(loggedIn) {
      setIsLoading(true);

      Promise.all([MainApi.getUser(), MoviesApi.getAllMoviesBeatfilm(), MainApi.getSavedMovies()])
        .then(([userData, movies, savedMovies]) => {
          //данные о пользователе
          setCurrentUser(userData);
          setMovies(movies);
          setSavedMovies(savedMovies);

          //проставляем сохраненные фильмы
          if (localStorage.getItem('searchSavedResult').length > 2)
            setSearchSavedResult(searchSavedResult)
          else {
            setSearchSavedResult(savedMovies);
          }
        })
        .catch(error => console.log(`Ошибка: ${error}`))
        .finally(setIsLoading(false));
    }
  }, [loggedIn]);

  //короткометражки
  useEffect(() => {
    if (loggedIn)
      localStorage.setItem('isShortChecked', isShortChecked); //ставим локальное хранилище
      localStorage.setItem('isSavedShortChecked', isSavedShortChecked); //ставим локальное хранилище
  }, [isShortChecked, isSavedShortChecked, loggedIn]);

  //поисковик во всех фильмах
  useEffect(() => {
    if (loggedIn)
      localStorage.setItem('searchInput', searchInput);
      localStorage.setItem('searchResult', JSON.stringify(searchResult));
  }, [searchInput, searchResult, loggedIn]);

  //поисковик в сохраненных фильмах
  useEffect(() => {
    if (loggedIn)
      localStorage.setItem('searchSavedInput', searchSavedInput);
      localStorage.setItem('searchSavedResult', JSON.stringify(searchSavedResult));
  }, [searchSavedInput, searchSavedResult, loggedIn]);

  //деавторизовываем пользователя
  const handleSignOut = () => {
    MainApi.signout()
      .then(() => {
        setLoggedIn(false);

        //обнуляем данные и локальное хранилище
        //токен
        localStorage.removeItem('checkToken');

        //короткометражки
        setIsShortChecked(false);
        localStorage.removeItem('isShortChecked');

        //короткометражки в сохраненных фильмах
        setIsSavedShortChecked(false);
        localStorage.removeItem('isSavedShortChecked');

        //фильмы
        setMovies([]);
        localStorage.removeItem('movies');

        //сохраненные фильмы
        setSavedMovies([]);
        localStorage.removeItem('savedMovies');

        //поисковик по фильмам
        setSearchInput('')
        localStorage.removeItem('searchInput');
        setSearchResult([])
        localStorage.removeItem('searchResult');

         //поисковик по сохраненным фильмам
        setSearchSavedInput('')
        localStorage.removeItem('searchSavedInput');
        setSearchSavedResult([])
        localStorage.removeItem('searchSavedResult');

        //сброс ошибки
        setInfoMessage('');

        navigate('/', { replace: true });
      })
      .catch(() => {
        setIsErrorMessage(true);
        setInfoMessage(errorMessages.errorServer)

        //console.log(`Ошибка: ${error}`)
      });
  }

  //обработка регистрации пользователя
  const handleUserRegistration = (values) => {
    if(!values.name || !values.email || !values.password) {
      return;
    }

    MainApi.register(values.name, values.email, values.password)
      .then(res => {
        if (res) {
          setIsErrorMessage(false);
          setInfoMessage('');

          handleUserAuthorization(values)
        }
      })
      .catch(error => {
        setIsErrorMessage(true);

        if (error === 'Ошибка: 409') {
          setInfoMessage(errorMessages.errorEmail);
        }
        else {
          setInfoMessage(errorMessages.errorServer)
        }

        //console.log(`Ошибка: ${error}`);
      })
      .finally(setTimeout(() => { setInfoMessage('') }, 5000));
  }

  //обработка авторизации пользователя
  const handleUserAuthorization = (values) => {
    if(!values.email || !values.password) {
      return;
    }

    MainApi.authorize(values.email, values.password)
      .then(res => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res)

          setIsErrorMessage(false);
          setInfoMessage('');

          localStorage.setItem('checkToken', true);

          navigate('/movies', {replace: true});
        }
      })
      .catch(error => {
        setIsErrorMessage(true);

        if (error === 'Ошибка: 400') {
          setInfoMessage(errorMessages.errorUserNotFound);
        }
        else if (error === 'Ошибка: 401') {
          setInfoMessage(errorMessages.errorAuth);
        }
        else {
          setInfoMessage(errorMessages.errorServer)
        }

        //console.log(`Ошибка: ${error}`)
      })
      .finally(setTimeout(() => { setInfoMessage('') }, 5000));
  }

  //редактируем данные пользователя
  const handleUpdateUser = (name, email) => {
    MainApi.updateUser(name, email)
      .then(userInfo => {
        setCurrentUser(userInfo);

        setIsErrorMessage(false);
        setInfoMessage('Профиль обновлен');
      })
      .catch(error => {
        setIsErrorMessage(true);

        if (error === 'Ошибка: 409') {
          setInfoMessage(errorMessages.errorEmail);
        }
        else {
          setInfoMessage(errorMessages.errorServer)
        }

        //console.log(`Ошибка: ${error}`)
      })
      .finally(setTimeout(() => { setInfoMessage('') }, 5000));
  };

  //сохраняем фильм
  const handleSaveMovie = (movie) => {
    //setIsLoading(true);

    MainApi.saveMovie(movie)
      .then(savedMovie => {
        const updateSavedMovies = [savedMovie, ...savedMovies]
        const updateSearchSavedResult = updateSavedMovies.filter(movie => movie.nameRU.toLowerCase().includes(searchSavedInput.toLowerCase()));

        setSavedMovies(updateSavedMovies); //обновляем сохраненные фильмы
        setSearchSavedResult(updateSearchSavedResult); //обновляем поиск для сохраненных фильмов

        localStorage.setItem('savedMovies', JSON.stringify(savedMovies)) //обновляем локальное хранилище
        localStorage.setItem('searchSavedResult', JSON.stringify(updateSearchSavedResult)) //обновляем локальное хранилище
      })
      .catch(() => {
        setIsErrorMessage(true);
        setInfoMessage(errorMessages.errorServer)

        //console.log(`Ошибка: ${error}`)
      })
      .finally(() => {setIsLoading(false)});
  }

  //удаляем фильм
  const handleDeleteMovie = (movie) => {
    setIsLoading(true);

    MainApi.deleteMovie(movie._id)
      .then(() => {
        const updateSavedMovies = savedMovies.filter(i => i._id !== movie._id)
        const updateSearchSavedResult = searchSavedResult.filter(i => i._id !== movie._id)

        setSavedMovies(updateSavedMovies) //обновляем сохраненные фильмы
        setSearchSavedResult(updateSearchSavedResult); //обновляем поиск для сохраненных фильмов

        localStorage.setItem('savedMovies', JSON.stringify(updateSavedMovies)) //обновляем локальное хранилище
        localStorage.setItem('searchSavedResult', JSON.stringify(updateSearchSavedResult)) //обновляем локальное хранилище
      })
      .catch(() => {
        setIsErrorMessage(true);
        setInfoMessage(errorMessages.errorServer)

        //console.log(`Ошибка: ${error}`)
      })
      .finally(() => {setIsLoading(false)});
  }

  //проверяем сохранен фильм или нет и сохраняем или удаляем
  const handleSaveButton = (movie) => {
    const isSaved = savedMovies.some(i => i.movieId === movie.id)

    if (isSaved) {
      const movieToDelete = savedMovies.find(i => i.movieId === movie.id)
      handleDeleteMovie(movieToDelete)
    }
    else {
      handleSaveMovie(movie)
    }
  }

  //ищем фильм
  const handleSearchMovie = (input) => {
    setIsLoading(true);

    //все фильмы
    if (location.pathname === "/movies" && movies.length > 0) {
      setSearchInput(input);

      const searchResult = movies.filter(movie => movie.nameRU.toLowerCase().includes(input.toLowerCase()));
      setSearchResult(searchResult);
    }

    //сохраненные фильмы
    if (location.pathname === "/saved-movies" && savedMovies.length > 0) {
      setSearchSavedInput(input);

      const searchSavedResult = savedMovies.filter(movie => movie.nameRU.toLowerCase().includes(input.toLowerCase()));
      setSearchSavedResult(searchSavedResult);
    }

    setIsLoading(false);
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
          <Route path='/signup' element={
            !loggedIn ?
              <Register
                onRegister={handleUserRegistration}
                isErrorMessage={isErrorMessage}
                infoMessage={infoMessage}
              /> :
              <Navigate to='/' replace/>
            }
          />
          <Route path='/signin' element={
            !loggedIn ?
              <Login
                onLogin={handleUserAuthorization}
                isErrorMessage={isErrorMessage}
                infoMessage={infoMessage}
              /> :
              <Navigate to='/' replace/>
            }
          />
          <Route path='/profile' element={
            <ProtectedRouteElement
              element={Profile}
              loggedIn={loggedIn}
              onUpdateUser={handleUpdateUser}
              onSignOut={handleSignOut}
              isErrorMessage={isErrorMessage}
              infoMessage={infoMessage}
            />}
          />
          <Route path='/movies' element={
            <ProtectedRouteElement
              element={Movies}
              loggedIn={loggedIn}
              isLoading={isLoading}
              movies={searchResult}
              savedMovies={savedMovies}
              searchInput={searchInput}
              isShortChecked={isShortChecked}
              setIsShortChecked={setIsShortChecked}
              onSaveMovie={handleSaveButton}
              onSearch={handleSearchMovie}
              isDefaultMoviesSet={isDefaultMoviesSet}
              setIsDefaultMoviesSet={setIsDefaultMoviesSet}
              isErrorMessage={isErrorMessage}
              infoMessage={infoMessage}
            />}
          />
          <Route path='/saved-movies' element={
            <ProtectedRouteElement
              element={SavedMovies}
              loggedIn={loggedIn}
              savedMovies={searchSavedResult}
              searchSavedInput={searchSavedInput}
              isShortChecked={isSavedShortChecked}
              setIsShortChecked={setIsSavedShortChecked}
              onDeleteMovie={handleDeleteMovie}
              onSearch={handleSearchMovie}
              isDefaultMoviesSet={isDefaultMoviesSet}
              setIsDefaultMoviesSet={setIsDefaultMoviesSet}
              isErrorMessage={isErrorMessage}
              infoMessage={infoMessage}
            />}
          />
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
};

export default App;