export const buildSearchParams = (formData) => {
  console.log('Building search params from formData:', formData);
  const toneMapping = {
    'Любая': 'any',
    'Позитивная': 'positive',
    'Негативная': 'negative',
  };
  const params = {
    issueDateInterval: {
      startDate: `${formData.startDate}T00:00:00+03:00`, // Добавляем временную метку
      endDate: `${formData.endDate}T23:59:59+03:00`, // Добавляем временную метку
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: 'company',
            inn: formData.inn,
            maxFullness: true, // Полный охват
            onlyMainRole: true, // Только с основной ролью
          },
        ],
        onlyMainRole: true,
        tonality: toneMapping[formData.tone] || 'any',
        riskFactors: {
          and: [],
          or: [],
          not: [],
        },
        themes: {
          and: [],
          or: [],
          not: [],
        },
      },
      themesFilter: {
        and: [],
        or: [],
        not: [],
      },
    },
    attributeFilters: {
      excludeTechNews: true, // Исключить технические новости
      excludeAnnouncements: true, // Исключить анонсы
      excludeDigests: true, // Исключить дайджесты
    },
    similarMode: 'duplicates', // Режим фильтрации
    limit: parseInt(formData.documentCount, 10), // Ограничение на количество публикаций
    sortType: 'sourceInfluence', // Тип сортировки
    sortDirectionType: 'desc', // Направление сортировки
    intervalType: 'month', // Тип интервала
    histogramTypes: ['totalDocuments', 'riskFactors'], // Типы гистограмм
  };
  console.log('Built search params:', params);
  return params;
};
