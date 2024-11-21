const BASE_URL = 'https://gateway.scan-interfax.ru/api/v1';

const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('accessToken'); // Достаем токен из localStorage

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }), // Добавляем заголовок Authorization, если токен существует
    },
    ...options,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Произошла ошибка');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error; // Пробрасываем ошибку, чтобы можно было обработать в компонентах
  }
};

export default apiClient;
