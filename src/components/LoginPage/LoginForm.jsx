
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './LoginForm.css';
import googleIcon from '../../assets/login/Social_google.svg';
import fbIcon from '../../assets/login/Social_fb.svg';
import yaIcon from '../../assets/login/Social_ya.svg';
import { login } from '../../services/authService'; // Импортируем функцию логина
import { validateForm } from '../../utils/validation';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import { login as loginAction } from '../../store/slices/authSlice'; // Импортируем действие login

function LoginForm() {
  const dispatch = useDispatch(); // Инициализация dispatch
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ login: '', password: '' });
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Создаём функцию для перенаправления

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Передаём значения формы для валидации
    const { isValid, errors } = validateForm({ login: loginValue, password });
    if (!isValid) {
      setErrors(errors); // Устанавливаем ошибки в состоянии компонента
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      const data = await login(loginValue, password); // Вызываем функцию логина
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('tokenExpire', data.expire);
      localStorage.setItem('user', JSON.stringify({ name: 'Имя пользователя' })); // Пример: имя пользователя
      console.log('Успешная авторизация:', data);
      dispatch(loginAction({ user: { login: loginValue } })); // Диспатчим логин с данными пользователя
      // Перенаправляем на страницу с формой поиска
      navigate('/search'); // Укажите правильный путь для страницы поиска
    } catch (error) {
      console.error('Ошибка:', error);
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <div className="login-form__tabs">
        <button className="login-form__tab login-form__tab--active">Войти</button>
        <button className="login-form__tab">Зарегистрироваться</button>
      </div>
      <form className="login-form__form" onSubmit={handleSubmit}>
        <label className="login-form__label">
          Логин или номер телефона:
          <input
            type="text"
            className={`login-form__input ${errors.login ? 'login-form__input--error' : ''}`}
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
          />
          {errors.login && <span className="login-form__error">{errors.login}</span>}
        </label>
        <label className="login-form__label">
          Пароль:
          <input
            type="password"
            className={`login-form__input ${errors.password ? 'login-form__input--error' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="login-form__error">{errors.password}</span>}
        </label>
        <button
          type="submit"
          className={`login-form__button ${isLoading ? 'login-form__button--loading' : ''}`}
          disabled={isLoading || !loginValue || !password} // Блокируем кнопку
        >
          {isLoading ? 'Авторизация...' : 'Войти'} {/* Показываем текст или лоадер */}
        </button>
        {apiError && <span className="login-form__error">{apiError}</span>}
        <a href="/forgot-password" className="login-form__link">
          Восстановить пароль
        </a>
      </form>
      <div className="login-form__socials">
        <span>Войти через:</span>
        <button className="login-form__social">
          <img src={googleIcon} alt="Google" />
        </button>
        <button className="login-form__social">
          <img src={fbIcon} alt="Facebook" />
        </button>
        <button className="login-form__social">
          <img src={yaIcon} alt="Yandex" />
        </button>
      </div>
    </div>
  );
}

export default LoginForm;


