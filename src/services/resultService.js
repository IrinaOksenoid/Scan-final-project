import { fetchPublicationHistograms, searchPublications, fetchPublicationDetails } from './searchAPI';

export const fetchHistogramsAndPublications = async (searchParams) => {
  // Шаг 1: Получаем сводку публикаций (гистограммы)
  const histograms = await fetchPublicationHistograms(searchParams);

  // Шаг 2: Получаем список ID публикаций
  const publicationIdsResponse = await searchPublications(searchParams);
  const ids = publicationIdsResponse.items.map((item) => item.encodedId);

  return { histograms, ids };
};

export const fetchBatchDocuments = async (ids, offset, limit) => {
  const batchIds = ids.slice(offset, offset + limit);

  if (batchIds.length > 0) {
    const documents = await fetchPublicationDetails(batchIds);
    return documents.map((doc) => doc.ok).filter(Boolean); // Фильтруем успешные документы
  }

  return [];
};
