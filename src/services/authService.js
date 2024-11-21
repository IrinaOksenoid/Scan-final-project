import apiClient from './apiClient';

// Авторизация
export const login = async (login, password) => {
  const data = await apiClient('/account/login', {
    method: 'POST',
    body: JSON.stringify({ login, password }),
  });
  return data; // Возвращаем токен и срок его действия
};

// Получение информации о пользователе
export const getUserInfo = async () => {
  const data = await apiClient('/account/info');
  return data; // Возвращаем данные о пользователе
};
