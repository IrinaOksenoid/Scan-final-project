import apiClient from './apiClient';

// Получение сводки по количеству публикаций (гистограммы)
export const fetchPublicationHistograms = async (params) => {
  try {
    const response = await apiClient('/objectsearch/histograms', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    return response.data; // Убедимся, что возвращаем только поле `data` из ответа
  } catch (error) {
    console.error('Error fetching publication histograms:', error);
    throw error;
  }
};

// Поиск публикаций по запросу (получение списка ID публикаций)
export const searchPublications = async (params) => {
  try {
    const response = await apiClient('/objectsearch', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    if (!response.items || !Array.isArray(response.items)) {
      console.error('Invalid response: items is not an array');
      throw new Error('Invalid response format');
    }
    return response.items; // Возвращаем только список публикаций
  } catch (error) {
    console.error('Error searching publications:', error);
    throw error;
  }
};

// Получение данных о публикациях по их ID
export const fetchPublicationDetails = async (ids) => {
  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error('Invalid or empty IDs array');
    }

    const response = await apiClient('/documents', {
      method: 'POST',
      body: JSON.stringify({ ids }),
    });

    return response.map((item) => {
      if (item.ok) {
        return item.ok; // Возвращаем только успешные публикации
      } else {
        console.warn('Failed to fetch publication:', item.fail);
        return null; // Можно убрать публикации, где `fail`
      }
    }).filter(Boolean); // Фильтруем только успешные публикации
  } catch (error) {
    console.error('Error fetching publication details:', error);
    throw error;
  }
};
