// utils/searchParams.js
export const buildSearchParams = (formData) => ({
    issueDateInterval: {
      startDate: formData.startDate,
      endDate: formData.endDate,
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: 'company',
            inn: formData.inn,
            maxFullness: true,
            onlyMainRole: true,
          },
        ],
        onlyMainRole: true,
        tonality: formData.tone === 'Любая' ? 'any' : formData.tone.toLowerCase(),
      },
    },
    limit: parseInt(formData.documentCount, 10),
    sortType: 'sourceInfluence',
    sortDirectionType: 'desc',
    intervalType: 'month',
    histogramTypes: ['totalDocuments', 'riskFactors'],
  });
  