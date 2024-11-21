import React from 'react';
import { useSelector } from 'react-redux'; // Импортируем useSelector для получения данных из Redux
import { useNavigate } from 'react-router-dom'; // Используем для перехода на другую страницу
import welcomeImage from '../../assets/home/home_1.png'; // Путь к изображению
import './WelcomeSection.css'; // Стили

function WelcomeSection() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Проверяем авторизацию
  const navigate = useNavigate(); // Для перенаправления на страницу поиска

  return (
    <section className="welcome-section">
      {/* Текстовая часть */}
      <div className="welcome-section__content">
        <h1 className="welcome-section__title">
          СЕРВИС ПО ПОИСКУ ПУБЛИКАЦИЙ О КОМПАНИИ ПО ЕГО ИНН
        </h1>
        <p className="welcome-section__description">
          Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
        </p>
        {/* Показываем кнопку только для авторизованных пользователей */}
        {isAuthenticated && (
          <button
            className="welcome-section__button"
            onClick={() => navigate('/search')} // Переход на страницу ввода параметров поиска
          >
            Запросить данные
          </button>
        )}
      </div>
      {/* Картинка */}
      <div className="welcome-section__image">
        <img src={welcomeImage} alt="Сервис по поиску публикаций" />
      </div>
    </section>
  );
}

export default WelcomeSection;
