import React from 'react';
import logo from '../../assets/logo_white.svg'; // Путь к логотипу

function Footer() {
  return (
    <footer className="footer">
      {/* Логотип */}
      <div className="footer__logo">
        <img src={logo} alt="СКАН" />
      </div>
      {/* Текстовая информация */}
      <div className="footer__info">
        <p>г. Москва, Цветной б-р, 40</p>
        <p>+7 495 771 21 11</p>
        <p>info@skan.ru</p>
        <p>Copyright. 2022</p>
      </div>
    </footer>
  );
}

export default Footer; 
