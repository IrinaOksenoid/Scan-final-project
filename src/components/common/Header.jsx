import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLimits } from '../../store/slices/limitsSlice';
import { logout } from '../../store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_green.svg';
import {Loader} from '../common';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false); // Состояние для мобильного меню

  // Получаем данные из Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const { data: companyLimits, loading } = useSelector((state) => state.limits);

  // Загружаем лимиты при авторизации
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchLimits());
    }
  }, [isAuthenticated, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Возврат на главную страницу
  };

  return (
    <header className="header">
      {/* Логотип */}
      <Link to="/" className="header__logo">
        <img src={logo} alt="СКАН" />
      </Link>

      {/* Меню для мобильной версии */}
      <div className="header__menu-icon" onClick={() => setMenuOpen(!isMenuOpen)}>
        <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`}></div>
      </div>

      {isMenuOpen && (
  <div className="header__mobile-menu">
    {/* Кнопка закрытия меню */}
    <div className="header__menu-close" onClick={() => setMenuOpen(false)}>
      &times; {/* Символ "X" */}
    </div>

    <nav className="mobile-menu__nav">
      <Link to="/" onClick={() => setMenuOpen(false)}>
        Главная
      </Link>
      <Link to="/tariffs" onClick={() => setMenuOpen(false)}>
        Тарифы
      </Link>
      <Link to="/faq" onClick={() => setMenuOpen(false)}>
        FAQ
      </Link>
      {!isAuthenticated && (
        <>
          <Link to="#" className="header__register">
            Зарегистрироваться
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate('/login');
            }}
            className="header__login"
          >
            Войти
          </button>
        </>
      )}
    </nav>
  </div>
)}


      {/* Панель управления учетной записью (только для авторизованных) */}
      {isAuthenticated && !isMenuOpen && (
        <div className="header__account">
          <div className="header__limits">
            {loading ? (
              <Loader />
            ) : (
              <div className="limits__content">
                <p>
                  Использовано компаний{' '}
                  <span className="limits__used">{companyLimits.used}</span>
                </p>
                <p>
                  Лимит по компаниям{' '}
                  <span className="limits__limit">{companyLimits.limit}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header; 

