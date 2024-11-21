import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/homePage/homePage';
import LoginPage from './pages/loginPage/loginPage';
import SearchPage from './pages/searchPage/searchPage';
import ResultPage from './pages/resultPage/resultPage';


// Компонент для маршрутов, требующих авторизации
function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Проверка авторизации из Redux

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<HomePage />} />

          {/* Страница авторизации */}
          <Route path="/login" element={<LoginPage />} />

          {/* Страницы, доступные только авторизованным пользователям */}
          <Route
            path="/search"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ResultPage />
              </ProtectedRoute>
            }
          />

          {/* Переход на главную страницу для всех неизвестных маршрутов */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;