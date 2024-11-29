import React from 'react';
import './TariffCards.css';
import lightIcon from '../../assets/home/icon_light.svg';
import aimIcon from '../../assets/home/icon_aim.svg';
import laptopIcon from '../../assets/home/icon_laptop.svg';
import { useSelector } from 'react-redux';

const tariffs = [
  {
    id: 1,
    title: 'Beginner',
    description: 'Для небольшого исследования',
    price: '799 ₽',
    oldPrice: '1 200 ₽',
    monthly: 'или 150 ₽/мес. при рассрочке на 24 мес.',
    benefits: ['Безлимитная история запросов', 'Безопасная сделка', 'Поддержка 24/7'],
    icon: lightIcon,
    color: 'var(--accent-color)',
    button: 'Перейти в личный кабинет',
  },
  {
    id: 2,
    title: 'Pro',
    description: 'Для HR и фрилансеров',
    price: '1 299 ₽',
    oldPrice: '2 600 ₽',
    monthly: 'или 279 ₽/мес. при рассрочке на 24 мес.',
    benefits: [
      'Все пункты тарифа Beginner',
      'Экспорт истории',
      'Рекомендации по приоритетам',
    ],
    icon: aimIcon,
    color: 'var(--secondary-accent-color)',
    button: 'Подробнее',
  },
  {
    id: 3,
    title: 'Business',
    description: 'Для корпоративных клиентов',
    price: '2 379 ₽',
    oldPrice: '3 700 ₽',
    monthly: 'или',
    benefits: [
      'Все пункты тарифа Pro',
      'Безлимитное количество запросов',
      'Приоритетная поддержка',
    ],
    icon: laptopIcon,
    color: 'var(--black-color)',
    button: 'Подробнее',
  },
];

function TariffCards() {
  const user = useSelector((state) => state.auth.user);

  return (
    <section className="tariffs">
      <h2 className="tariffs__title">НАШИ ТАРИФЫ</h2>
      <div className="tariffs__cards">
        {tariffs.map((tariff) => {
          const isCurrent = user?.tariff === tariff.title;

          return (
            <div
              key={tariff.id}
              className={`tariffs__card ${isCurrent ? 'tariffs__card--current' : ''}`}
              style={{ borderColor: isCurrent ? tariff.color : 'transparent' }}
            >
              <div
                className="tariffs__card-header"
                style={{ backgroundColor: tariff.color }}
              >
                <div className="tariffs__card-text">
                  <p className={`tariffs__card-title ${tariff.id === 3 ? 'tariffs__card-title--white' : ''}`}>
                    {tariff.title}
                  </p>
                  <span className={`tariffs__card-description ${tariff.id === 3 ? 'tariffs__card-description--white' : ''}`}>
                    {tariff.description}
                  </span>
                </div>
                  <img src={tariff.icon} alt="icon" className="tariffs__card-icon" />
              </div>
              <div className="tafiff__card-content">
                <div className='tariff__card-tariff'>

                  <p className="tariffs__card-price">
                    {tariff.price}{' '}
                    <span className="tariffs__card-old-price">{tariff.oldPrice}</span>
                  </p>
                  <p className="tariffs__card-monthly">{tariff.monthly}</p>
                </div>
                  <p  className='tariffs__card-include'>В тариф входит</p>
                  <ul className="tariffs__card-benefits">
                    {tariff.benefits.map((benefit, index) => (
                      <li key={index} className="tariffs__card-benefit">
                        ✔ {benefit}
                      </li>
                    ))}
                  {isCurrent && <div className="tariffs__badge">Текущий тариф</div>}
                  </ul>
                  <button className="tariffs__card-button">
                    {isCurrent ? 'Перейти в личный кабинет' : 'Подробнее'}
                  </button>
                </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TariffCards;
