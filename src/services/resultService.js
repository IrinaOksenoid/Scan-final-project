import { fetchPublicationHistograms, searchPublications, fetchPublicationDetails } from './searchAPI';

// Получение сводки публикаций (гистограммы) и ID публикаций
export const fetchHistogramsAndPublications = async (searchParams) => {
  try {
    // Шаг 1: Получаем сводку публикаций
    const histograms = await fetchPublicationHistograms(searchParams);
    console.log('Fetched histograms:', histograms);

    // Шаг 2: Получаем список ID публикаций
    const publicationIds = await searchPublications(searchParams);

    if (!Array.isArray(publicationIds)) {
      console.error('Error: publicationIds is not an array', publicationIds);
      throw new Error('Invalid publication IDs');
    }

    const encodedIds = publicationIds.map((item) => item.encodedId);
    console.log('Fetched publication IDs:', encodedIds);

    return { histograms, ids: encodedIds };
  } catch (error) {
    console.error('Error in fetchHistogramsAndPublications:', error);
    throw error;
  }
};

// Получение публикаций по ID, с учетом пагинации
export const fetchBatchDocuments = async (ids, offset, limit) => {
  try {
    const batchIds = ids.slice(offset, offset + limit);

    if (batchIds.length === 0) {
      console.warn('No more IDs to fetch');
      return [];
    }

    console.log('Fetching details for batch IDs:', batchIds);

    // Вызываем API для получения данных о публикациях
    const documents = await fetchPublicationDetails(batchIds);

    console.log('Fetched documents:', documents);

    // Возвращаем только успешные документы
    return documents;
  } catch (error) {
    console.error('Error in fetchBatchDocuments:', error);
    throw error;
  }
};
