import React, { useState } from 'react';
import './LoginForm.css';
import googleIcon from '../../assets/login/Social_google.svg';
import fbIcon from '../../assets/login/Social_fb.svg';
import yaIcon from '../../assets/login/Social_ya.svg';
import { login } from '../../services/authService'; // Импортируем функцию логина

function LoginForm() {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ login: '', password: '' });
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { login: '', password: '' };

    if (!loginValue) {
      isValid = false;
      newErrors.login = 'Введите корректные данные';
    }

    if (!password) {
      isValid = false;
      newErrors.password = 'Введите пароль';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      const data = await login(loginValue, password); // Вызываем функцию из authService
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('tokenExpire', data.expire);

      console.log('Успешная авторизация:', data);
      alert('Вы успешно авторизованы!'); // Удалить в реальном проекте, используется только для проверки
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
            value={login}
            onChange={(e) => setLogin(e.target.value)}
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
          className={`login-form__button ${!login || !password ? 'login-form__button--disabled' : ''}`}
          disabled={!login || !password}
        >
          Войти
        </button>
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
