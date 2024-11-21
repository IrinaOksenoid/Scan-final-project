import apiClient from './apiClient';

// Получение сводки по количеству публикаций
export const fetchPublicationHistograms = async (params) => {
  try {
    const response = await apiClient('/objectsearch/histograms', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    return response;
  } catch (error) {
    console.error('Error fetching publication histograms:', error);
    throw error;
  }
};

// Поиск публикаций по запросу
export const searchPublications = async (params) => {
  try {
    const response = await apiClient('/objectsearch', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    return response.items; // Возвращаем только список публикаций
  } catch (error) {
    console.error('Error searching publications:', error);
    throw error;
  }
};

// Получение данных о публикациях по их ID
export const fetchPublicationDetails = async (ids) => {
  try {
    const response = await apiClient('/documents', {
      method: 'POST',
      body: JSON.stringify({ ids }),
    });
    return response.map((item) => {
      if (item.ok) {
        return item.ok;
      } else {
        console.warn('Failed to fetch publication:', item.fail);
        return null;
      }
    });
  } catch (error) {
    console.error('Error fetching publication details:', error);
    throw error;
  }
};
