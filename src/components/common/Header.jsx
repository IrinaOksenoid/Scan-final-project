import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLimits } from '../../store/slices/limitsSlice';
import { logout } from '../../store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_green.svg';
import { Loader } from '../common';
import './header.css';

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

      {/* Полноэкранное меню */}
      <nav className="header__nav">
        <Link to="/" className="header__nav-link">Главная</Link>
        <Link to="#" className="header__nav-link">Тарифы</Link>
        <Link to="#" className="header__nav-link">FAQ</Link>
      </nav>

      {/* Панель управления учетной записью (только для авторизованных) */}
      <div className="header__account">
        {isAuthenticated ? (
          <>
            <div className="header__limits-wrap">
              {loading ? (
                <Loader />
              ) : companyLimits ? (
                <div className="header__limits">
                  <p>
                    Использовано компаний: <span className='header__limits-used'>{companyLimits.used}</span>
                  </p>
                  <p>
                    Лимит компаний: <span className='header__limits-company'>{companyLimits.limit}</span>
                  </p>
                </div>
              ) : (
                <p>Лимиты недоступны</p> // Обработка случая, если данные отсутствуют
              )}
            </div>
            <div className="header__user">
              <span>{user?.name || 'Пользователь'}</span> {/* Безопасная проверка user */}
              <button className="header__logout" onClick={handleLogout}>
                Выйти
              </button>
            </div>
          </>
        ) : (
          <div className="header__auth">
            <Link to="/register" className="header__register">
              Зарегистрироваться
            </Link>
            <div className="header__divider"></div>
            <button
              onClick={() => navigate('/login')}
              className="header__login"
            >
              Войти
            </button>
          </div>
        )}
      </div>

      {/* Меню для мобильной версии */}
      <div className="header__menu-icon" onClick={() => setMenuOpen(!isMenuOpen)}>
        <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`}></div>
      </div>

      {isMenuOpen && (
        <div className="header__mobile-menu">
          <div className="header__menu-close" onClick={() => setMenuOpen(false)}>
            &times;
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
    </header>
  );
}

export default Header;
