import React from 'react';
import './AuthHeader.css';
import lockIcon from '../../assets/login/icon_lock.svg';
import authImage from '../../assets/login/login_characters.png'; // Картинка с ключом

function AuthHeader() {
  return (
    <div className="auth-header">
      <div className="auth-header__text">
        <h1 className="auth-header__title">
          ДЛЯ ОФОРМЛЕНИЯ ПОДПИСКИ НА ТАРИФ, НЕОБХОДИМО АВТОРИЗОВАТЬСЯ.
        </h1>
        <img src={lockIcon} alt="Lock Icon" className="auth-header__icon" />
      </div>
      <div className="auth-header__image">
        <img src={authImage} alt="People with a key" />
      </div>
    </div>
  );
}

export default AuthHeader;
